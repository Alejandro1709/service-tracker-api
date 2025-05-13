import * as z from 'zod';

const createEntrySchema = z.object({
  supplyId: z.number({ message: 'Entry must have a supplyId' }).positive().min(1),
  description: z.string().optional(),
  amount: z.number({ message: 'Entry must have a positive value' }).positive().min(1),
  dueDate: z.string().datetime(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;

export default createEntrySchema;
