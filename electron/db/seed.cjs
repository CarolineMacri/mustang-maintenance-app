const fs = require('node:fs');
const path = require('node:path');

function seedDatabase(db) {
  const existing = db.prepare('SELECT COUNT(*) AS count FROM assets').get();

  if (existing.count > 0) return;

  const dbJsonPath = path.join('./db.json');

  const data = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));

  const insertAsset = db.prepare(`
        INSERT INTO assets (name, make, model, year, vinSerialNo, part1, part2, part3, notes)
        VALUES 
           ( @name, @make, @model, @year, @vinSerialNo, @part1, @part2, @part3, @notes)
        `);

  const insertStatus = db.prepare(`
        INSERT INTO maintenance_statuses (name)
        VALUES (@name)
        `);

  const insertMaintenance = db.prepare(`
        INSERT INTO maintenance 
            (assetId, statusId, date, difficulty, description, notes)
        VALUES (@assetId, @statusId, @date, @difficulty, @description, @notes)    
        `);

  const seed = db.transaction(() => {
    const assetIdMap = new Map();
    const statusIdMap = new Map();

    for (const asset of data.assets) {
      const result = insertAsset.run({
        name: asset.name ?? '',
        make: asset.make ?? null,
        model: asset.model ?? null,
        year: asset.year ?? null,
        vinSerialNo: asset.vinSerialNo ?? null,
        part1: asset.part1 ?? null,
        part2: asset.part2 ?? null,
        part3: asset.part3 ?? null,
        notes: asset.notes ?? null,
      });

      assetIdMap.set(String(asset.id), result.lastInsertRowid);
    }

    for (const status of data.maintenanceStatuses) {
      const result = insertStatus.run({
        name: status.name ?? '',
      });
      statusIdMap.set(String(status.id), result.lastInsertRowid);
    }

    for (const record of data.maintenance) {
      const result = insertMaintenance.run({
        assetId: assetIdMap.get(String(record.assetId)),
        statusId: statusIdMap.get(String(record.statusId)) ?? null,
        date: record.date ?? null,
        difficulty:
          record.difficulty === '' || record.difficulty === null
            ? null
            : Number(record.difficulty),
        description: record.description ?? '',
        notes: record.notes ?? null,
      });
    }
  });

  seed();
}

module.exports = { seedDatabase };
