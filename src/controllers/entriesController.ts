import type { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import createEntrySchema from '../schemas/entry.schema';
import Entry from '../models/Entry';

export const getEntries = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const entries = await Entry.find();

  res.status(200).json({ status: 'success', entries });
});

export const getEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' });
});

export const createEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createEntrySchema.parse(req.body);

  const entry = await Entry.create(request);

  res.status(200).json({ status: 'success', entry });
});
