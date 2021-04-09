class Log {
  message = ""
  time = ""

  constructor(message, time = null) {
    this.message = message
    this.time = time || this.getCurrentTime()
  }

  print() {
    return `[${this.time}] ${this.message}`
  }

  getCurrentTime() {
    const date = new Date()

    return `${date.getHours}:${date.getMinutes()}`
  }
}

export default Log
