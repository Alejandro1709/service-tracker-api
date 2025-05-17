import * as z from 'zod';

export const createEntrySchema = z.object({
  supplyId: z.number({ message: 'Entry must have a supplyId' }).positive().min(1),
  description: z.string().optional(),
  amount: z.number({ message: 'Entry must have a positive value' }).positive().min(1),
  service: z.string({ message: 'Entry must belong to a service' }).min(1),
  dueDate: z.string().datetime(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;

export const updateEntrySchema = z.object({
  description: z.string().optional(),
  amount: z.number({ message: 'Entry must have a positive value' }).positive().min(1),
  service: z.string({ message: 'Entry must belong to a service' }).min(1),
  dueDate: z.string().datetime(),
});

export type UpdateEntryInput = z.infer<typeof updateEntrySchema>;
