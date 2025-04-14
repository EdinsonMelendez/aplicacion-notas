const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/dbnotas');

const objetodb = mongoose.connection

objetodb.on('connected', ()=>{console.log('Conexion correcta a db')})
objetodb.on('error', ()=>{console.log('Error en la conexion a la db')})

module.exports = mongoose