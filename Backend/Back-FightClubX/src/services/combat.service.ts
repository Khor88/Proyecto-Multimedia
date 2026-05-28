import db from '../config/db';
import { Combat, CombatCalendarEntry } from '../interfaces/Combat';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class CombatService {
  static async getCalendar(userId: number): Promise<CombatCalendarEntry[]> {
    const [rows] = await db.execute<RowDataPacket[]>({
      sql: `SELECT c.*, l.nombre as liga_nombre 
       FROM combate c 
       JOIN liga l ON c.id_liga = l.id
       JOIN participante_combate pc ON c.id = pc.id_combate
       WHERE pc.id_usuario = ? OR c.id_liga IN (SELECT id_liga FROM ranking WHERE id_usuario = ?)
       ORDER BY c.fecha ASC`,
      values: [userId, userId]
    });
    return rows as CombatCalendarEntry[];
  }

  static async create(combatData: Partial<Combat>): Promise<number> {
    const { tipo, num_rounds, duracion_round, fecha, id_liga } = combatData;
    const [result] = await db.execute<ResultSetHeader>({
      sql: 'INSERT INTO combate (tipo, num_rounds, duracion_round, fecha, id_liga) VALUES (?, ?, ?, ?, ?)',
      values: [tipo, num_rounds || 3, duracion_round || 180, fecha, id_liga]
    });
    return result.insertId;
  }
}
