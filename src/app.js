const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const verificarToken = require('./middlewares/auth.middlewares.js');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes); 

// Ejemplo de ruta protegida (accesible con Token)
app.get('/api/perfil', verificarToken, (req, res) => {
	res.json({
		mensaje: 'Bienvenido a tu perfil',
		datos: req.usuario
	});
});

//Middleware de errores global
app.use((err, req, res, next) =>{
	console.error('❌ ERROR:', err.message); // <-- Añade esto para ver el error
	console.error(err.stack);
	res.status(500).json({ error: 'Algo salió mal' });
});

module.exports = app;