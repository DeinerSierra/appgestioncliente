const Productos = require('../models/Productos');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null,__dirname+'../../uploads');
        },
        filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1];
        cb(null,`${shortid.generate()}.${extension}`);
      }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        }else {
            cb(new Error('Invalid format'))
        }
    },

}
//Pasar la configuracion  y el campo
const upload = multer(configuracionMulter).single('imagen');
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error,){
        if (error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        //Intentar almacenar el registro de producto
        await producto.save();
        res.json({mensaje: "Se agrego un nuevo producto"});

    } catch (error) {
        //Cortar si hay un error con next
        console.error(error);
        next();
        
    }
}
exports.listarProductos = async (req, res, next) => {
    try {
        //Intenta mostrar los productos almacenados
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
    }
}
exports.listarProducto = async (req, res, next) => {
    try {
        //Intenta mostrar los prudctos almacenados
        const producto = await Productos.findById(rep.params.idPoducto);
        if (!producto) {
            res.json({mensaje: "No se encontro el producto"});
            next();
        }
        //Si lo encuentra
        res.json(producto);
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
    }
}
exports.actualizarProducto = async (req, res, next) => {
    try {
        
        //Contruir un nuevo producto.
        let nuevoProducto = req.body;
        //Verifcar si hay nueva imagen.
        if(req.file){
            nuevoProducto = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto,{new: true});
        res.json(producto);
        
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
        
    }
}
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({_id:req.params.idProducto});
        res.json({mensaje: "Producto eliminado"})
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
        
    }
}
exports.buscarProducto = async (req, res, next) => {
    try {
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(producto);
        
    } catch (error) {
        //En caso de error mostrar el error y next
        console.log(error);
        next();
        
    }
}