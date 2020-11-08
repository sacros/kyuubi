import * as winston from "winston"

const format = winston.format.cli({
  colors: {
    debug: "green",
    info: "cyan",
    silly: "magenta",
    warn: "yellow",
    error: "red"
  }
})


export const logger = winston.createLogger({
  transports: [new winston.transports.Console({ format })]
})
