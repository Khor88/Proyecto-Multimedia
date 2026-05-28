import db from '../config/db';
import { User } from '../interfaces/User';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserService {
  static async getById(id: number): Promise<User> {
    const [rows] = await db.execute<RowDataPacket[]>('SELECT id, nombre, email, peso, altura, edad, disciplina, rol, created_at FROM usuario WHERE id = ?', [id]);
    return rows[0] as User;
  }

  static async updateProfile(id: number, data: Partial<User>): Promise<void> {
    const { nombre, peso, altura, edad, disciplina } = data;
    await db.execute<ResultSetHeader>({
      sql: 'UPDATE usuario SET nombre = ?, peso = ?, altura = ?, edad = ?, disciplina = ? WHERE id = ?',
      values: [nombre, peso, altura, edad, disciplina, id]
    });
  }
}
