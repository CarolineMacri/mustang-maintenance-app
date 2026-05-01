const db = require('./database.cjs');

const orphanMaintenanceAssets = db
  .prepare(
    `
    SELECT maintenance.*
    FROM maintence
    LEFT JOIN assets ON assets.id = maintenance.assetId
    WHERE  assets.id IS NULL
    `,
  )
  .all();

const orphanMaintenanceStatuses = db
  .prepare(
    `
    SELECT maintenance.*
    FROM maintence
    LEFT JOIN maintenanceStatuses ON maintenanceStatuses.id = maintenance.statusId"
    WHERE  maintenanceStatuses.id IS NULL
    `,
  )
  .all();

console.log('Maintenance records with missing Assets:');
console.table(orphanMaintenanceAssets);
console.log('Maintenance records with missing status:');
console.table(orphanMaintenanceStatuses);
