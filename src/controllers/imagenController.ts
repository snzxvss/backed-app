import { Request, Response } from 'express';
import { ApiResponse, ErrorResponse } from '../interfaces/apiResponse';

export const uploadImagen = async (req: Request, res: Response) => {
    if (!req.file) {
        const response: ErrorResponse = {
            success: false,
            message: 'No se ha subido ninguna imagen',
        };
        console.log('No file received');
        return res.status(400).json(response);
    }

    const filename = req.file.filename;
    const imagenPath = `/images/${filename}`;
    console.log('Image uploaded successfully:', imagenPath);

    const response: ApiResponse<{ path: string }> = {
        success: true,
        data: { path: imagenPath },
        message: 'Imagen subida correctamente',
    };

    return res.json(response);
};