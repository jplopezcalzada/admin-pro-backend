require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('./database/config');

// Crear Servidor express
const app = express();

// Configuracion CORS
app.use(cors());
// Base de datos
dbConnetion();
// Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () => {

    console.log('servidor corriendo ' + process.env.PORT);
});