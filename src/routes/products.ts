import { Router } from 'express';

import {
  productCreateSchema,
  productUpdateSchema,
  productIdSchema,
  productQuerySchema,
} from '../schemas/products.ts';

import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/products.ts';

import { validateBody, validateParams, validateQuery } from '../middleware/validate.ts';

const router = Router();

router.get('/', validateQuery(productQuerySchema), getProducts);
router.post('/', validateBody(productCreateSchema), createProduct);

router.get('/:id', validateParams(productIdSchema), getProductById);
router.put(
  '/:id',
  validateParams(productIdSchema),
  validateBody(productUpdateSchema),
  updateProduct,
);
router.delete('/:id', validateParams(productIdSchema), deleteProduct);

export default router;
