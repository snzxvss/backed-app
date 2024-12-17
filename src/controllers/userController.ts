import { Request, Response } from 'express';
import { query } from '../database';
import { User, CreateUserRequest, CreateUserByPhoneRequest, UpdateUserRequest } from '../interfaces/user';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { RowDataPacket } from 'mysql2';

export const createUser = async (req: Request, res: Response) => {
    const { nombre, email, telefono, password, rol_id }: CreateUserRequest = req.body;

    try {
        await query('CALL InsertarUsuarioCompleto(?, ?, ?, ?, ?)', [nombre, email, telefono, password, rol_id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'User created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating user',
        };
        res.status(500).json(response);
    }
};

export const createUserByPhone = async (req: Request, res: Response) => {
    const { telefono }: CreateUserByPhoneRequest = req.body;

    try {
        await query('CALL InsertarUsuarioPorTelefono(?)', [telefono]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'User created successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error creating user',
        };
        res.status(500).json(response);
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const [rows] = await query('CALL ConsultarUsuarios ()') as RowDataPacket[][];
        const usersJson = rows[0].usuarios;
        const users: User[] = JSON.parse(usersJson);

        const response: ApiResponse<User[]> = {
            success: true,
            data: users,
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error fetching users',
        };
        res.status(500).json(response);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id, nombre, email, telefono, password, rol_id }: UpdateUserRequest = req.body;

    try {
        await query('CALL EditarUsuario(?, ?, ?, ?, ?, ?)', [id, nombre, email, telefono, password, rol_id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'User updated successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error updating user',
        };
        res.status(500).json(response);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await query('CALL EliminarUsuario(?)', [id]);
        const response: ApiResponse<null> = {
            success: true,
            message: 'User deleted successfully',
        };
        res.json(response);
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Error deleting user',
        };
        res.status(500).json(response);
    }
};