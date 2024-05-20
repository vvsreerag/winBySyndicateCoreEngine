const express = require("express");
const mainRouter = require("./routes/mainRouter");

const databaseInstance = require("./database/models");
const { accessLogger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require("./documentation/swaggerDocumentation");

require("dotenv").config();

const PORT = process.env.BACKEND_APP_PORT || 8080;
const APP_NAME = process.env.BACKEND_APP_NAME;

app.use(morgan("dev"));

app.use(accessLogger);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

app.use(cors());
app.use(express.json());

app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("WIN BY SYNDICATE CORE ");
});
app.use("/api/v1/", mainRouter);

app.use(errorHandler);

databaseInstance.sequelize
  .sync({})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`${APP_NAME} running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error Establishing Connection with Database");
    process.exit(1);
  });
