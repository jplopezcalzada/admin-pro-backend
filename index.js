require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('./database/config');

// Crear Servidor express
const app = express();

// Configuracion CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnetion();

// Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {

    console.log('servidor corriendo ' + process.env.PORT);
});