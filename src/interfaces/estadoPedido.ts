export interface EstadoPedido {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateEstadoPedidoRequest {
  nombre: string;
  descripcion?: string;
}

export interface UpdateEstadoPedidoRequest {
  id: number;
  nombre?: string;
  descripcion?: string;
}