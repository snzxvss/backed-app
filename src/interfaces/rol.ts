export interface Rol {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateRolRequest {
  nombre: string;
  descripcion?: string;
}

export interface UpdateRolRequest {
  id: number;
  nombre?: string;
  descripcion?: string;
}