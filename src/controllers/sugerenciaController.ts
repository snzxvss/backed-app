import { Request, Response } from 'express';
import { query } from '../database';
import { Sugerencia, CreateSugerenciaRequest, UpdateSugerenciaRequest } from '../interfaces/sugerencia';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createSugerencia = async (req: Request, res: Response) => {
    const { categoria_id, sugerencia }: CreateSugerenciaRequest = req.body;

    try {
        await query('CALL InsertarSugerencia(?, ?)', [categoria_id, sugerencia]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Sugerencia created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating sugerencia',
        };
        res.status(500).json(response);
    }
};

export const getSugerencias = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarSugerencias()') as RowDataPacket[][];
        const sugerenciasJson = rows[0].sugerencias;
        const sugerencias: Sugerencia[] = JSON.parse(sugerenciasJson);

        const response: ApiResponse<Sugerencia[]> = {
            success: true,
            data: sugerencias,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching sugerencias',
        };
        res.status(500).json(response);
    }
};

export const updateSugerencia = async (req: Request, res: Response) => {
    const { id, categoria_id, sugerencia }: UpdateSugerenciaRequest = req.body;

    try {
        await query('CALL EditarSugerencia(?, ?, ?)', [id, categoria_id, sugerencia]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Sugerencia updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating sugerencia',
        };
        res.status(500).json(response);
    }
};

export const deleteSugerencia = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarSugerencia(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Sugerencia deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting sugerencia',
        };
        res.status(500).json(response);
    }
};