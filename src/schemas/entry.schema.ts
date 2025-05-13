import * as z from 'zod';

const createEntrySchema = z.object({
  supplyId: z.number({ message: 'Entry must have a supplyId' }),
  description: z.string().optional(),
  amount: z.number({ message: 'Entry must have a positive value' }).positive().min(1),
  dueDate: z.date(),
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;

export default createEntrySchema;
