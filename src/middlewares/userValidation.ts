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

export const createUserMiddlewares: RequestHandler[] = [
    check('nombre', 'El nombre es obligatorio').notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    check('email', 'El correo electrónico es obligatorio').notEmpty().isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('telefono', 'El número de teléfono es obligatorio').notEmpty().isString().withMessage('El número de teléfono debe ser una cadena de texto'),
    check('password', 'La contraseña es obligatoria').notEmpty().isString().withMessage('La contraseña debe ser una cadena de texto'),
    check('rol_id', 'El rol es obligatorio').notEmpty().isInt().withMessage('El rol debe ser un valor numérico'),
    validationChecks,
];

export const createUserByPhoneMiddlewares: RequestHandler[] = [
    check('telefono', 'El número de teléfono es obligatorio').notEmpty().isString().withMessage('El número de teléfono debe ser una cadena de texto'),
    validationChecks,
];

export const updateUserMiddlewares: RequestHandler[] = [
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty().isString().withMessage('El nombre debe ser una cadena de texto'),
    check('email', 'El correo electrónico es obligatorio').optional().notEmpty().isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('telefono', 'El número de teléfono es obligatorio').optional().notEmpty().isString().withMessage('El número de teléfono debe ser una cadena de texto'),
    check('password', 'La contraseña es obligatoria').optional().notEmpty().isString().withMessage('La contraseña debe ser una cadena de texto'),
    check('rol_id', 'El rol es obligatorio').optional().notEmpty().isInt().withMessage('El rol debe ser un valor numérico'),
    validationChecks,
];

export const deleteUserMiddlewares: RequestHandler[] = [
    check('id', 'El ID es obligatorio').notEmpty().isInt().withMessage('El ID debe ser un valor numérico'),
    validationChecks,
];