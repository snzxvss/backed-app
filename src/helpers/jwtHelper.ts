import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user';

const secretKey = 'secretkey';

export const generateToken = (user: User): string => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        telefono: user.telefono,
        rol_id: user.rol_id,
    };

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): User | null => {
    try {
        const decoded = jwt.verify(token, secretKey) as User;
        return decoded;
    } catch (error) {
        return null;
    }
};