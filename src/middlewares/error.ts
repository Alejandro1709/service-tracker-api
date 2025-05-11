import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};
