const { ipcMain } = require("electron")
const fs = require("fs")
const path = require("path")
const util = require("util")

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
}

module.exports = init
