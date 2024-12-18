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

export const createValoracionMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('valoracion', 'La valoración es obligatoria y debe estar entre 1 y 5').notEmpty().isInt({ min: 1, max: 5 }).withMessage('La valoración debe ser un valor numérico entre 1 y 5'),
    validationChecks,
];

export const updateValoracionMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('valoracion', 'La valoración debe estar entre 1 y 5').optional().isInt({ min: 1, max: 5 }).withMessage('La valoración debe ser un valor numérico entre 1 y 5'),
    validationChecks,
];

export const deleteValoracionMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];