const Clientes = require('../models/Clientes');

//Agrega un nuevo cliente
exports.nuevoCliente = async function (req, res, next) {
    const cliente = new Clientes(req.body);
    try {
        //Intentar almacenar el registro de cliente
        await cliente.save();
        res.json({mensaje: "Se agrego un nuevo cliente"});

    } catch (error) {
        //Cortar si hay un error con next
        console.error(error);
        res.send(error);
        next();
        
    }
}

//Mostrar  los clientes alamcenados
exports.listarClientes = async (req, res, next) => {
    try {
        //Intenta mostrar los clientes almacenados
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        res.send(error);
        next();
    }
}

//Mostrar  un cliente por su id
exports.listarCliente = async (req, res, next) => {
    try {
        //Intenta mostrar los clientes almacenados
        const cliente = await Clientes.findById(rep.params.idCliente);
        if (!cliente) {
            res.json({mensaje: "No se encontro el cliente"});
            next();
        }
        //Si lo encuentra
        res.json(cliente);
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        res.send(error);
        next();
    }
}

//Actualizar el cliente por su id
exports.actualizarCliente = async (req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, req.body,{next: true});
        res.json(cliente);
        
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        res.send(error);
        next();
        
    }
}

//Eliminar cliente por su id
exports.eliminarCliente = async(req, res, next) => {
    try {
        await Clientes.findByIdAndDelete({_id:req.params.idCliente});
        res.json({mensaje: "Cliente eliminado"})
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        res.send(error);
        next();
        
    }
}