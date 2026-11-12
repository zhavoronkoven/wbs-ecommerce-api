import { z } from 'zod';

export const productCreateSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim().min(1),
  price: z.number().min(0),
  categoryId: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const productUpdateSchema = productCreateSchema.partial();

export const productIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

export const productQuerySchema = z.object({
  categoryId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
});
