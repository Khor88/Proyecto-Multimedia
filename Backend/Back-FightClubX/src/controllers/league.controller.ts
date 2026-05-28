import { Response } from 'express';
import db from '../config/db';
import { ResultSetHeader } from 'mysql2';
import { AuthRequest } from '../middlewares/auth.middleware';
import { LeagueService } from '../services/league.service';

export class LeagueController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const leagueData = { ...req.body, id_usuario_creador: userId };
      const leagueId = await LeagueService.create(leagueData);
      
      // Añadir creador al ranking automáticamente
      await db.execute<ResultSetHeader>({
        sql: 'INSERT INTO ranking (id_liga, id_usuario, puntos, posicion) VALUES (?, ?, 0, 1)',
        values: [leagueId, userId]
      });

      res.status(201).json({ id: leagueId, message: 'Liga creada correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMyLeagues(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const leagues = await LeagueService.getByUserId(userId);
      res.json(leagues);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAll(req: AuthRequest, res: Response) {
    try {
      const leagues = await LeagueService.getAll();
      res.json(leagues);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
