const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
const usuarioRoutes = require('./routes/usuarios.routes');
app.use('/usuarios', usuarioRoutes);

//Middleware de errores global
app.use((err, req, res, next) =>{
	console.error('❌ ERROR:', err.message); // <-- Añade esto para ver el error
	console.error(err.stack);
	res.status(500).json({ error: 'Algo salió mal' });
});

module.exports = app;