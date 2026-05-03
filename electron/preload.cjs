const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mustangApi', {
  getAssets: () => ipcRenderer.invoke('assets:getAll'),
  addAsset: (asset) => ipcRenderer.invoke('assets:add', asset),
  updateAsset: (asset) => ipcRenderer.invoke('assets:update', asset),
  deleteAsset: (assetId) => ipcRenderer.invoke('assets:delete', assetId),

  getMaintenance: () => ipcRenderer.invoke('maintenance:getAll'),
  addMaintenance: (record) => ipcRenderer.invoke('maintenance:add', record),
  deleteMaintenance: (maintenanceId) =>
    ipcRenderer.invoke('maintenance:delete', maintenanceId),

  getMaintenanceStatuses: () =>
    ipcRenderer.invoke('maintenanceStatuses:getAll'),
});
