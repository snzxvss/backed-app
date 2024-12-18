export interface Valoracion {
  id: number;
  comida_id?: number;
  valoracion: number;
  comentario?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateValoracionRequest {
  comida_id?: number;
  valoracion: number;
  comentario?: string;
}

export interface UpdateValoracionRequest {
  id: number;
  comida_id?: number;
  valoracion?: number;
  comentario?: string;
}