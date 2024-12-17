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

export const createDetallePedidoMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('cantidad', 'La cantidad es obligatoria').notEmpty().isInt().withMessage('La cantidad debe ser un valor numérico'),
    check('precio', 'El precio es obligatorio').notEmpty().isDecimal().withMessage('El precio debe ser un valor decimal'),
    validationChecks,
];

export const updateDetallePedidoMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('cantidad', 'La cantidad es obligatoria').optional().notEmpty().isInt().withMessage('La cantidad debe ser un valor numérico'),
    check('precio', 'El precio es obligatorio').optional().notEmpty().isDecimal().withMessage('El precio debe ser un valor decimal'),
    validationChecks,
];

export const deleteDetallePedidoMiddlewares: RequestHandler[] = [
    jwtValidation,
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];