const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuariosRepo = require('../repositories/usuarios.sqlite.js');
const { z } = require('zod');

const router = express.Router();

//Esquema de validaciones
const authSchema = z.object({
	cedula: z.number().int().positive("La cédula debe ser un número positivo"),
	password: z.string().min(6,"La contraseña debe tener al menos 6 caracteres")
});

//POST Registro
router.post('/registro', async (req, res) => {
	try{
		//1. validar datos
		const validacion = authSchema.safeParse(req.body);
		if(!validacion.success){
			return res.status(400).json({ errores: validacion.error.errors});
		}
		const { cedula, password } = validacion.data;

		//2. Verificar si la cedula exite
		const usuarioExistente = usuariosRepo.obtenerPorCedula(cedula);
		if(usuarioExistente){
			return res.status(400).json({ error: 'La cédula ya está registrada'});
		}

		//3. hashear la contraseña
		const passwordString = String(password);
		const saltRound = 10;
		const passwordHash = await bcrypt.hash(passwordString, saltRound);

		//4. guardar en la db
		const fechaCreacion = new Date().toISOString();
		const nuevoUsuario = usuariosRepo.crear(cedula, passwordHash, fechaCreacion);

		res.status(201).json({
			mensaje: 'Usuaro registrado con exito',
			usuario: 'nuevoUsuario'
		});
	}catch(error){
		console.error('❌ ERROR EN REGISTRO:', error); 
		res.status(500).json({ error : 'Error en el Servidor'});
	}
});

router.post('/login', async (req, res) => {
	try{
		//1. validar datos
		const validacion = authSchema.safeParse(req.body);
		if(!validacion.success){
			return res.status(400).json({ errores: validacion.error.errors});
		}
		const { cedula, password } = validacion.data;
		//2. Buscar usuario
		const usuario = usuariosRepo.obtenerPorCedula(cedula);
		if(!usuario){
			return res.status(401).json({ error: 'Credencial invalida'});
		}
		//3. comparar constraseñas
		const passwordValida = await bcrypt.compare(String(password),usuario.password);
		if(!passwordValida){
			return res.status(401).json({ error: 'Credencial invalida'});
		}
		//4. generar token jwt
		const token = jwt.sign(
			{ id: usuario.id, cedula: usuario.cedula },
			process.env.JWT_SECRET || 'clave_secreta_por_defecto',
			{ expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
		);

		res.json({
			mensaje: 'Login exitoso',
			token
		});
	}catch(error){
		console.error('❌ ERROR EN REGISTRO:', error); 
		res.status(500).json({ error : 'Error en el Servidor'});
	}
});
module.exports = router;
