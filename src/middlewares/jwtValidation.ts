import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../helpers/jwtHelper';
import { ErrorResponse } from '../interfaces/apiResponse';
import { User } from '../interfaces/user';

interface AuthenticatedRequest extends Request {
    user?: User;
}

export const jwtValidation: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        const response: ErrorResponse = {
            success: false,
            message: 'Token no encontrado, autenticación fallida.',
        };
        return res.status(401).json(response);
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);

    if (!user) {
        const response: ErrorResponse = {
            success: false,
            message: 'El token es invalido o expiró.',
        };
        return res.status(401).json(response);
    }

    req.user = user; // Attach the user to the request object
    next();
};