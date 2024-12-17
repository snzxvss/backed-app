import { Request, Response } from 'express';
import { query } from '../database';
import { Pedido, CreatePedidoRequest, UpdatePedidoRequest } from '../interfaces/pedido';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createPedido = async (req: Request, res: Response) => {
    const { mesa_identificador, estado_id, usuario_id, total }: CreatePedidoRequest = req.body;

    try {
        await query('CALL InsertarPedido(?, ?, ?, ?)', [mesa_identificador, estado_id, usuario_id, total]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Pedido created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating pedido',
        };
        res.status(500).json(response);
    }
};

export const getPedidos = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarPedidos()') as RowDataPacket[][];
        const pedidosJson = rows[0].pedidos;
        const pedidos: Pedido[] = JSON.parse(pedidosJson);

        const response: ApiResponse<Pedido[]> = {
            success: true,
            data: pedidos,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching pedidos',
        };
        res.status(500).json(response);
    }
};

export const updatePedido = async (req: Request, res: Response) => {
    const { id, mesa_identificador, estado_id, usuario_id, total }: UpdatePedidoRequest = req.body;

    try {
        await query('CALL EditarPedido(?, ?, ?, ?, ?)', [id, mesa_identificador, estado_id, usuario_id, total]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Pedido updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating pedido',
        };
        res.status(500).json(response);
    }
};

export const deletePedido = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarPedido(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Pedido deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting pedido',
        };
        res.status(500).json(response);
    }
};