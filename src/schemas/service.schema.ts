import * as z from 'zod';

const createServiceSchema = z.object({
  name: z.string({ message: 'The service must have a name' }).min(1, 'The service must have at least one character'),
  description: z.string().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

export default createServiceSchema;
