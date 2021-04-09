const { ipcMain } = require("electron")
const fs = require("fs")
const path = require("path")
const util = require("util")

let connecteduser = null

const init = async () => {
  const readFile = util.promisify(fs.readFile)
  const writeFile = util.promisify(fs.writeFile)
  const file = path.join(__dirname, "../../.cache/data.json")
  const raw = await readFile(file, "utf-8")
  const db = JSON.parse(raw)

  console.log(db)

  ipcMain.on("post-log", (_, arg) => {
    db.logs.push(arg)
    writeFile(file, JSON.stringify(db, null, 2))
  })

  ipcMain.on("fetch-logs", (event, arg) => {
    event.returnValue = db.logs
  })

  ipcMain.on("connect", (event, args) => {
    let user = db.users.find((user) => user.id == args.id)
    if (user && user.mdp == args.mdp) {
      //login ok
      event.returnValue = "ok"
      connecteduser = user.id
    } else {
      //login pas ok
      event.returnValue = "not ok"
    }
  })

  ipcMain.on("connected", (event, args) => {
    event.returnValue = connecteduser
  })

  ipcMain.on("disconnect", (event, args) => {
    connecteduser = null
    event.returnValue = "disconnected"
  })

  ipcMain.on("notify", (event, arg) => {
    const notif = new Notification({
      title: arg.title,
      body: arg.body,
    })

    notif.show()
  })
}

module.exports = init
