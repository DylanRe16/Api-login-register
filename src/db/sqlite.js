const { DatabaseSync } = require('node:sqlite');

// Si DB_FILE no está definido, usa 'mi_api.db' por defecto
const dbPath = process.env.DB_FILE || 'mi_api.db';

const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cedula INTEGER UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fecha_creacion TEXT NOT NULL,
    benabled INTEGER DEFAULT 1
  )
`);

module.exports = db;