// const { ipcRenderer } = require
const ipcRenderer = window.Electron.ipcRenderer

console.log("machin")
// ipcRenderer.send("post-log", { message: "salut" })

console.log(ipcRenderer.sendSync("fetch-logs"))
