import { Router } from 'express';

import {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryIdSchema,
} from '../schemas/categories.ts';

import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.ts';

import { validateBody, validateParams } from '../middleware/validate.ts';

const router = Router();

router.get('/', getCategories);
router.post('/', validateBody(categoryCreateSchema), createCategory);

router.get('/:id', validateParams(categoryIdSchema), getCategoryById);
router.put(
  '/:id',
  validateParams(categoryIdSchema),
  validateBody(categoryUpdateSchema),
  updateCategory,
);
router.delete('/:id', validateParams(categoryIdSchema), deleteCategory);

export default router;
