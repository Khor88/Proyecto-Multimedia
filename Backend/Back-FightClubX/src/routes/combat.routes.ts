import { Router } from 'express';
import { CombatController } from '../controllers/combat.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/calendar', authMiddleware as any, CombatController.getCalendar);

export default router;
