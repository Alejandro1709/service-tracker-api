import type { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import User from '../models/User';
import AppError from '../utils/AppError';
import { generateJWTToken } from '../utils/jwt';

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const request = createUserSchema.parse(req.body);

  const userExists = await User.findOne({ email: request.email });

  if (userExists) {
    return next(new AppError('This email is already taken', 409));
  }

  await User.create(request);

  res.status(201).json({ status: 'success', message: 'Account created successfully!' });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = loginUserSchema.parse(req.body);

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(new AppError('Invalid Credentials', 401));
  }

  const token = generateJWTToken({ id: user._id });

  res.status(200).json({ status: 'success', token });
});

export const getAuthUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: 'success', user: req.user });
});
