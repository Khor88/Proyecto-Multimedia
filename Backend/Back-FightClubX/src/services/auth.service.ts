import db from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, AuthResponse } from '../interfaces/User';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    const [rows] = await db.execute<RowDataPacket[]>({
      sql: 'SELECT * FROM usuario WHERE email = ?',
      values: [email]
    });

    const user = rows[0] as User;

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword
    };
  }

  static async register(userData: Partial<User>): Promise<AuthResponse> {
    const { nombre, email, password, rol, peso, altura, edad, disciplina } = userData;
    
    const hashedPassword = await bcrypt.hash(password!, 10);

    const [result] = await db.execute<ResultSetHeader>({
      sql: 'INSERT INTO usuario (nombre, email, password, rol, peso, altura, edad, disciplina) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      values: [nombre, email, hashedPassword, rol || 'Luchador', peso || null, altura || null, edad || null, disciplina || null]
    });

    const id = result.insertId;

    const token = jwt.sign(
      { id, rol: rol || 'Luchador' },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '8h' }
    );

    return {
      token,
      user: { id, nombre, email, rol: rol as any || 'Luchador' }
    };
  }
}
