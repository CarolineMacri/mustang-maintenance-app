const path = require('node:path');
const { app } = require('electron');
const Database = require('better-sqlite3');

const { createSchema } = require('./schema.cjs');
const { seedDatabase } = require('./seed.cjs');


let db;

function getDatabase() {
  if (db) return db;

  const dbPath = path.join(
    app.getPath('userData'),
    'mustang-maintenance.sqlite',
  );

  db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  createSchema(db);
  seedDatabase(db);

  return db;
}

module.exports = { getDatabase };
