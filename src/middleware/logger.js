const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH::mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const accessLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const end = Date.now();
    const responseTime = end - start;
    logEvents(
      `${req.res.statusCode}\t${req.method}\t${req.url}\t${responseTime}ms`,
      "routeAccess.log"
    );
  });
  next();
};
module.exports = { logEvents, accessLogger };
