import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const imagesPath = path.join(__dirname, '..', '..', 'public', 'images');
        console.log('Uploading images to:', imagesPath); // Log para depuración
        cb(null, imagesPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtrar tipos de archivo
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        console.log('File accepted:', file.originalname); // Log para depuración
        return cb(null, true);
    } else {
        console.log('File rejected:', file.originalname); // Log para depuración
        cb(new Error('Solo se permiten imágenes de tipo JPEG, JPG, PNG o GIF'));
    }
};

// Configuración de multer
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter
});