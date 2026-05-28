export interface Combat {
  id: number;
  tipo: string;
  num_rounds: number;
  duracion_round: number;
  estado: 'programado' | 'en_curso' | 'finalizado' | 'cancelado';
  fecha: Date;
  id_liga: number;
  created_at?: Date;
}

export interface CombatCalendarEntry extends Combat {
  liga_nombre: string;
  luchador1?: string;
  luchador2?: string;
}
