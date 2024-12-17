export interface DetallePedido {
  id: number;
  pedido_id?: number;
  comida_id?: number;
  cantidad: number;
  precio: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface CreateDetallePedidoRequest {
  pedido_id?: number;
  comida_id?: number;
  cantidad: number;
  precio: number;
}

export interface UpdateDetallePedidoRequest {
  id: number;
  pedido_id?: number;
  comida_id?: number;
  cantidad?: number;
  precio?: number;
}