import * as z from 'zod';

export const createUserSchema = z.object({
  name: z.string({ message: 'User must have a name' }).min(1),
  email: z.string({ message: 'User must have an email' }).email({ message: 'Provide a valid email' }),
  password: z.string({ message: 'User must have a password' }).min(7, 'Password must have at least 7 characters'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const loginUserSchema = z.object({
  email: z.string({ message: 'Provide your email' }).email({ message: 'Provide a valid email' }),
  password: z.string({ message: 'Provide your password' }).min(1),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
