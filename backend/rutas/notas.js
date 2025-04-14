const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const esquema = mongoose.Schema;

// Definir el esquema de las notas
const esquemanota = new esquema({
    nombre: String,
    email: String,
    telefono: String,
    descripcion: String,
    idNotas: String
});

// Crear el modelo de MongoDB
const ModeloNotas = mongoose.model('notas', esquemanota);

// Ruta para agregar una nueva nota
router.post('/agregarnota', async (req, res) => {
    try {
        const nuevanota = new ModeloNotas({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            descripcion: req.body.descripcion,
            idNotas: req.body.idNotas
        });

        // Guardar la nueva nota en la base de datos
        const notaGuardada = await nuevanota.save();
        res.status(200).send('Nota agregada correctamente');
    } catch (err) {
        console.error('❌ Error al guardar la nota:', err);
        res.status(500).send('Error al agregar la nota');
    }
});

//Obtener notas
router.get('/obtenernotas', async (req, res) => {
    try {
        // Usando async/await con find() sin callback
        const notas = await ModeloNotas.find({});
        res.status(200).send(notas);
    } catch (err) {
        console.error('❌ Error al obtener las notas:', err);
        res.status(500).send('Error al obtener las notas');
    }
});


router.post('/obtenerdatanota', async (req, res) => {
    try {
        // Usando async/await con find() sin callback
        const notas = await ModeloNotas.find({idNotas: req.body.idNotas});
        res.status(200).send(notas);
    } catch (err) {
        console.error('❌ Error al obtener las notas:', err);
        res.status(500).send('Error al obtener las notas');
    }
});



router.post('/editarnota', async (req, res) => {
    try {
        const { idNotas, nombre, email, telefono, descripcion } = req.body;

        // Buscar y actualizar la nota
        const notaActualizada = await ModeloNotas.findOneAndUpdate(
            { idNotas }, // Buscar por idNotas
            { nombre, email, telefono, descripcion }, // Campos a actualizar
            { new: true } // Devuelve el documento actualizado
        );

        if (!notaActualizada) {
            return res.status(404).send('Nota no encontrada');
        }

        // Responder con la nota actualizada
        res.status(200).send(notaActualizada);
    } catch (err) {
        console.error('❌ Error al actualizar la nota:', err);
        res.status(500).send('Error al actualizar la nota');
    }
});


router.delete('/eliminarnota', async (req, res) => {
    try {
        const { idNotas } = req.body; // Obtener el id de la nota
        const notaEliminada = await ModeloNotas.findOneAndDelete({ idNotas });
        if (!notaEliminada) {
            return res.status(404).send('Nota no encontrada');
        }
        res.status(200).send('Nota eliminada con éxito');
    } catch (err) {
        console.error('❌ Error al eliminar la nota:', err);
        res.status(500).send('Error al eliminar la nota');
    }
});

module.exports = router;
