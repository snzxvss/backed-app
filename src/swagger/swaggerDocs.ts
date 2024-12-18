import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Backend App API',
            version: '1.0.0',
            description: 'API documentation for My Backend App',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        telefono: { type: 'string' },
                        rol_id: { type: 'number' },
                    },
                },
                Comida: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        precio: { type: 'number' },
                        categoria_id: { type: 'number' },
                        foto_url: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                Pedido: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        mesa_identificador: { type: 'string' },
                        estado_id: { type: 'number' },
                        usuario_id: { type: 'number' },
                        total: { type: 'number' },
                        fecha_pedido: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                DetallePedido: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        pedido_id: { type: 'number' },
                        comida_id: { type: 'number' },
                        cantidad: { type: 'number' },
                        precio: { type: 'number' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                EstadoPedido: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                    EstadoPedido: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            fecha_creacion: { type: 'string' },
                            fecha_actualizacion: { type: 'string' },
                        },
                    },
                },
                Oferta: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        comida_id: { type: 'number' },
                        descripcion: { type: 'string' },
                        descuento: { type: 'number' },
                        fecha_inicio: { type: 'string' },
                        fecha_fin: { type: 'string' },
                        foto_url: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                Categoria: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                Rol: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        nombre: { type: 'string' },
                        descripcion: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                Sugerencia: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        categoria_id: { type: 'number' },
                        sugerencia: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                Valoracion: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        comida_id: { type: 'number' },
                        valoracion: { type: 'number' },
                        comentario: { type: 'string' },
                        fecha_creacion: { type: 'string' },
                        fecha_actualizacion: { type: 'string' },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/swagger/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;