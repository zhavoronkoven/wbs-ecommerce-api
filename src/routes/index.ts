import { Router } from 'express';

import userRoutes from './users.ts';
import categoryRoutes from './categories.ts';
import orderRoutes from './orders.ts';
import productRoutes from './products.ts';

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);

export default router;
