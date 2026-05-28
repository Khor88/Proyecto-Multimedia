import { Router } from 'express';
import { LeagueController } from '../controllers/league.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware as any, LeagueController.getAll);
router.post('/', authMiddleware as any, LeagueController.create);
router.get('/my', authMiddleware as any, LeagueController.getMyLeagues);

export default router;
