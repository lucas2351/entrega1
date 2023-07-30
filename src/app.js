// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

// Configuración de bodyParser para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());

// Rutas de productos
app.use(productsRoutes);

// Manejador de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Manejador de errores para errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
