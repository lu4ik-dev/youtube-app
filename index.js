const { app, BrowserWindow, screen  } = require('electron')

import { autoUpdater } from 'electron-github-autoupdater'

const updater =  autoUpdater({
    owner: "lu4ik-dev",
    repo: "youtube-app",
    accessToken: string,
    allowPrerelease: true //optional, default: false
})


if (require('electron-squirrel-startup')) electron.app.quit()


function createWindow () {
  // Create the browser window.
  const primaryDisplay = screen.getPrimaryDisplay()
  const win = new BrowserWindow({
    width: primaryDisplay.workAreaSize.width,
    height: primaryDisplay.workAreaSize.height,
    webPreferences: {
      nodeIntegration: true
    }
    
  })

  //load the index.html from a url
  win.loadURL('https://youtube.com');

  // Open the DevTools.
  // win.webContents.openDevTools()
  win.on('closed', () => {
    mainWindow = null
  })

win.webContents.on('did-finish-load', () => {
    autoUpdater.init(mainWindow)
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})