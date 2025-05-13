import type { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

export const getEntries = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' });
});

export const getEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'Ok' });
});

export const createEntry = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  res.status(200).json({ message: 'Ok' });
});
