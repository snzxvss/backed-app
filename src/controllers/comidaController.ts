import { Request, Response } from 'express';
import { query } from '../database';
import { Comida, CreateComidaRequest, UpdateComidaRequest } from '../interfaces/comida';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';


export const createComida = async (req: Request, res: Response) => {
    const { nombre, descripcion, precio, categoria_id, foto_url }: CreateComidaRequest = req.body;

    try {
        await query('CALL InsertarComida(?, ?, ?, ?, ?)', [nombre, descripcion, precio, categoria_id, foto_url]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Comida created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating comida',
        };
        res.status(500).json(response);
    }
};

export const getComidas = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarComidas()') as RowDataPacket[][];
        const comidasJson = rows[0].comidas;
        const comidas: Comida[] = JSON.parse(comidasJson);

        const response: ApiResponse<Comida[]> = {
            success: true,
            data: comidas,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching comidas',
        };
        res.status(500).json(response);
    }
};

export const updateComida = async (req: Request, res: Response) => {
    const { id, nombre, descripcion, precio, categoria_id, foto_url }: UpdateComidaRequest = req.body;

    try {
        await query('CALL EditarComida(?, ?, ?, ?, ?, ?)', [id, nombre, descripcion, precio, categoria_id, foto_url]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Comida updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating comida',
        };
        res.status(500).json(response);
    }
};

export const deleteComida = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarComida(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Comida deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting comida',
        };
        res.status(500).json(response);
    }
};