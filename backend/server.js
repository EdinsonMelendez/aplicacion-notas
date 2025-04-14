const express = require('express');
const app = express();

// Conexión a la base de datos
const archivodb = require('./conexion');

// Middlewares
const cors = require('cors');
app.use(cors()); // Permite todas las solicitudes mientras desarrollas


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
const rutanota = require('./rutas/notas');
app.use('/api/nota', rutanota);

// Ruta base
app.get('/', (req, res) => {
    res.send('Bienvenido a nuestro server');
});

// Iniciar el servidor
app.listen(5000, function () {
    console.log('El servidor está corriendo perfectamente en el puerto 5000');
});
