// const { create } = require('json-server');

function createSchema(db) {
  db.exec(`
        CREATE TABLE IF NOT EXISTS assets(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            make TEXT,
            model TEXT,
            year INTEGER,
            vinSerialNo TEXT,
            part1 TEXT,
            part2 TEXT,
            part3 TEXT,
            notes TEXT
        );

        CREATE TABLE IF NOT EXISTS maintenance_statuses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE        
        );

        CREATE TABLE IF NOT EXISTS maintenance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            assetId INTEGER NOT NULL,
            statusId INTEGER,
            date TEXT,
            difficulty INTEGER,
            description TEXT,
            notes TEXT,
            FOREIGN KEY (assetId) REFERENCES assets(id) ON DELETE RESTRICT,
            FOREIGN KEY (statusId) REFERENCES maintenance_statuses ON DELETE SET NULL
        );
        
        
        `);
}

module.exports = { createSchema };
