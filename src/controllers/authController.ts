import { Request, Response } from 'express';
import { query } from '../database';
import { User, LoginByPhoneRequest, LoginByEmailAndPasswordRequest } from '../interfaces/user';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';
import { generateToken } from '../helpers/jwtHelper';
import { RowDataPacket } from 'mysql2';

export const loginByPhone = async (req: Request, res: Response) => {
    const { telefono }: LoginByPhoneRequest = req.body;

    try {
        const [rows] = await query('CALL AutenticarPorTelefono(?)', [telefono]) as RowDataPacket[][];
        console.log('rows: ', rows);
        const userJson = rows[0].user || rows[0].response;
        const parsedResponse = JSON.parse(userJson);

        if (parsedResponse.id) {
            const token = generateToken(parsedResponse);
            const response: ApiResponse<{ user: User; token: string }> = {
                success: true,
                data: { user: parsedResponse, token },
                message: 'Login successful',
            };
            res.json(response);
        } else {
            const response: ErrorResponse = {
                success: false,
                message: parsedResponse.message,
            };
            res.status(404).json(response);
        }
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Internal server error',
        };
        res.status(500).json(response);
        console.log(error);
    }
};

export const loginByEmailAndPassword = async (req: Request, res: Response) => {
    const { email, password }: LoginByEmailAndPasswordRequest = req.body;

    try {
        const [rows] = await query('CALL AutenticarPorUsuario(?, ?)', [email, password]) as RowDataPacket[][];
        const userJson = rows[0].user;
        const user: User = JSON.parse(userJson);
        console.log('user: ', user);
        if (user) {
            const token = generateToken(user);
            const response: ApiResponse<{ user: User; token: string }> = {
                success: true,
                data: { user, token },
                message: 'Login successful',
            };
            res.json(response);
        } else {
            const response: ErrorResponse = {
                success: false,
                message: 'Invalid email or password',
            };
            res.status(401).json(response);
        }
    } catch (error) {
        const response: ErrorResponse = {
            success: false,
            message: 'Internal server error',
        };
        res.status(500).json(response);
    }
};