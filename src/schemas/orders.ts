import { z } from 'zod';

export const orderCreateSchema = z.object({
  userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  products: z.array(
    z.object({
      productId: z.string().regex(/^[0-9a-fA-F]{24}$/),
      quantity: z.number().min(1),
    }),
  ),
});

export const orderUpdateSchema = orderCreateSchema.partial();

export const orderIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});
