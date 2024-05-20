const asyncHandler = require("express-async-handler");
const lottoEnginService = require("../services/lottoEngineServices");

class LottoEngineController {
  /**
   * Controller to get all the patterns for Thirty TwentyNine Pattern.
   * Returns data as an array.
   * @returns {object} The response containing data.
   */
  getAllThirtyTwentyNinePattern = asyncHandler(async (req, res) => {
    try {
      // Get all the patterns for Thirty TwentyNine Pattern
      const response = await lottoEnginService.getThirtyTwentyNinePattern();

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Transform multi-dimensional data to string type
      const transformedData =
        await lottoEnginService.transformMultiDimensionalDataToStringType(
          response?.data
        );

      // Send successful response
      res.status(200).json({
        data: transformedData,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Controller to get all the patterns for Odd Even Pattern.
   * Filters patterns according to the first number type and the count of even numbers in a line.
   * Returns data as an array.
   * @returns {object} The response containing data.
   */
  getOddEvenPattern = asyncHandler(async (req, res) => {
    try {
      const { firstNumberType, countOfEvenNumber } = req.query;

      // Check if required parameters are provided
      if (!firstNumberType || !countOfEvenNumber) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Get the list of patterns for Odd Even Pattern
      const response = await lottoEnginService.getOddEvenPattern({
        firstNumberType: firstNumberType,
        countOfEvenNumber: countOfEvenNumber,
      });

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Transform multi-dimensional data to string type
      const transformedData =
        await lottoEnginService.transformMultiDimensionalDataToStringType(
          response?.data
        );

      // Send successful response
      res.status(200).json({
        data: transformedData,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Controller to get all the patterns for Five Tens and Nine.
   * Filters patterns based on the chosen Thirty TwentyNine Pattern and the count of numbers in the first bucket (column).
   * Returns data as an array.
   * @returns {object} The response containing data.
   */
  getFiveTensAndNinePattern = asyncHandler(async (req, res) => {
    try {
      const { chosenThirtyTwentyNinePattern, countOfNumberInFirstColumn } =
        req.query;

      // Check if required parameters are provided
      if (!chosenThirtyTwentyNinePattern || !countOfNumberInFirstColumn) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Get the list of patterns for Five Tens and Nine
      const response = await lottoEnginService.getFiveTensAndNinePattern({
        chosenThirtyTwentyNinePattern: chosenThirtyTwentyNinePattern,
        countOfNumberInFirstColumn: countOfNumberInFirstColumn,
      });

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Transform multi-dimensional data to string type
      const transformedData =
        await lottoEnginService.transformMultiDimensionalDataToStringType(
          response?.data
        );

      // Send successful response
      res.status(200).json({
        data: transformedData,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Controller to generate the MainGrid at a maximum of 6x6 according to the Five Tens and Nine Pattern ID and Odd Even Pattern ID.
   * It returns data as grid and combination of line from the grid.
   * @returns {object} The response containing data.
   */
  getMainGrid = asyncHandler(async (req, res) => {
    try {
      const { chosenFiveTensAndNineId, chosenOddEvenPatternId } = req.query;

      // Check if required parameters are provided
      if (!chosenFiveTensAndNineId || !chosenOddEvenPatternId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Get Odd Even Pattern by ID
      const oddEvenPattern = await lottoEnginService.getOddEvenPatternById({
        chosenOddEvenPatternId: chosenOddEvenPatternId,
      });
      if (!oddEvenPattern?.status) {
        return res.status(400).json({ message: oddEvenPattern.message });
      }

      // Get Five Tens and Nine Pattern by ID
      const fiveTensAndNinePattern =
        await lottoEnginService.getFiveTensAndNinePatternById({
          chosenFiveTensAndNineId: chosenFiveTensAndNineId,
        });
      if (!fiveTensAndNinePattern?.status) {
        return res
          .status(400)
          .json({ message: fiveTensAndNinePattern.message });
      }

      // Determine the bucket for each number
      const numberBelongsToWhichColumn =
        await lottoEnginService.getBucketRelatedToPattern({
          chosenFiveTensAndNinePattern: fiveTensAndNinePattern.data,
        });
      if (!numberBelongsToWhichColumn?.status) {
        return res
          .status(400)
          .json({ message: numberBelongsToWhichColumn.message });
      }

      // Generate the MainGrid
      const response = await lottoEnginService.getMainGrid({
        numberBelongsToWhichColumn: numberBelongsToWhichColumn.data,
        chosenOddEvenPattern: oddEvenPattern.data,
      });

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Calculate the combination of the grid
      const combination = (
        await lottoEnginService.calculateCombinationOfGrid(response.data)
      ).length;

      // Send successful response
      res.status(200).json({
        data: response.data,
        combination: combination,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Controller to generate all possibilities of choices that can be used to generate MultiTypeGrid.
   * It uses the Five Tens and Nine Pattern ID and Odd Even Pattern ID.
   * @returns {object} The response containing data.
   */
  getPossibleMultiTypes = asyncHandler(async (req, res) => {
    try {
      const { chosenFiveTensAndNineId, chosenOddEvenPatternId } = req.query;

      // Check if required parameters are provided
      if (!chosenFiveTensAndNineId || !chosenOddEvenPatternId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Get Odd Even Pattern by ID
      const oddEvenPattern = await lottoEnginService.getOddEvenPatternById({
        chosenOddEvenPatternId: chosenOddEvenPatternId,
      });
      if (!oddEvenPattern?.status) {
        return res.status(400).json({ message: oddEvenPattern.message });
      }

      // Get Five Tens and Nine Pattern by ID
      const fiveTensAndNinePattern =
        await lottoEnginService.getFiveTensAndNinePatternById({
          chosenFiveTensAndNineId: chosenFiveTensAndNineId,
        });
      if (!fiveTensAndNinePattern?.status) {
        return res
          .status(400)
          .json({ message: fiveTensAndNinePattern.message });
      }

      // Determine the bucket for each number
      const numberBelongsToWhichColumn =
        await lottoEnginService.getBucketRelatedToPattern({
          chosenFiveTensAndNinePattern: fiveTensAndNinePattern.data,
        });
      if (!numberBelongsToWhichColumn?.status) {
        return res
          .status(400)
          .json({ message: numberBelongsToWhichColumn.message });
      }

      // Generate all possible multiplier type for each row
      const response =
        await lottoEnginService.getAllPossibleMultiplierTypeForEachRow({
          numberBelongsToWhichColumn: numberBelongsToWhichColumn.data,
          chosenOddEvenPattern: oddEvenPattern.data,
        });

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Send successful response
      res.status(200).json({
        data: response.data,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Controller to get MultiTypeGrid.
   * This controller retrieves Odd Even Pattern, Five Tens and Nine Pattern,
   * determines the bucket for each number, and then generates the MultiTypeGrid.
   * @returns {object} The response containing data and combination count.
   */
  getMultiTypeGrid = asyncHandler(async (req, res) => {
    try {
      const { chosenFiveTensAndNineId, chosenOddEvenPatternId, ...numbers } =
        req.query;

      // Check if required parameters are provided
      if (!chosenFiveTensAndNineId || !chosenOddEvenPatternId) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Get Odd Even Pattern by ID
      const oddEvenPattern = await lottoEnginService.getOddEvenPatternById({
        chosenOddEvenPatternId: chosenOddEvenPatternId,
      });
      if (!oddEvenPattern?.status) {
        return res.status(400).json({ message: oddEvenPattern.message });
      }

      // Get Five Tens and Nine Pattern by ID
      const fiveTensAndNinePattern =
        await lottoEnginService.getFiveTensAndNinePatternById({
          chosenFiveTensAndNineId: chosenFiveTensAndNineId,
        });
      if (!fiveTensAndNinePattern?.status) {
        return res
          .status(400)
          .json({ message: fiveTensAndNinePattern.message });
      }

      // Determine the bucket for each number
      const numberBelongsToWhichColumn =
        await lottoEnginService.getBucketRelatedToPattern({
          chosenFiveTensAndNinePattern: fiveTensAndNinePattern.data,
        });
      if (!numberBelongsToWhichColumn?.status) {
        return res
          .status(400)
          .json({ message: numberBelongsToWhichColumn.message });
      }

      // Generate the MultiTypeGrid
      const response = await lottoEnginService.getMultiTypeGrid({
        numberBelongsToWhichColumn: numberBelongsToWhichColumn.data,
        chosenOddEvenPattern: oddEvenPattern.data,
        numbers: numbers,
      });

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Calculate combination count of the grid
      const combinationCount = (
        await lottoEnginService.calculateCombinationOfGrid(response.data)
      ).length;

      // Send successful response
      res.status(200).json({
        data: response.data,
        combination: combinationCount,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  /**
   * Controller to get details of a line.
   * This will generate five tens and nine pattern id, odd even pattern id,
   * and multiplier type used to generate the MultiTypeGrid.
   * @returns {object} The response containing data as array.
   */
  getDetailsOfLine = asyncHandler(async (req, res) => {
    try {
      const { line } = req.query;

      // Check if line parameter is provided
      if (!line) {
        return res.status(400).json({ error: "Missing required parameters" });
      }

      // Call service to get pattern choices from line
      const response = await lottoEnginService.getPatternChoicesFromLine({
        line: line,
      });

      // Check if response status is not true
      if (!response?.status) {
        return res.status(400).json({ message: response.message });
      }

      // Send successful response
      res.status(200).json({
        data: response?.data,
      });
    } catch (err) {
      // Handle internal server error
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
module.exports = new LottoEngineController();
