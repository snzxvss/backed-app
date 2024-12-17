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

export const createComidaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('nombre', 'El nombre es obligatorio').notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    check('precio', 'El precio es obligatorio').notEmpty().isDecimal().withMessage('El precio debe ser un valor decimal'),
    check('categoria_id', 'La categoría es obligatoria').optional().isInt().withMessage('La categoría debe ser un valor numérico'),
    validationChecks,
];

export const updateComidaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    check('precio', 'El precio es obligatorio').optional().notEmpty().isDecimal().withMessage('El precio debe ser un valor decimal'),
    check('categoria_id', 'La categoría es obligatoria').optional().isInt().withMessage('La categoría debe ser un valor numérico'),
    validationChecks,
];

export const deleteComidaMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];