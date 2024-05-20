const express = require("express");
const LottoEngineController = require("../controller/LottoEngineController");
const lottoEngineRouter = express.Router();

// Route to get all Thirty TwentyNine Patterns
lottoEngineRouter
  .route("/getAllThirtyTwentyNinePattern")
  .get(LottoEngineController.getAllThirtyTwentyNinePattern);
// Example: /getAllThirtyTwentyNinePattern

// Route to get Odd Even Patterns
lottoEngineRouter
  .route("/getOddEvenPattern")
  .get(LottoEngineController.getOddEvenPattern);
// Example: /getOddEvenPattern?firstNumberType=1&countOfEvenNumber=2

// Route to get Five Tens And Nine Patterns
lottoEngineRouter
  .route("/getFiveTensAndNinePattern")
  .get(LottoEngineController.getFiveTensAndNinePattern);
// Example: /getFiveTensAndNinePattern?chosenThirtyTwentyNinePattern=4&countOfNumberInFirstColumn=2

// Route to get Main Grid
lottoEngineRouter.route("/getMainGrid").get(LottoEngineController.getMainGrid);
// Example: /getMainGrid?chosenFiveTensAndNineId=181&chosenOddEvenPatternId=23

// Route to get all possible Multi Types
lottoEngineRouter
  .route("/getPossibleMultiTypes")
  .get(LottoEngineController.getPossibleMultiTypes);
// Example: /getPossibleMultiTypes?chosenFiveTensAndNineId=242&chosenOddEvenPatternId=2

// Route to get Multi Type Grid
lottoEngineRouter
  .route("/getMultiTypeGrid")
  .get(LottoEngineController.getMultiTypeGrid);
// Example: /getMultiTypeGrid?chosenFiveTensAndNineId=242&chosenOddEvenPatternId=2&n1=4&n2=4

// Route to get details of line
lottoEngineRouter
  .route("/getDetailsOfLine")
  .get(LottoEngineController.getDetailsOfLine);
// Example: /getDetailsOfLine?line=12%2016%2018%2032%2034%2039

module.exports = lottoEngineRouter;
