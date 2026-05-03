const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mustangApi', {
  getAssets: () => ipcRenderer.invoke('assets:getAll'),
  addAsset: (asset) => ipcRenderer.invoke('assets:add', asset),
  updateAsset: (asset) => ipcRenderer.invoke('assets:update', asset),
  deleteAsset: (assetId) => ipcRenderer.invoke('assets:delete', assetId),

  getMaintenance: () => ipcRenderer.invoke('maintenance:getAll'),
  addMaintenance: (record) => ipcRenderer.invoke('maintenance:add', record),
  updateMaintenance: (record) =>
    ipcRenderer.invoke('maintenance:update', record),
  deleteMaintenance: (recordId) =>
    ipcRenderer.invoke('maintenance:delete', recordId),

  getMaintenanceStatuses: () =>
    ipcRenderer.invoke('maintenanceStatuses:getAll'),
  addMaintenanceStatus: (statusName) =>
    ipcRenderer.invoke('maintenanceStatuses:add', statusName),
});
