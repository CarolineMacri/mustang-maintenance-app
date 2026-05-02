const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mustangApi', {
  getAssets: () => ipcRenderer.invoke('assets:getAll'),
  addAsset: (asset) => ipcRenderer.invoke('assets:add', asset),
  getMaintenanceStatuses: () =>
    ipcRenderer.invoke('maintenanceStatuses:getAll'),
  getMaintenance: () => ipcRenderer.invoke('maintenance:getAll'),
});
