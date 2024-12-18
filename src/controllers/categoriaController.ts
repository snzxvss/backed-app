import { Request, Response } from 'express';
import { query } from '../database';
import { Categoria, CreateCategoriaRequest, UpdateCategoriaRequest } from '../interfaces/categoria';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createCategoria = async (req: Request, res: Response) => {
    const { nombre, descripcion }: CreateCategoriaRequest = req.body;

    try {
        await query('CALL InsertarCategoria(?, ?)', [nombre, descripcion]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Categoria created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating categoria',
        };
        res.status(500).json(response);
    }
};

export const getCategorias = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarCategorias()') as RowDataPacket[][];
        const categoriasJson = rows[0].categorias;
        const categorias: Categoria[] = JSON.parse(categoriasJson);

        const response: ApiResponse<Categoria[]> = {
            success: true,
            data: categorias,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching categorias',
        };
        res.status(500).json(response);
    }
};

export const updateCategoria = async (req: Request, res: Response) => {
    const { id, nombre, descripcion }: UpdateCategoriaRequest = req.body;

    try {
        await query('CALL EditarCategoria(?, ?, ?)', [id, nombre, descripcion]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Categoria updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating categoria',
        };
        res.status(500).json(response);
    }
};

export const deleteCategoria = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarCategoria(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Categoria deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting categoria',
        };
        res.status(500).json(response);
    }
};