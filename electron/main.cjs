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
