const express = require('express');
const router = express.Router();
const usuarioRepo = require('../repositories/usuarios.sqlite.js');
const { z } = require('zod');

//validacion del POST
const usuarioSchema = z.object({
    nombre: z.string().min(2),
    email: z.string().email()
});

//GET con paginacion
router.get('/', (req, res) =>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1)* limit;

    const usuarios = usuarioRepo.obtenerTodos(limit, offset);
    res.json({ page, limit, data: usuarios });
});

//POST insert con validacion
router.post('/', (req, res) =>{
	const resultado = usuarioSchema.safeParse(req.body);
	if(!resultado.success){
		return res.status(400).json({ errores: resultado.error.errors});
	}

	const { nombre, email } = resultado.data;
	const nuevoUsuario = usuarioRepo.crear(nombre, email);
	return status(201).json(nuevoUsuario);
});

module.exports = router;
