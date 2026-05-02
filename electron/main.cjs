const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');

const { getDatabase } = require('./db/database.cjs');

ipcMain.handle('assets:getAll', () => {
  const db = getDatabase();

  return db
    .prepare(
      `
    SELECT *
    FROM assets
    ORDER BY make, model
    `,
    )
    .all();
});

ipcMain.handle('assets:add', (event, asset) => {
  const db = getDatabase();

  const result = db
    .prepare(
      ` INSERT INTO assets (name, make, model, vinSerialNo, part1, part2, part3, notes)
      VALUES(@name, @make, @model, @vinSerialNo, @part1, @part2, @part3, @notes )`,
    )
    .run({
      name: asset.name,
      make: asset.make ?? '',
      model: asset.model ?? '',
      vinSerialNo: asset.vinSerialNo ?? '',
      part1: asset.part1 ?? '',
      part2: asset.part2 ?? '',
      part3: asset.part3 ?? '',
      notes: asset.notes ?? '',
    });

  return db
    .prepare(`SELECT * FROM assets WHERE id=?`)
    .get(result.lastInsertRowid);
});

ipcMain.handle('assets:delete', (event, assetId) => {
  const db = getDatabase();
  const result = db.prepare(`DELETE FROM assets WHERE id=?`).run(assetId);

  return {
    success: result.changes > 0,
  };
});

ipcMain.handle('maintenanceStatuses:getAll', () => {
  const db = getDatabase();

  return db
    .prepare(
      `
    SELECT *
    FROM maintenance_statuses
    ORDER BY name
    `,
    )
    .all();
});

ipcMain.handle('maintenance:getAll', () => {
  const db = getDatabase();

  return db
    .prepare(
      `
    SELECT *
    FROM maintenance
    ORDER BY date DESC
    `,
    )
    .all();
});

function createWindow() {
  getDatabase();
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);
