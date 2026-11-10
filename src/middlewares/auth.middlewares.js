const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
	//el token suele venir en la cabecera "Authorization: Bearer <token>"
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // extrae solo el token

	if(!token){
    	return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
	}
	try{
		const verificado = jwt.verify(token, process.env.JWT_SECRET);
		req.usuario = verificado; // Guardamos los datos del usuario en la request
		next(); // Pasa al siguiente controlador
	}catch(error){
		    res.status(403).json({ error: 'Token inválido o expirado' });
	}
};