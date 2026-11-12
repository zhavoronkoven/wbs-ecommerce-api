import { z } from 'zod';

export const categoryCreateSchema = z.object({
  name: z.string().trim().min(1),
});

export const categoryUpdateSchema = categoryCreateSchema.partial();

export const categoryIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});
