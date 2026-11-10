const db = require('../db/sqlite');

module.exports = {
	obtenerPorCedula: (cedula) => {
		//const page = parseInt(req.query.page) || 1;
   		//const limit = parseInt(req.query.limit) || 10;
    	//const offset = (page - 1)* limit;

    	return db.prepare('SELECT * FROM usuarios WHERE cedula = ? AND benabled = ?').get(cedula, 1);
	},
  crear: (cedula, passwordHash, fechaCreacion) => {
    const stmt = db.prepare('INSERT INTO usuarios (cedula, password, fecha_creacion) VALUES (?, ?, ?)');
    const result = stmt.run(cedula, passwordHash, fechaCreacion);
    return { id: result.lastInsertRowid, cedula, passwordHash, fechaCreacion };
  }	
};