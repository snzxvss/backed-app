import { Router } from 'express';
import { loginByPhone, loginByEmailAndPassword } from '../controllers/authController';
import { loginByPhoneMiddlewares, loginByEmailAndPasswordMiddlewares } from '../middlewares/authValidation';
import { createUser, createUserByPhone, getUsers, updateUser, deleteUser } from '../controllers/userController';
import { createUserMiddlewares, createUserByPhoneMiddlewares, updateUserMiddlewares, deleteUserMiddlewares } from '../middlewares/userValidation';
import { createComida, getComidas, updateComida, deleteComida } from '../controllers/comidaController';
import { createComidaMiddlewares, updateComidaMiddlewares, deleteComidaMiddlewares } from '../middlewares/comidaValidation';
import { createPedido, getPedidos, updatePedido, deletePedido } from '../controllers/pedidoController';
import { createPedidoMiddlewares, updatePedidoMiddlewares, deletePedidoMiddlewares } from '../middlewares/pedidoValidation';
import { createDetallePedido, getDetallePedidos, updateDetallePedido, deleteDetallePedido } from '../controllers/detallePedidoController';
import { createDetallePedidoMiddlewares, updateDetallePedidoMiddlewares, deleteDetallePedidoMiddlewares } from '../middlewares/detallePedidoValidation';
import { createEstadoPedido, getEstadosPedido, updateEstadoPedido, deleteEstadoPedido } from '../controllers/estadoPedidoController';
import { createEstadoPedidoMiddlewares, updateEstadoPedidoMiddlewares, deleteEstadoPedidoMiddlewares } from '../middlewares/estadoPedidoValidation';
import { createOferta, getOfertas, updateOferta, deleteOferta } from '../controllers/ofertaController';
import { createOfertaMiddlewares, updateOfertaMiddlewares, deleteOfertaMiddlewares } from '../middlewares/ofertaValidation';
import { createCategoria, getCategorias, updateCategoria, deleteCategoria } from '../controllers/categoriaController';
import { createCategoriaMiddlewares, updateCategoriaMiddlewares, deleteCategoriaMiddlewares } from '../middlewares/categoriaValidation';
import { createRol, getRoles, updateRol, deleteRol } from '../controllers/rolController';
import { createRolMiddlewares, updateRolMiddlewares, deleteRolMiddlewares } from '../middlewares/rolValidation';
import { createSugerencia, getSugerencias, updateSugerencia, deleteSugerencia } from '../controllers/sugerenciaController';
import { createSugerenciaMiddlewares, updateSugerenciaMiddlewares, deleteSugerenciaMiddlewares } from '../middlewares/sugerenciaValidation';
import { createValoracion, getValoraciones, updateValoracion, deleteValoracion } from '../controllers/valoracionController';
import { createValoracionMiddlewares, updateValoracionMiddlewares, deleteValoracionMiddlewares } from '../middlewares/valoracionValidation';


import { jwtValidation } from '../middlewares/jwtValidation';

const router = Router();

router.post('/auth/login/phone', loginByPhoneMiddlewares, loginByPhone);
router.post('/auth/login/email', loginByEmailAndPasswordMiddlewares, loginByEmailAndPassword);

// User
router.post('/users', jwtValidation, createUserMiddlewares, createUser);
router.post('/users/phone', jwtValidation, createUserByPhoneMiddlewares, createUserByPhone);
router.get('/users', jwtValidation, getUsers);
router.put('/users', jwtValidation, updateUserMiddlewares, updateUser);
router.delete('/users/:id', jwtValidation, deleteUserMiddlewares, deleteUser);

// Comida
router.post('/comidas', jwtValidation, createComidaMiddlewares, createComida);
router.get('/comidas', jwtValidation, getComidas);
router.put('/comidas', jwtValidation, updateComidaMiddlewares, updateComida);
router.delete('/comidas/:id', jwtValidation, deleteComidaMiddlewares, deleteComida);

// Pedido
router.post('/pedidos', jwtValidation, createPedidoMiddlewares, createPedido);
router.get('/pedidos', jwtValidation, getPedidos);
router.put('/pedidos', jwtValidation, updatePedidoMiddlewares, updatePedido);
router.delete('/pedidos/:id', jwtValidation, deletePedidoMiddlewares, deletePedido);

//DetallePedido
router.post('/detallepedidos', jwtValidation, createDetallePedidoMiddlewares, createDetallePedido);
router.get('/detallepedidos', jwtValidation, getDetallePedidos);
router.put('/detallepedidos', jwtValidation, updateDetallePedidoMiddlewares, updateDetallePedido);
router.delete('/detallepedidos/:id', jwtValidation, deleteDetallePedidoMiddlewares, deleteDetallePedido);

//EstadoPedido
router.post('/estadosPedido', jwtValidation, createEstadoPedidoMiddlewares, createEstadoPedido);
router.get('/estadosPedido', jwtValidation, getEstadosPedido);
router.put('/estadosPedido', jwtValidation, updateEstadoPedidoMiddlewares, updateEstadoPedido);
router.delete('/estadosPedido/:id', jwtValidation, deleteEstadoPedidoMiddlewares, deleteEstadoPedido);

//Ofertas
router.post('/ofertas', jwtValidation, createOfertaMiddlewares, createOferta);
router.get('/ofertas', jwtValidation, getOfertas);
router.put('/ofertas', jwtValidation, updateOfertaMiddlewares, updateOferta);
router.delete('/ofertas/:id', jwtValidation, deleteOfertaMiddlewares, deleteOferta);

//Categorias
router.post('/categorias', jwtValidation, createCategoriaMiddlewares, createCategoria);
router.get('/categorias', jwtValidation, getCategorias);
router.put('/categorias', jwtValidation, updateCategoriaMiddlewares, updateCategoria);
router.delete('/categorias/:id', jwtValidation, deleteCategoriaMiddlewares, deleteCategoria);

//Rol
router.post('/roles', jwtValidation, createRolMiddlewares, createRol);
router.get('/roles', jwtValidation, getRoles);
router.put('/roles', jwtValidation, updateRolMiddlewares, updateRol);
router.delete('/roles/:id', jwtValidation, deleteRolMiddlewares, deleteRol);

//Sugerencias
router.post('/sugerencias', jwtValidation,  createSugerenciaMiddlewares, createSugerencia);
router.get('/sugerencias', jwtValidation,  getSugerencias);
router.put('/sugerencias', jwtValidation, updateSugerenciaMiddlewares, updateSugerencia);
router.delete('/sugerencias/:id', jwtValidation, deleteSugerenciaMiddlewares, deleteSugerencia);

//Valoraciones
router.post('/valoraciones', jwtValidation, createValoracionMiddlewares, createValoracion);
router.get('/valoraciones', jwtValidation, getValoraciones);
router.put('/valoraciones', jwtValidation, updateValoracionMiddlewares, updateValoracion);
router.delete('/valoraciones/:id', jwtValidation, deleteValoracionMiddlewares, deleteValoracion);


export default router;