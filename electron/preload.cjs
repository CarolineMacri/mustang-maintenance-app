const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mustangApi', {
  getAssets: () => ipcRenderer.invoke('assets:getAll'),
  getMaintenanceStatuses: () =>
    ipcRenderer.invoke('maintenanceStatuses:getAll'),
  getMaintenance: () => ipcRenderer.invoke('maintenance:getAll'),
});
