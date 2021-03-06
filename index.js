require('dotenv').config();
const express = require('express');
const path = require('path');
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

// Directorio Publico
app.use(express.static('public'));

// Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));


// Lo ultimo
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {

    console.log('servidor corriendo ' + process.env.PORT);
});