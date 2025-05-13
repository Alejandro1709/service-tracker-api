import type { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import createEntrySchema from '../schemas/entry.schema';
import Entry from '../models/Entry';
import AppError from '../utils/AppError';

export const getEntries = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const entries = await Entry.find();

  res.status(200).json({ status: 'success', entries });
});

export const getEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    return next(new AppError('Entry not found', 404));
  }

  res.status(200).json({ status: 'success', entry });
});

export const createEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createEntrySchema.parse(req.body);

  const entry = await Entry.create(request);

  res.status(201).json({ status: 'success', entry });
});

export const updateEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Change schema to updateSchema
  const request = createEntrySchema.parse(req.body);

  const entry = await Entry.findByIdAndUpdate(req.params.id, request, {
    new: true,
    runValidators: true,
  });

  if (!entry) {
    return next(new AppError('Entry not found', 404));
  }

  res.status(200).json({ status: 'success', entry });
});

export const deleteEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const entry = await Entry.findByIdAndDelete(req.params.id);

  if (!entry) {
    return next(new AppError('Entry not found', 404));
  }

  res.status(200).json({ status: 'success', entry: null });
});
