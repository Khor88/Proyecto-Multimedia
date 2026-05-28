import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/profile', authMiddleware as any, UserController.getProfile);
router.put('/profile', authMiddleware as any, UserController.updateProfile);

export default router;
