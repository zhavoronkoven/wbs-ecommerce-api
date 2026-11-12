import { z } from 'zod';

export const userCreateSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().min(1).toLowerCase().check(z.email()),
  password: z.string().trim().min(1),
});

export const userUpdateSchema = userCreateSchema.partial();

export const userIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});
