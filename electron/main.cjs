const { app, BrowserWindow } = require('electron');
const path = require('path');

const { getDatabase } = require('./db/database.cjs');

function createWindow() {
  getDatabase();
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);
