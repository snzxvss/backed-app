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

export const createSugerenciaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('sugerencia', 'La sugerencia es obligatoria').notEmpty().isString().withMessage('La sugerencia debe ser una cadena de texto'),
    validationChecks,
];

export const updateSugerenciaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('sugerencia', 'La sugerencia es obligatoria').optional().notEmpty().isString().withMessage('La sugerencia debe ser una cadena de texto'),
    validationChecks,
];

export const deleteSugerenciaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];