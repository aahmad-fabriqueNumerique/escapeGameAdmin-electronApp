function notify(title, body) {
  window.Electron.ipcRenderer.send("notify", {
    title,
    body,
  })
}
