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

ipcMain.handle('assets:update', (event, asset) => {
  const db = getDatabase();

  const updateAssetSql = /* sql */ `
  UPDATE assets
  SET
    name = @name,
    make = @make,
    model = @model,
    year = @year,
    vinSerialNo = @vinSerialNo,
    part1 = @part1,
    part2 = @part2,
    part3 = @part3,
    notes = @notes
  WHERE id = @id
`;

  const result = db.prepare(updateAssetSql).run({
    id: asset.id,
    name: asset.name,
    make: asset.make ?? '',
    model: asset.model ?? '',
    year: asset.year ?? null,
    vinSerialNo: asset.vinSerialNo ?? '',
    part1: asset.part1 ?? '',
    part2: asset.part2 ?? '',
    part3: asset.part3 ?? '',
    notes: asset.notes ?? '',
  });

  return db.prepare(/*sql*/ `SELECT * FROM assets WHERE id= ? `).get(asset.id);
});

ipcMain.handle('assets:add', (event, asset) => {
  const db = getDatabase();

  const result = db
    .prepare(
      /* sql */ ` INSERT INTO assets (name, make, model, year, vinSerialNo, part1, part2, part3, notes)
      VALUES(@name, @make, @model, @year, @vinSerialNo, @part1, @part2, @part3, @notes )`,
    )
    .run({
      name: asset.name,
      make: asset.make ?? '',
      model: asset.model ?? '',
      year: asset.year ?? null,
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

ipcMain.handle('maintenance:add', (event, record) => {
  const db = getDatabase();

  const result = db
    .prepare(
      /* sql */ `
    INSERT INTO maintenance (
      assetId,
      statusId,
      date,
      difficulty,
      description,
      notes
    )
    VALUES (
        @assetId,
        @statusId,
        @date,
        @difficulty,
        @description,
        @notes
      )
      `,
    )
    .run({
      assetId: record.assetId,
      statusId: record.statusId ?? null,
      date: record.date ?? '',
      difficulty: record.difficulty ?? '',
      description: record.description ?? '',
      notes: record.notes ?? '',
    });

  return db
    .prepare(/*sql*/ `SELECT * FROM maintenance WHERE id=?`)
    .get(result.lastInsertRowid);
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
