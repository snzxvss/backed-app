import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { jwtValidation } from './jwtValidation';

const validationChecks: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid request data',
            errors: errors.array(),
        });
    }
    next();
};

export const createCategoriaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('nombre', 'El nombre es obligatorio').notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    validationChecks,
];

export const updateCategoriaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    validationChecks,
];

export const deleteCategoriaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];