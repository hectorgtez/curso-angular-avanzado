const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Crear servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Conectar base de datos
dbConnection();

// Rutas
app.get('/', ( req, res ) => {
  res.json({
    ok: true,
    msg: 'Hola, mundo!'
  })
});

// Iniciar servidor
app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
});