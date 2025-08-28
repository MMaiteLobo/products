// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware para procesar los cuerpos de las peticiones en formato JSON
app.use(bodyParser.json());

// --- Rutas ---

// POST /products: Crear un nuevo producto
app.post('/products', async (req, res) => {
    const { name, description, price, type } = req.body;
    try {
      const { rows } = await db.query(
        'INSERT INTO products (name, description, price, type) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, type]
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// GET /products: Obtener todos los productos

app.get('/products', async (req, res) => {
  try {
  const { rows } = await db.query('SELECT * FROM products');
  res.json(rows);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
  });

// GET /products/:id: Obtener un producto por su ID

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
  });