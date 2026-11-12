import { Router } from 'express';

import { orderCreateSchema, orderUpdateSchema, orderIdSchema } from '../schemas/orders.ts';

import {
  getOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orders.ts';

import { validateBody, validateParams } from '../middleware/validate.ts';

const router = Router();

router.get('/', getOrders);
router.post('/', validateBody(orderCreateSchema), createOrder);

router.get('/:id', validateParams(orderIdSchema), getOrderById);
router.put('/:id', validateParams(orderIdSchema), validateBody(orderUpdateSchema), updateOrder);
router.delete('/:id', validateParams(orderIdSchema), deleteOrder);

export default router;
