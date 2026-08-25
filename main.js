const { app, BrowserWindow, Tray, Menu, screen, nativeImage } = require('electron');
const path = require('path');

let win = null;
let tray = null;
let cursorTimer = null;

const TRAY_ICON_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAuklEQVR4nO1XwRaAIAjTvovP57/s2iuRjSw8yK1iOjaDZyk7kqNGgSLSrs+qGlrrmLG59e4zAjPDlM2S2KvUyrMs6irwVmIGn27Bg8CoUhFpo9OuqtXDuwT+jhCBngrRPtAFWTKimzD4dAvoPmB9v+egfYD2DekHzHmgLECbEdO0YALssEHzIQLRSYfg0v8Cl0C0ehS/vgKbQDqB6JRD8esrUEpcBQQHK8CSQPMpC9BFGbLTrmbsxsvECX3eZmU6VnPLAAAAAElFTkSuQmCC';

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { x, y, width, height } = display.bounds;

  win = new BrowserWindow({
    x, y, width, height,
    transparent: true,
    frame: false,
    resizable: false,
    movable: false,
    hasShadow: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // The whole point: every click, drag, and scroll passes straight through.
  win.setIgnoreMouseEvents(true, { forward: false });
  win.setAlwaysOnTop(true, 'screen-saver');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  win.loadFile('pet.html');

  // Poll global cursor position (~60fps) and hand it to the renderer.
  cursorTimer = setInterval(() => {
    if (!win || win.isDestroyed()) return;
    const p = screen.getCursorScreenPoint();
    const b = win.getBounds();
    win.webContents.send('cursor', { x: p.x - b.x, y: p.y - b.y });
  }, 16);
}

function setPet(emoji) {
  if (win && !win.isDestroyed()) win.webContents.send('set-pet', emoji);
}

function createTray() {
  const icon = nativeImage.createFromBuffer(Buffer.from(TRAY_ICON_B64, 'base64'));
  tray = new Tray(icon);
  tray.setToolTip('Desktop Pet');
  const menu = Menu.buildFromTemplate([
    { label: '🐶 Dog', type: 'radio', checked: true, click: () => setPet('🐶') },
    { label: '🐱 Cat', type: 'radio', click: () => setPet('🐱') },
    { label: '🦊 Fox', type: 'radio', click: () => setPet('🦊') },
    { label: '🐰 Rabbit', type: 'radio', click: () => setPet('🐰') },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ]);
  tray.setContextMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  clearInterval(cursorTimer);
  app.quit();
});
