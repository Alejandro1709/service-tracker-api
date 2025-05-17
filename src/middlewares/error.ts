import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { z } from 'zod';
import AppError from '../utils/AppError';

const handleZodError = (res: Response, err: z.ZodError) => {
  const errors = err.issues.map((issue) => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));

  return res.status(400).json({ status: 'fail', errors });
};

const handleAppError = (res: Response, err: AppError) => {
  return res.status(err.statusCode).json({ status: err.status, message: err.message });
};

const handleDuplicateError = (res: Response, err: any) => {
  const value = err.message.match(/\{([^}]+)\}/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;

  return res.status(400).json({ status: 'fail', message });
};

export const globalErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  // console.log(err);

  if (err instanceof z.ZodError) {
    handleZodError(res, err);
    return;
  }

  if (err instanceof AppError) {
    handleAppError(res, err);
    return;
  }

  if (err.code === 11000) {
    handleDuplicateError(res, err);
    return;
  }

  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};
