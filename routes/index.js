const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productoController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

//Middleware para proteger las rutas.
const auth = require('../middleware/auth');

module.exports = function(){
    //Agregar nuevos clientes via post
    router.post('/clientes',auth ,clienteController.nuevoCliente);

    //Obtner los clientes almacenados.
    router.get('/clientes',auth ,clienteController.listarClientes);

    //Mostrar un cliente en especifico por su id
    router.get('/clientes/:idCliente',auth , clienteController.listarCliente);

    //Actualizar el cliente
    router.put('/clientes/:idCliente',auth ,clienteController.actualizarCliente);

    //Eliminar cliente
    router.delete('/clientes/:idCliente',auth ,clienteController.eliminarCliente);

    /**Productos**/
    router.post('/productos',auth ,productosController.subirArchivo, productosController.nuevoProducto);
    router.get('/productos',auth ,productosController.listarProductos);
    router.get('/productos/:idProducto',auth, productosController.listarProducto);
    router.put('/productos/:idProducto',auth,productosController.subirArchivo, productosController.actualizarProducto);
    router.delete('/productos/:idProducto',auth, productosController.eliminarProducto);
    router.post('/productos/busqueda/:query',auth, productosController.buscarProducto);

    /*Pedidos */
    router.post('/pedidos/nuevo/:idUsuario',auth, pedidosController.nuevoPedido);
    router.get('/pedidos',auth, pedidosController.listarPedidos);
    router.get('/pedidos/:idPedido',auth, pedidosController.listarPedido);
    router.put('/pedidos/:idPedido',auth, pedidosController.actualizarPedido);
    router.delete('/pedidos/:idPedido',auth, pedidosController.eliminarPedido);

    /* Usuarios */
    router.post('/crear-cuenta',auth, usuariosController.registrarUsuario);
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}