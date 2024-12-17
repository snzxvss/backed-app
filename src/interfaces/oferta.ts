export interface Oferta {
  id: number;
  comida_id?: number;
  descripcion?: string;
  descuento: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  foto_url?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateOfertaRequest {
  comida_id?: number;
  descripcion?: string;
  descuento: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  foto_url?: string;
}

export interface UpdateOfertaRequest {
  id: number;
  comida_id?: number;
  descripcion?: string;
  descuento?: number;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  foto_url?: string;
}