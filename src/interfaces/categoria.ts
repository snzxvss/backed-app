export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  imagen: string;
}

export interface CreateCategoriaRequest {
  nombre: string;
  descripcion?: string;
  imagen?: string;
}

export interface UpdateCategoriaRequest {
  id: number;
  nombre?: string;
  descripcion?: string;
  imagen?: string;
}