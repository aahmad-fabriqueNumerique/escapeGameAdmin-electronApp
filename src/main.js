const { app, BrowserWindow, Menu } = require("electron")
const path = require("path")
const init = require("./api/init")

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
    },
  })
  win.loadFile("public/connect.html")

  const template = [
    {
      label: "Electron",
    },
    {
      label: "Menu",
      submenu: [
        {
          label: "Accueil",
          click: async () => {
            await win.loadURL(
              `file://${path.join(__dirname, "../public/home.html")}`
            )
          },
        },
        {
          label: "Parties",
          click: async () => {
            await win.loadURL(
              `file://${path.join(__dirname, "../public/game.html")}`
            )
          },
        },
        {
          label: "Equipes",
          click: async () => {
            await win.loadURL(
              `file://${path.join(__dirname, "../public/team.html")}`
            )
          },
        },
        {
          label: "Gestion de parties",
          click: async () => {
            await win.loadURL(
              `file://${path.join(__dirname, "../public/gestionGame.html")}`
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

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

init()
