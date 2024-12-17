import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from './database';
import router from './routes/index';
import swaggerDocs from './swagger/swaggerDocs';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

createConnection().then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection failed:', error);
});

app.use('/api', router);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log('Swagger is running on http://localhost:3000/api-docs');
});

export default app;