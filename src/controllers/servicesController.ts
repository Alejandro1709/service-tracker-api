import type { NextFunction, Request, Response } from 'express';
import createServiceSchema from '../schemas/service.schema';
import catchAsync from '../utils/catchAsync';
import Service from '../models/Service';

export const getServices = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const services = await Service.find();

  res.status(200).json({ status: 'success', services });
});

export const getService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const service = await Service.findOne({ slug: req.params.slug });

  res.status(200).json({ status: 'success', service });
});

export const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createServiceSchema.parse(req.body);

  const service = await Service.create(request);

  res.status(201).json({ status: 'success', service });
});

export const updateService = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};

export const deleteService = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};
