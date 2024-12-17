import { Request, Response } from 'express';
import { query } from '../database';
import { EstadoPedido, CreateEstadoPedidoRequest, UpdateEstadoPedidoRequest } from '../interfaces/estadoPedido';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createEstadoPedido = async (req: Request, res: Response) => {
    const { nombre, descripcion }: CreateEstadoPedidoRequest = req.body;

    try {
        await query('CALL InsertarEstadoPedido(?, ?)', [nombre, descripcion]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'EstadoPedido created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating estadoPedido',
        };
        res.status(500).json(response);
    }
};

export const getEstadosPedido = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarEstadosPedido()') as RowDataPacket[][];
        const estadosPedidoJson = rows[0].estadospedido;
        const estadosPedido: EstadoPedido[] = JSON.parse(estadosPedidoJson);

        const response: ApiResponse<EstadoPedido[]> = {
            success: true,
            data: estadosPedido,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching estadosPedido',
        };
        res.status(500).json(response);
    }
};

export const updateEstadoPedido = async (req: Request, res: Response) => {
    const { id, nombre, descripcion }: UpdateEstadoPedidoRequest = req.body;

    try {
        await query('CALL EditarEstadoPedido(?, ?, ?)', [id, nombre, descripcion]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'EstadoPedido updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating estadoPedido',
        };
        res.status(500).json(response);
    }
};

export const deleteEstadoPedido = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarEstadoPedido(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'EstadoPedido deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting estadoPedido',
        };
        res.status(500).json(response);
    }
};