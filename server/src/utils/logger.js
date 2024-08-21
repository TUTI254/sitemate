const logger = require("pino");
const dayjs = require("dayjs");

// Create a logger instance to use
const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

module.exports = log;
