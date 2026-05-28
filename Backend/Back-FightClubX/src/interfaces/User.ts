export interface User {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  peso?: number;
  altura?: number;
  edad?: number;
  disciplina?: string;
  rol: 'Presidente' | 'Vicepresidente' | 'Luchador' | 'Árbitro' | 'Espectador';
  created_at?: Date;
}

export interface AuthResponse {
  token: string;
  user: Partial<User>;
}
