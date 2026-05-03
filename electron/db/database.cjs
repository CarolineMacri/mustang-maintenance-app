const path = require('node:path');
const { app } = require('electron');
const Database = require('better-sqlite3');

const { createSchema } = require('./schema.cjs');

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

  return db;
}

module.exports = { getDatabase };
