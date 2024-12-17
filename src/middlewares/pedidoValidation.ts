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

export const createPedidoMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('mesa_identificador', 'El identificador de la mesa es obligatorio').notEmpty().isString().withMessage('El identificador de la mesa debe ser una cadena de texto'),
    check('total', 'El total es obligatorio').notEmpty().isDecimal().withMessage('El total debe ser un valor decimal'),
    validationChecks,
];

export const updatePedidoMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('mesa_identificador', 'El identificador de la mesa es obligatorio').optional().notEmpty().isString().withMessage('El identificador de la mesa debe ser una cadena de texto'),
    check('total', 'El total es obligatorio').optional().notEmpty().isDecimal().withMessage('El total debe ser un valor decimal'),
    validationChecks,
];

export const deletePedidoMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];