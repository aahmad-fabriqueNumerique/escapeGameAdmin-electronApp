const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    win.loadFile('public/index.html')

    const template = [
        {
          label: "Menu",
        },
        {
            label: "Menu",
            submenu: [
              {
                label: "Page 01",
                click: async () => {
                  await win.loadURL(
                    `file://${path.join(__dirname, "../public/page01.html")}`
                  )
                },
              },
              {
                label: "Index",
                click: async () => {
                  await win.loadURL(
                    `file://${path.join(__dirname, "../public/index.html")}`
                  )
                },
              },
            ],
          },
      ]
      const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    win.webContents.openDevTools()
}




app.whenReady().then(() => {
    createWindow()
    

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
