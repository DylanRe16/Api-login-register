const db = require('../db/sqlite');

module.exports = {
	obtenerTodos: (limit, offset) => {
		//const page = parseInt(req.query.page) || 1;
   		//const limit = parseInt(req.query.limit) || 10;
    	//const offset = (page - 1)* limit;
    	return db.prepare('SELECT * FROM usuarios LIMIT ? OFFSET ?').all(limit, offset);
	},
  crear: (nombre, email) => {
    const stmt = db.prepare('INSERT INTO usuarios (nombre, email) VALUES (?, ?)');
    const result = stmt.run(nombre, email);
    return { id: result.lastInsertRowid, nombre, email };
  }	
};