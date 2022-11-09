const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    nombre:{
        type: 'string',
        trim: true
    },
    precio:{
        type: Number
    },
    imagen: {
        type: 'string'
    }

});
module.exports = mongoose.model('Productos', productosSchema);
//Sube un archivo de imagen de
