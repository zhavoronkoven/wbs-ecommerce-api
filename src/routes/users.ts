import { Router } from 'express';

import { userCreateSchema, userUpdateSchema, userIdSchema } from '../schemas/users.ts';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/users.ts';
import { validateBody, validateParams } from '../middleware/validate.ts';

const router = Router();

router.get('/', getUsers);
router.post('/', validateBody(userCreateSchema), createUser);

router.get('/:id', validateParams(userIdSchema), getUserById);
router.put('/:id', validateParams(userIdSchema), validateBody(userUpdateSchema), updateUser);
router.delete('/:id', validateParams(userIdSchema), deleteUser);

export default router;
