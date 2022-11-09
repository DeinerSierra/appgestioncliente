const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        //Intentar almacenar el registro de producto
        await pedido.save();
        res.json({mensaje: "Se agrego un nuevo pedido"});

    } catch (error) {
        //Cortar si hay un error con next
        console.error(error);
        next();
        
    }
}
exports.listarPedidos = async (req, res, next) => {
    try {
        //Intenta mostrar los pedido almacenados
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
    }
}
exports.listarPedido = async (req, res, next) => {
    try {
        
        //Intenta mostrar los prudctos almacenados
        const pedido = await Pedidos.findById(rep.params.idPedido).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        if (!pedido) {
            res.json({mensaje: "No se encontro el pedido"});
            next();
        }
        //Si lo encuentra
        res.json(pedido);
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
    }
}
exports.actualizarPedido = async (req, res, next) => {
    try {

        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body,{new: true}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedido);
        
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
        
    }
}
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findByIdAndDelete({_id:req.params.idPedido});
        res.json({mensaje: "Pedido eliminado"})
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
        
    }
}