import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';

export class UserController {
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const user = await UserService.getById(userId);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      await UserService.updateProfile(userId, req.body);
      res.json({ message: 'Perfil actualizado correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
