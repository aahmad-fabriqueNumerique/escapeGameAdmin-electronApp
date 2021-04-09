function notify() {
  window.Electron.ipcRenderer.send("notify", {
    title: "Mickaël est con",
    body: "Ta gueule !!!",
  })
}
