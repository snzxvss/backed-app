export interface Pedido {
  id: number;
  mesa_identificador: string;
  estado_id?: number;
  usuario_id?: number;
  total: number;
  fecha_pedido: Date;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreatePedidoRequest {
  mesa_identificador: string;
  estado_id?: number;
  usuario_id?: number;
  total: number;
}

export interface UpdatePedidoRequest {
  id: number;
  mesa_identificador?: string;
  estado_id?: number;
  usuario_id?: number;
  total?: number;
}