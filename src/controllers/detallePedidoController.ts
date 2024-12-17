import { Request, Response } from 'express';
import { query } from '../database';
import { DetallePedido, CreateDetallePedidoRequest, UpdateDetallePedidoRequest } from '../interfaces/detallePedido';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createDetallePedido = async (req: Request, res: Response) => {
    const { pedido_id, comida_id, cantidad, precio }: CreateDetallePedidoRequest = req.body;

    try {
        await query('CALL InsertarDetallePedido(?, ?, ?, ?)', [pedido_id, comida_id, cantidad, precio]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'DetallePedido created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating detallePedido',
        };
        res.status(500).json(response);
    }
};

export const getDetallePedidos = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarDetallePedidos()') as RowDataPacket[][];
        const detallePedidosJson = rows[0].detallepedidos;
        const detallePedidos: DetallePedido[] = JSON.parse(detallePedidosJson);

        const response: ApiResponse<DetallePedido[]> = {
            success: true,
            data: detallePedidos,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching detallePedidos',
        };
        res.status(500).json(response);
    }
};

export const updateDetallePedido = async (req: Request, res: Response) => {
    const { id, pedido_id, comida_id, cantidad, precio }: UpdateDetallePedidoRequest = req.body;

    try {
        await query('CALL EditarDetallePedido(?, ?, ?, ?, ?)', [id, pedido_id, comida_id, cantidad, precio]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'DetallePedido updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating detallePedido',
        };
        res.status(500).json(response);
    }
};

export const deleteDetallePedido = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarDetallePedido(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'DetallePedido deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting detallePedido',
        };
        res.status(500).json(response);
    }
};