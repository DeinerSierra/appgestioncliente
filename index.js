const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path:'variables.env'})

//Cors permite que un cliente se conecte a otro servidor para intercambio de recursos
const cors = require('cors');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,{ useNewUrlParser:true});
//Crear el servidor.
const app = express();

//Habilitar el bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Definir un domininio para recibir peticiones.
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {   
    origin:(origin, callback) => {
        //Revisar si la peticiones viene de un servidor en la lista.
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else {
            callback(new Error('Invalid request'));
        }
    }
};

//Habilitar cors.
app.use(cors(corsOptions));
//Rutas de la application
app.use('/', routes());

//Carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//Puerto donde va a correr.
app.listen(port, host, ()=>{

});