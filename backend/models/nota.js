const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notaSchema = new Schema({
  nombre: String,
  email: String,
  telefono: String,
  descripcion: String,
  idNotas: String
});

const ModeloNota = mongoose.model('nota', notaSchema);
module.exports = ModeloNota;
