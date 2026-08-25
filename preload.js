const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('petAPI', {
  onCursor: (cb) => ipcRenderer.on('cursor', (_e, pos) => cb(pos)),
  onSetPet: (cb) => ipcRenderer.on('set-pet', (_e, emoji) => cb(emoji)),
});
