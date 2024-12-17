import { check } from 'express-validator';
import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

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

export const loginByPhoneMiddlewares: RequestHandler[] = [
    check('telefono', 'El número de teléfono es obligatorio').notEmpty().isString().withMessage('El número de teléfono debe ser una cadena de texto'),
    validationChecks,
];

export const loginByEmailAndPasswordMiddlewares: RequestHandler[] = [
    check('email', 'El correo electrónico es obligatorio').notEmpty().isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('password', 'La contraseña es obligatoria').notEmpty().isString().withMessage('La contraseña debe ser una cadena de texto'),
    validationChecks,
];