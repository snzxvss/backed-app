import { Request, Response } from 'express';
import { query } from '../database';
import { Oferta, CreateOfertaRequest, UpdateOfertaRequest } from '../interfaces/oferta';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createOferta = async (req: Request, res: Response) => {
    const { comida_id, descripcion, descuento, fecha_inicio, fecha_fin, foto_url }: CreateOfertaRequest = req.body;

    try {
        await query('CALL InsertarOferta(?, ?, ?, ?, ?, ?)', [comida_id, descripcion, descuento, fecha_inicio, fecha_fin, foto_url]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Oferta created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating oferta',
        };
        res.status(500).json(response);
    }
};

export const getOfertas = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarOfertas()') as RowDataPacket[][];
        const ofertasJson = rows[0].ofertas;
        const ofertas: Oferta[] = JSON.parse(ofertasJson);

        const response: ApiResponse<Oferta[]> = {
            success: true,
            data: ofertas,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching ofertas',
        };
        res.status(500).json(response);
    }
};

export const updateOferta = async (req: Request, res: Response) => {
    const { id, comida_id, descripcion, descuento, fecha_inicio, fecha_fin, foto_url }: UpdateOfertaRequest = req.body;

    try {
        await query('CALL EditarOferta(?, ?, ?, ?, ?, ?, ?)', [id, comida_id, descripcion, descuento, fecha_inicio, fecha_fin, foto_url]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Oferta updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating oferta',
        };
        res.status(500).json(response);
    }
};

export const deleteOferta = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarOferta(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Oferta deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting oferta',
        };
        res.status(500).json(response);
    }
};