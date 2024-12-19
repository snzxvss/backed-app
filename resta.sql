-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2024 a las 23:50:35
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `resta`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AutenticarPorTelefono` (IN `p_telefono` VARCHAR(15))   BEGIN
    DECLARE userJson TEXT;

    SELECT JSON_OBJECT(
        'id', id,
        'nombre', nombre,
        'email', email,
        'telefono', telefono,
        'rol_id', rol_id
    ) INTO userJson
    FROM Usuarios
    WHERE telefono = p_telefono;

    IF userJson IS NOT NULL THEN
        SELECT userJson AS user;
    ELSE
        SELECT JSON_OBJECT(
            'status', 'error',
            'message', 'User not found'
        ) AS response;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AutenticarPorUsuario` (IN `p_email` VARCHAR(100), IN `p_password` VARCHAR(255))   BEGIN
    SELECT JSON_OBJECT(
        'id', id,
        'nombre', nombre,
        'email', email,
        'telefono', telefono,
        'rol_id', rol_id
    ) AS user
    FROM Usuarios
    WHERE email = p_email AND password = p_password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarCategorias` ()   BEGIN
  SELECT CONCAT(
    '[',
    GROUP_CONCAT(
      JSON_OBJECT(
        'id', id,
        'nombre', nombre,
        'descripcion', IFNULL(descripcion, ''),
        'fecha_creacion', DATE_FORMAT(fecha_creacion, '%Y-%m-%d %H:%i:%s'),
        'fecha_actualizacion', DATE_FORMAT(fecha_actualizacion, '%Y-%m-%d %H:%i:%s'),
        'imagen', imagen
      )
    ),
    ']'
  ) AS categorias
  FROM categorias;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarComidas` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'nombre', nombre,
            'descripcion', descripcion,
            'precio', precio,
            'categoria_id', categoria_id,
            'foto_url', foto_url,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS comidas
    FROM comida;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarDetallePedidos` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'pedido_id', pedido_id,
            'comida_id', comida_id,
            'cantidad', cantidad,
            'precio', precio,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS detallepedidos
    FROM detallepedidos;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarEstadosPedido` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'nombre', nombre,
            'descripcion', descripcion,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS estadospedido
    FROM estadospedido;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarOfertas` ()   BEGIN
    SELECT CONCAT(
        '[',
        GROUP_CONCAT(
            JSON_OBJECT(
                'id', o.id,
                'comida_id', o.comida_id,
                'descripcion', o.descripcion,
                'descuento', o.descuento,
                'fecha_inicio', o.fecha_inicio,
                'fecha_fin', o.fecha_fin,
                'foto_url', COALESCE(o.foto_url, c.foto_url),
                'fecha_creacion', o.fecha_creacion,
                'fecha_actualizacion', o.fecha_actualizacion
            ) SEPARATOR ','
        ),
        ']'
    ) AS ofertas_json
    FROM ofertas o
    LEFT JOIN comida c ON o.comida_id = c.id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarPedidos` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'mesa_identificador', mesa_identificador,
            'estado_id', estado_id,
            'usuario_id', usuario_id,
            'total', total,
            'fecha_pedido', fecha_pedido,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS pedidos
    FROM pedidos;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarRoles` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'nombre', nombre,
            'descripcion', descripcion,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS roles
    FROM roles;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarSugerencias` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'categoria_id', categoria_id,
            'sugerencia', sugerencia,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS sugerencias
    FROM sugerencias;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarUsuarios` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'nombre', nombre,
            'email', email,
            'telefono', telefono,
            'rol_id', rol_id
        )
    ), ']') AS usuarios
    FROM Usuarios;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarValoraciones` ()   BEGIN
    SELECT CONCAT('[', GROUP_CONCAT(
        JSON_OBJECT(
            'id', id,
            'comida_id', comida_id,
            'valoracion', valoracion,
            'comentario', comentario,
            'fecha_creacion', fecha_creacion,
            'fecha_actualizacion', fecha_actualizacion
        )
    ), ']') AS valoraciones
    FROM valoraciones;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarCategoria` (IN `id` INT, IN `nombre` VARCHAR(100), IN `descripcion` TEXT)   BEGIN
    UPDATE categorias SET nombre = nombre, descripcion = descripcion WHERE id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarComida` (IN `p_id` INT, IN `p_nombre` VARCHAR(100), IN `p_descripcion` TEXT, IN `p_precio` DECIMAL(10,2), IN `p_categoria_id` INT, IN `p_foto_url` VARCHAR(255))   BEGIN
    UPDATE comida
    SET nombre = p_nombre,
        descripcion = p_descripcion,
        precio = p_precio,
        categoria_id = p_categoria_id,
        foto_url = p_foto_url,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarDetallePedido` (IN `p_id` INT, IN `p_pedido_id` INT, IN `p_comida_id` INT, IN `p_cantidad` INT, IN `p_precio` DECIMAL(10,2))   BEGIN
    UPDATE detallepedidos
    SET pedido_id = p_pedido_id,
        comida_id = p_comida_id,
        cantidad = p_cantidad,
        precio = p_precio,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarEstadoPedido` (IN `p_id` INT, IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(255))   BEGIN
    UPDATE estadospedido
    SET nombre = p_nombre,
        descripcion = p_descripcion,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarOferta` (IN `p_id` INT, IN `p_comida_id` INT, IN `p_descripcion` TEXT, IN `p_descuento` DECIMAL(5,2), IN `p_fecha_inicio` DATETIME, IN `p_fecha_fin` DATETIME, IN `p_foto_url` VARCHAR(255))   BEGIN
    UPDATE ofertas
    SET comida_id = p_comida_id,
        descripcion = p_descripcion,
        descuento = p_descuento,
        fecha_inicio = p_fecha_inicio,
        fecha_fin = p_fecha_fin,
        foto_url = p_foto_url,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarRol` (IN `p_id` INT, IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(255))   BEGIN
    UPDATE roles
    SET nombre = p_nombre,
        descripcion = p_descripcion,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarSugerencia` (IN `p_id` INT, IN `p_categoria_id` INT, IN `p_sugerencia` TEXT)   BEGIN
    UPDATE sugerencias
    SET categoria_id = p_categoria_id,
        sugerencia = p_sugerencia,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarUsuario` (IN `p_id` INT, IN `p_nombre` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_telefono` VARCHAR(15), IN `p_password` VARCHAR(255), IN `p_rol_id` INT)   BEGIN
    UPDATE Usuarios
    SET nombre = p_nombre,
        email = p_email,
        telefono = p_telefono,
        password = p_password,
        rol_id = p_rol_id,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EditarValoracion` (IN `id` INT, IN `comida_id` INT, IN `valoracion` INT, IN `comentario` TEXT)   BEGIN
    UPDATE valoraciones SET comida_id = comida_id, valoracion = valoracion, comentario = comentario WHERE id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarCategoria` (IN `id` INT)   BEGIN
    DELETE FROM categorias WHERE id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarComida` (IN `p_id` INT)   BEGIN
    DELETE FROM comida WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarDetallePedido` (IN `p_id` INT)   BEGIN
    DELETE FROM detallepedidos WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarEstadoPedido` (IN `p_id` INT)   BEGIN
    DELETE FROM estadospedido WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarOferta` (IN `p_id` INT)   BEGIN
    DELETE FROM ofertas WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarRol` (IN `p_id` INT)   BEGIN
    DELETE FROM roles WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarSugerencia` (IN `p_id` INT)   BEGIN
    DELETE FROM sugerencias WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarUsuario` (IN `p_id` INT)   BEGIN
    DELETE FROM Usuarios WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `EliminarValoracion` (IN `id` INT)   BEGIN
    DELETE FROM valoraciones WHERE id = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarCategoria` (IN `nombre` VARCHAR(100), IN `descripcion` TEXT)   BEGIN
    INSERT INTO categorias (nombre, descripcion) VALUES (nombre, descripcion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarComida` (IN `p_nombre` VARCHAR(100), IN `p_descripcion` TEXT, IN `p_precio` DECIMAL(10,2), IN `p_categoria_id` INT, IN `p_foto_url` VARCHAR(255))   BEGIN
    INSERT INTO comida (nombre, descripcion, precio, categoria_id, foto_url, fecha_creacion, fecha_actualizacion)
    VALUES (p_nombre, p_descripcion, p_precio, p_categoria_id, p_foto_url, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarDetallePedido` (IN `p_pedido_id` INT, IN `p_comida_id` INT, IN `p_cantidad` INT, IN `p_precio` DECIMAL(10,2))   BEGIN
    INSERT INTO detallepedidos (pedido_id, comida_id, cantidad, precio, fecha_creacion, fecha_actualizacion)
    VALUES (p_pedido_id, p_comida_id, p_cantidad, p_precio, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarEstadoPedido` (IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(255))   BEGIN
    INSERT INTO estadospedido (nombre, descripcion, fecha_creacion, fecha_actualizacion)
    VALUES (p_nombre, p_descripcion, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarOferta` (IN `p_comida_id` INT, IN `p_descripcion` TEXT, IN `p_descuento` DECIMAL(5,2), IN `p_fecha_inicio` DATETIME, IN `p_fecha_fin` DATETIME, IN `p_foto_url` VARCHAR(255))   BEGIN
    INSERT INTO ofertas (comida_id, descripcion, descuento, fecha_inicio, fecha_fin, foto_url, fecha_creacion, fecha_actualizacion)
    VALUES (p_comida_id, p_descripcion, p_descuento, p_fecha_inicio, p_fecha_fin, p_foto_url, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarRol` (IN `p_nombre` VARCHAR(50), IN `p_descripcion` VARCHAR(255))   BEGIN
    INSERT INTO roles (nombre, descripcion, fecha_creacion, fecha_actualizacion)
    VALUES (p_nombre, p_descripcion, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarSugerencia` (IN `p_categoria_id` INT, IN `p_sugerencia` TEXT)   BEGIN
    INSERT INTO sugerencias (categoria_id, sugerencia, fecha_creacion, fecha_actualizacion)
    VALUES (p_categoria_id, p_sugerencia, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarUsuarioCompleto` (IN `p_nombre` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_telefono` VARCHAR(15), IN `p_password` VARCHAR(255), IN `p_rol_id` INT)   BEGIN
    INSERT INTO Usuarios (nombre, email, telefono, password, rol_id, fecha_creacion, fecha_actualizacion)
    VALUES (p_nombre, p_email, p_telefono, p_password, p_rol_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarUsuarioPorTelefono` (IN `p_telefono` VARCHAR(15))   BEGIN
    INSERT INTO Usuarios (telefono, fecha_creacion, fecha_actualizacion)
    VALUES (p_telefono, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarValoracion` (IN `comida_id` INT, IN `valoracion` INT, IN `comentario` TEXT)   BEGIN
    INSERT INTO valoraciones (comida_id, valoracion, comentario) VALUES (comida_id, valoracion, comentario);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auditoria`
--

CREATE TABLE `auditoria` (
  `id` int(11) NOT NULL,
  `tabla` varchar(50) NOT NULL,
  `operacion` varchar(50) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `fecha_creacion`, `fecha_actualizacion`, `imagen`) VALUES
(1, 'Entradas', 'Platos de entrada', '2024-12-17 19:51:10', '2024-12-19 20:21:46', '/images/1734638956859-484161595.png'),
(2, 'Platos principales', 'Platos principales', '2024-12-17 19:51:10', '2024-12-19 20:21:49', '/images/1734638956859-484161595.png'),
(3, 'Postres', 'Postres', '2024-12-17 19:51:10', '2024-12-19 20:21:52', '/images/1734638956859-484161595.png'),
(4, 'Bebidas', 'Bebidas', '2024-12-17 19:51:10', '2024-12-19 20:21:54', '/images/1734638956859-484161595.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comida`
--

CREATE TABLE `comida` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comida`
--

INSERT INTO `comida` (`id`, `nombre`, `descripcion`, `precio`, `categoria_id`, `foto_url`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Ensalada Cesar', 'Ensalada con lechuga, crutones y aderezo Cesar', 20000.00, 1, '/images/1734643041371-102985027.jpg', '2024-12-17 19:51:10', '2024-12-19 21:18:27'),
(2, 'Sopa de Pollo', 'Sopa de pollo con verduras', 30000.00, 2, '/images/1734643041371-102985027.jpg', '2024-12-17 19:51:10', '2024-12-19 21:18:22'),
(3, 'Tarta de Queso', 'Tarta de queso con mermelada de fresa', 12000.00, 3, '/images/1734643041371-102985027.jpg', '2024-12-17 19:51:10', '2024-12-19 21:18:34'),
(4, 'Jugo de Naranja', 'Jugo de naranja natural', 4000.00, 4, '/images/1734643041371-102985027.jpg', '2024-12-17 19:51:10', '2024-12-19 21:18:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedidos`
--

CREATE TABLE `detallepedidos` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `comida_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detallepedidos`
--

INSERT INTO `detallepedidos` (`id`, `pedido_id`, `comida_id`, `cantidad`, `precio`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 1, 2, 5.99, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 1, 2, 1, 4.99, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(3, 2, 3, 1, 3.99, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(4, 2, 4, 2, 2.99, '2024-12-17 19:51:10', '2024-12-17 19:51:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadospedido`
--

CREATE TABLE `estadospedido` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estadospedido`
--

INSERT INTO `estadospedido` (`id`, `nombre`, `descripcion`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Pendiente', 'Pedido pendiente de preparación', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 'En preparación', 'Pedido en preparación', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(3, 'Listo', 'Pedido listo para servir', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(4, 'Servido', 'Pedido servido al cliente', '2024-12-17 19:51:10', '2024-12-17 19:51:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `id` int(11) NOT NULL,
  `comida_id` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `descuento` decimal(5,2) NOT NULL CHECK (`descuento` >= 0 and `descuento` <= 100),
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`id`, `comida_id`, `descripcion`, `descuento`, `fecha_inicio`, `fecha_fin`, `foto_url`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 'Descuento del 10% en ensaladas', 50.00, '2023-01-01 00:00:00', '2023-01-31 23:59:59', NULL, '2024-12-17 19:51:10', '2024-12-19 21:19:19'),
(2, 2, 'Descuento del 15% en sopas', 10.00, '2023-02-01 00:00:00', '2023-02-28 23:59:59', NULL, '2024-12-17 19:51:10', '2024-12-19 21:19:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `mesa_identificador` varchar(100) NOT NULL,
  `estado_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha_pedido` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `mesa_identificador`, `estado_id`, `usuario_id`, `total`, `fecha_pedido`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Mesa 1', 1, 4, 20.97, '2024-12-17 19:51:10', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 'Mesa 2', 2, 4, 15.97, '2024-12-17 19:51:10', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(3, 'Mesa 3', 3, 4, 25.97, '2024-12-17 19:51:10', '2024-12-17 19:51:10', '2024-12-17 19:51:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `descripcion`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Administrador', 'Administrador del sistema', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 'Cocinero', 'Cocinero del restaurante', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(3, 'Mesero', 'Mesero del restaurante', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(4, 'Cliente', 'Cliente del restaurante', '2024-12-17 19:51:10', '2024-12-17 19:51:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sugerencias`
--

CREATE TABLE `sugerencias` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `sugerencia` text NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sugerencias`
--

INSERT INTO `sugerencias` (`id`, `categoria_id`, `sugerencia`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 'Prueba nuestras ensaladas frescas', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 2, 'Disfruta de nuestros platos principales', '2024-12-17 19:51:10', '2024-12-17 19:51:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `password`, `rol_id`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'Juan Perez', 'juan.perez@example.com', '3001234567', 'password123', 1, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 'Maria Lopez', 'maria.lopez@example.com', '3012345678', 'password123', 2, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(3, 'Carlos Sanchez', 'carlos.sanchez@example.com', '3023456789', 'password123', 3, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(4, 'Ana Gomez', 'vosssanz@gmail.com', '3023606047', 'sanzvoss', 4, '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(5, '', NULL, '1234567890', NULL, NULL, '2024-12-17 21:10:26', '2024-12-17 21:20:56'),
(6, '', NULL, '000000', NULL, NULL, '2024-12-18 20:47:56', '2024-12-18 20:47:56'),
(7, '', NULL, '00000', NULL, NULL, '2024-12-19 20:32:31', '2024-12-19 20:32:31'),
(8, '', NULL, '0000000', NULL, NULL, '2024-12-19 22:29:54', '2024-12-19 22:29:54'),
(9, '', NULL, '000', NULL, NULL, '2024-12-19 22:40:43', '2024-12-19 22:40:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

CREATE TABLE `valoraciones` (
  `id` int(11) NOT NULL,
  `comida_id` int(11) DEFAULT NULL,
  `valoracion` int(11) NOT NULL CHECK (`valoracion` >= 1 and `valoracion` <= 5),
  `comentario` text DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valoraciones`
--

INSERT INTO `valoraciones` (`id`, `comida_id`, `valoracion`, `comentario`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 1, 5, 'Deliciosa ensalada', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(2, 2, 4, 'Buena sopa', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(3, 3, 5, 'Excelente tarta', '2024-12-17 19:51:10', '2024-12-17 19:51:10'),
(4, 4, 3, 'Jugo regular', '2024-12-17 19:51:10', '2024-12-17 19:51:10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comida`
--
ALTER TABLE `comida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `comida_id` (`comida_id`);

--
-- Indices de la tabla `estadospedido`
--
ALTER TABLE `estadospedido`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comida_id` (`comida_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estado_id` (`estado_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comida_id` (`comida_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auditoria`
--
ALTER TABLE `auditoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `comida`
--
ALTER TABLE `comida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estadospedido`
--
ALTER TABLE `estadospedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auditoria`
--
ALTER TABLE `auditoria`
  ADD CONSTRAINT `auditoria_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `comida`
--
ALTER TABLE `comida`
  ADD CONSTRAINT `comida_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `detallepedidos`
--
ALTER TABLE `detallepedidos`
  ADD CONSTRAINT `detallepedidos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `detallepedidos_ibfk_2` FOREIGN KEY (`comida_id`) REFERENCES `comida` (`id`);

--
-- Filtros para la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD CONSTRAINT `ofertas_ibfk_1` FOREIGN KEY (`comida_id`) REFERENCES `comida` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`estado_id`) REFERENCES `estadospedido` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  ADD CONSTRAINT `sugerencias_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD CONSTRAINT `valoraciones_ibfk_1` FOREIGN KEY (`comida_id`) REFERENCES `comida` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
