import { Request, Response } from 'express';
import { query } from '../database';
import { Valoracion, CreateValoracionRequest, UpdateValoracionRequest } from '../interfaces/valoracion';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createValoracion = async (req: Request, res: Response) => {
    const { comida_id, valoracion, comentario }: CreateValoracionRequest = req.body;

    try {
        await query('CALL InsertarValoracion(?, ?, ?)', [comida_id, valoracion, comentario]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Valoracion created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating valoracion',
        };
        res.status(500).json(response);
    }
};

export const getValoraciones = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarValoraciones()') as RowDataPacket[][];
        const valoracionesJson = rows[0].valoraciones;
        const valoraciones: Valoracion[] = JSON.parse(valoracionesJson);

        const response: ApiResponse<Valoracion[]> = {
            success: true,
            data: valoraciones,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching valoraciones',
        };
        res.status(500).json(response);
    }
};

export const updateValoracion = async (req: Request, res: Response) => {
    const { id, comida_id, valoracion, comentario }: UpdateValoracionRequest = req.body;

    try {
        await query('CALL EditarValoracion(?, ?, ?, ?)', [id, comida_id, valoracion, comentario]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Valoracion updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating valoracion',
        };
        res.status(500).json(response);
    }
};

export const deleteValoracion = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarValoracion(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Valoracion deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting valoracion',
        };
        res.status(500).json(response);
    }
};