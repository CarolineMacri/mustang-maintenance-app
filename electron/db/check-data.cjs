process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

const { app } = require('electron');
const { getDatabase } = require('./database.cjs');

app.whenReady().then(() => {
  const db = getDatabase();

  const orphanMaintenanceAssets = db
    .prepare(
      `
    SELECT maintenance.*
    FROM maintenance
    LEFT JOIN assets ON assets.id = maintenance.assetId
    WHERE  assets.id IS NULL
    `,
    )
    .all();

  const orphanMaintenanceStatuses = db
    .prepare(
      `
    SELECT maintenance.*
    FROM maintenance
    LEFT JOIN maintenance_statuses ON maintenance_statuses.id = maintenance.statusId
    WHERE  maintenance_statuses.id IS NULL
    `,
    )
    .all();

  console.log('Maintenance records with missing Assets:');
  console.table(orphanMaintenanceAssets);
  console.log('Maintenance records with missing status:');
  console.table(orphanMaintenanceStatuses);

  app.quit();
});
