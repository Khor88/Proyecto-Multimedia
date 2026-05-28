import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { CombatService } from '../services/combat.service';

export class CombatController {
  static async getCalendar(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const calendar = await CombatService.getCalendar(userId);
      res.json(calendar);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
