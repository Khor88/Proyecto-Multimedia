import db from '../config/db';
import { League } from '../interfaces/League';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class LeagueService {
  static async getAll(): Promise<League[]> {
    const [rows] = await db.execute<RowDataPacket[]>({ sql: 'SELECT * FROM liga' });
    return rows as League[];
  }

  static async getById(id: number): Promise<League> {
    const [rows] = await db.execute<RowDataPacket[]>({
      sql: 'SELECT * FROM liga WHERE id = ?',
      values: [id]
    });
    return rows[0] as League;
  }

  static async create(leagueData: Partial<League>): Promise<number> {
    const { nombre, division, descripcion, tipo, id_usuario_creador } = leagueData;
    const [result] = await db.execute<ResultSetHeader>({
      sql: 'INSERT INTO liga (nombre, division, descripcion, tipo, id_usuario_creador) VALUES (?, ?, ?, ?, ?)',
      values: [nombre, division, descripcion, tipo || 'public', id_usuario_creador]
    });
    return result.insertId;
  }

  static async getByUserId(userId: number): Promise<League[]> {
    const [rows] = await db.execute<RowDataPacket[]>({
      sql: 'SELECT l.* FROM liga l INNER JOIN ranking r ON l.id = r.id_liga WHERE r.id_usuario = ?',
      values: [userId]
    });
    return rows as League[];
  }
}
