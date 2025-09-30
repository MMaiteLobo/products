// server.js
const express = require('express');
const router = require('./src/routers/router');

require('dotenv').config();

const { connectDB } = require('./db/db');

const app = express();
const port = process.env.HTTP_PORT;

// Middleware para procesar los cuerpos de las peticiones en formato JSON
app.use(express.json());

// --- Rutas ---
app.use('/api/v1', router);


// Iniciar el servidor
app.listen(port, async () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
    await connectDB();
  });