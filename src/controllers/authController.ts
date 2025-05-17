import type { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { createUserSchema } from '../schemas/user.schema';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createUserSchema.parse(req.body);

  console.log(request);
});
