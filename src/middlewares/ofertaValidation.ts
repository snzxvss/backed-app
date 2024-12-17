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

export const createOfertaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('descuento', 'El descuento es obligatorio y debe estar entre 0 y 100').notEmpty().isFloat({ min: 0, max: 100 }).withMessage('El descuento debe ser un valor decimal entre 0 y 100'),
    check('fecha_inicio', 'La fecha de inicio es obligatoria').notEmpty().isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),
    check('fecha_fin', 'La fecha de fin es obligatoria').notEmpty().isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),
    validationChecks,
];

export const updateOfertaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('descuento', 'El descuento debe estar entre 0 y 100').optional().isFloat({ min: 0, max: 100 }).withMessage('El descuento debe ser un valor decimal entre 0 y 100'),
    check('fecha_inicio', 'La fecha de inicio debe ser una fecha válida').optional().isISO8601().withMessage('La fecha de inicio debe ser una fecha válida'),
    check('fecha_fin', 'La fecha de fin debe ser una fecha válida').optional().isISO8601().withMessage('La fecha de fin debe ser una fecha válida'),
    validationChecks,
];

export const deleteOfertaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];