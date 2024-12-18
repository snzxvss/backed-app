import { Request, Response } from 'express';
import { query } from '../database';
import { Rol, CreateRolRequest, UpdateRolRequest } from '../interfaces/rol';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createRol = async (req: Request, res: Response) => {
    const { nombre, descripcion }: CreateRolRequest = req.body;

    try {
        await query('CALL InsertarRol(?, ?)', [nombre, descripcion]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Rol created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating rol',
        };
        res.status(500).json(response);
    }
};

export const getRoles = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarRoles()') as RowDataPacket[][];
        const rolesJson = rows[0].roles;
        const roles: Rol[] = JSON.parse(rolesJson);

        const response: ApiResponse<Rol[]> = {
            success: true,
            data: roles,
        };
        res.setHeader('Cache-Control', 'no-store'); // Disable caching
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching roles',
        };
        res.status(500).json(response);
    }
};

export const updateRol = async (req: Request, res: Response) => {
    const { id, nombre, descripcion }: UpdateRolRequest = req.body;

    try {
        await query('CALL EditarRol(?, ?, ?)', [id, nombre, descripcion]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Rol updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating rol',
        };
        res.status(500).json(response);
    }
};

export const deleteRol = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarRol(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'Rol deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting rol',
        };
        res.status(500).json(response);
    }
};