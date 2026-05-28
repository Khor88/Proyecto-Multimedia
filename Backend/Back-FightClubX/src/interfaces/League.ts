export interface League {
  id: number;
  nombre: string;
  division: string;
  descripcion: string;
  tipo: 'public' | 'private';
  id_usuario_creador: number;
  created_at?: Date;
}
