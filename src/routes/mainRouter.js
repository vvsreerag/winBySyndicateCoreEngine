const express = require("express");
const mainRouter = express.Router();

const lottoEngineRouter = require("./lottoEngineRouter");

mainRouter.use("/engine", lottoEngineRouter);
mainRouter.get("/", (req, res) => {
  res.send("WIN BY SYNDICATE CORE ENGINE V1");
});
module.exports = mainRouter;
