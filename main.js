const { app, screen, BrowserWindow, systemPreferences, ipcMain, remote } = require('electron')

let win = null;

function createWindow () {
  const microphoneStatus = systemPreferences.getMediaAccessStatus('microphone');
  const cameraStatus = systemPreferences.getMediaAccessStatus('camera');
  const isTrustedAccessibilityClient = systemPreferences.isTrustedAccessibilityClient(false);

  const { x, y } = screen.getCursorScreenPoint();
  const screenBounds = screen.getDisplayNearestPoint({ x, y }).bounds;
  win = new BrowserWindow({
    width: 374,
    minWidth: 374,
    maxWidth: 375,
    height: screenBounds.height,
    x: screenBounds.x,
    y: screenBounds.y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
    },
    backgroundColor: '#131415',
    frame: false,
    show: false,
    fullscreenable: false,
    acceptFirstMouse: true,
  })


  win.loadFile('index.html')

  win.webContents.once('did-finish-load', () => {
    win.show();
  });

  win.webContents.openDevTools();
}

app.commandLine.appendSwitch('disable-features', 'IOSurfaceCapturer');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle('perform-action', (event) => {
    console.log('fix window');
    win.setAlwaysOnTop(true);
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });  
})

