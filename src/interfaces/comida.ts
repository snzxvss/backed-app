export interface Comida {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria_id?: number;
  foto_url?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateComidaRequest {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria_id?: number;
  foto_url?: string;
}

export interface UpdateComidaRequest {
  id: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria_id?: number;
  foto_url?: string;
}