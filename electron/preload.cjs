const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mustangApi', {
  getAssets: () => ipcRenderer.invoke('assets:getAll'),
  addAsset: (asset) => ipcRenderer.invoke('assets:add', asset),
  deleteAsset: (assetId) => ipcRenderer.invoke('assets:delete', assetId),

  getMaintenanceStatuses: () =>
    ipcRenderer.invoke('maintenanceStatuses:getAll'),
  getMaintenance: () => ipcRenderer.invoke('maintenance:getAll'),
});
