import type { NextFunction, Request, Response } from 'express';
import createServiceSchema from '../schemas/service.schema';
import catchAsync from '../utils/catchAsync';
import Service from '../models/Service';
import slugify from 'slugify';
import AppError from '../utils/AppError';
import Entry from '../models/Entry';
import User from '../models/User';

export const getServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const services = await Service.find().populate('entries');

  res.status(200).json({ status: 'success', services });
});

export const getService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const service = await Service.findById(req.params.id).populate('entries');

  if (!service) {
    return next(new AppError('Service not found', 404));
  }

  res.status(200).json({ status: 'success', service });
});

export const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createServiceSchema.parse(req.body);

  const user = await User.findById(req.user?.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const service = await Service.create({ ...request, user: user.id });

  user.services.push(service);

  await user.save();

  res.status(201).json({ status: 'success', service });
});

export const updateService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createServiceSchema.parse(req.body);

  const newReq = {
    ...request,
    slug: slugify(request.name, { lower: true }),
  };

  const service = await Service.findByIdAndUpdate(req.params.id, newReq, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return next(new AppError('Service not found', 404));
  }

  res.status(200).json({ status: 'success', service });
});

export const deleteService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new AppError('Service not found', 404));
  }

  const user = await User.findById(req.user?.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user.services.includes(service.id)) {
    const serviceIdx = user.services.indexOf(service.id);

    user.services.splice(serviceIdx, 1);

    await user.save();
  }

  await Entry.deleteMany({ service });
  await service?.deleteOne();

  res.status(200).json({ status: 'success', service: null });
});
