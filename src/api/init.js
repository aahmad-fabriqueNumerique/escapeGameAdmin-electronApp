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

  const games_data = path.join(__dirname, "../../.cache/game.json")
  const games_data_raw = await readFile(games_data , "utf-8")
  const db_games = JSON.parse(games_data_raw)

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

  ipcMain.on("post-game", (_, arg) => {
    db_games.push(arg);
    writeFile(games_data, JSON.stringify(db_games, null, 2));
  });

  ipcMain.on("fetch-games", (event) => {
    event.returnValue = db_games
  })
}

module.exports = init
