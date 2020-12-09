const { app, screen, BrowserWindow } = require('electron')

function createWindow () {
  const { x, y } = screen.getCursorScreenPoint();
  const screenBounds = screen.getDisplayNearestPoint({ x, y }).bounds;
  const win = new BrowserWindow({
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
  win.setAlwaysOnTop(true);
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

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

