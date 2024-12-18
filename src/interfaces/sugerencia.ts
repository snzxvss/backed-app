export interface Sugerencia {
  id: number;
  categoria_id?: number;
  sugerencia: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateSugerenciaRequest {
  categoria_id?: number;
  sugerencia: string;
}

export interface UpdateSugerenciaRequest {
  id: number;
  categoria_id?: number;
  sugerencia?: string;
}