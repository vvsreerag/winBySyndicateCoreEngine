const PatternOddEven = require("../database/models").pattern_odd_even;
const PatternThirtyTwentyNine =
  require("../database/models").pattern_thirty_twentynine;
const PatternFiveTensAndNine =
  require("../database/models").pattern_five_tens_nine;

const CLASSIFIED_NUMBERS = require("../constants/classifiedNumberSystem");

const Sequelize = require("sequelize");
const { Op } = Sequelize;

/**
 * Retrieves the Thirty TwentyNine pattern data from the database.
 * @returns {Object} An object containing the status and data of the pattern.
 * - If successful, returns an object with status true and the pattern data.
 * - If no data found, returns an object with status false and an error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getThirtyTwentyNinePattern = async () => {
  try {
    // Retrieve all Thirty TwentyNine patterns from the database
    const response = await PatternThirtyTwentyNine.findAll();

    // Check if response contains any data
    if (response?.length > 0) {
      // Process the retrieved data into the desired format
      const dataArray = response.reduce((acc, item) => {
        const { pattern_thirty_twentynine_id, ...values } = item.dataValues;
        acc[pattern_thirty_twentynine_id] = Object.values(values);
        return acc;
      }, {});

      // Return the processed data with a success status
      return { status: true, data: dataArray };
    } else {
      // Return an error message if no data found
      return {
        status: false,
        message: "Invalid: failed to fetch Thirty TwentyNine Pattern",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching Thirty TwentyNine pattern",
    };
  }
};

/**
 * Retrieves Odd Even pattern data from the database based on the provided query parameters.
 * @param {Object} query - The query object containing filter parameters.
 * @param {string} query.firstNumberType - The type of the first number in the pattern.
 * @param {number} query.countOfEvenNumber - The desired count of even numbers in the pattern.
 * @returns {Object} An object containing the status and data of the pattern.
 * - If successful, returns an object with status true and the pattern data.
 * - If no data found, returns an object with status false and an error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getOddEvenPattern = async (query) => {
  try {
    // Initialize the where condition object
    let whereCondition = {};

    // Check if the firstNumberType parameter is provided
    if (query?.firstNumberType) {
      whereCondition.type_1 = query.firstNumberType;
    }

    // Check if the countOfEvenNumber parameter is provided
    if (query?.countOfEvenNumber) {
      // Construct the condition for the desired count of even numbers
      whereCondition[Op.and] = [
        Sequelize.literal(
          `(type_1 = 2) + (type_2 = 2) + (type_3 = 2) + (type_4 = 2) + (type_5 = 2) + (type_6 = 2) = ${query.countOfEvenNumber}`
        ),
      ];
    }

    // Retrieve Odd Even patterns from the database based on the where condition
    const response = await PatternOddEven.findAll({ where: whereCondition });

    // Check if response contains any data
    if (response?.length > 0) {
      // Process the retrieved data into the desired format
      const dataArray = response.reduce((acc, item) => {
        const { pattern_odd_even_id, ...values } = item.dataValues;
        acc[pattern_odd_even_id] = Object.values(values);
        return acc;
      }, {});

      // Return the processed data with a success status
      return { status: true, data: dataArray };
    } else {
      // Return an error message if no data found
      return { status: false, message: "No result found" };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return { status: false, message: "Error fetching odd even pattern" };
  }
};

/**
 * Retrieves Odd Even pattern data from the database by the provided pattern ID.
 * @param {Object} query - The query object containing the pattern ID.
 * @param {string} query.chosenOddEvenPatternId - The ID of the chosen Odd Even pattern.
 * @returns {Object} An object containing the status and data of the pattern.
 * - If successful, returns an object with status true and the pattern data.
 * - If no pattern found for the provided ID, returns an object with status false and an error message.
 * - If the pattern ID is missing or invalid, returns an object with status false and an error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getOddEvenPatternById = async (query) => {
  try {
    // Check if the chosenOddEvenPatternId parameter is provided
    if (!query?.chosenOddEvenPatternId)
      return { status: false, message: "Odd Even Pattern is required" };

    // Retrieve Odd Even pattern from the database by its ID
    const response = await PatternOddEven.findByPk(
      query.chosenOddEvenPatternId,
      {
        // Select specific attributes of the pattern
        attributes: [
          "type_1",
          "type_2",
          "type_3",
          "type_4",
          "type_5",
          "type_6",
        ],
      }
    );

    // Check if response contains data
    if (response) {
      // Return the pattern data with a success status
      return { status: true, data: Object.values(response.dataValues) };
    } else {
      // Return an error message if no pattern found for the provided ID
      return {
        status: false,
        message: "Invalid pattern id",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return { status: false, message: "Error fetching odd even pattern by id" };
  }
};

/**
 * Retrieves the ID of an Odd Even pattern from the database based on the provided pattern values.
 * @param {number[]} pattern - An array representing the values of the Odd Even pattern.
 * @returns {Object} An object containing the status and data of the pattern ID.
 * - If successful, returns an object with status true and the pattern ID.
 * - If the provided pattern is invalid or does not match any pattern in the database, returns an object with status false and an error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getOddEvenPatternIdFromPattern = async (pattern) => {
  try {
    // Check if the pattern is provided and has the correct length
    if (!pattern || pattern.length !== 6)
      return { status: false, message: "Invalid Pattern" };

    // Define the condition to match the pattern in the database
    const condition = {
      type_1: pattern[0],
      type_2: pattern[1],
      type_3: pattern[2],
      type_4: pattern[3],
      type_5: pattern[4],
      type_6: pattern[5],
    };

    // Find the pattern ID from the database based on the condition
    const response = await PatternOddEven.findOne({
      where: condition,
      attributes: ["pattern_odd_even_id"],
    });

    // Check if response contains data
    if (response) {
      // Return the pattern ID with a success status
      return { status: true, data: response?.dataValues?.pattern_odd_even_id };
    } else {
      // Return an error message if the pattern ID could not be fetched
      return { status: false, message: "Could not fetch Odd even pattern Id" };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching pattern id from odd even pattern",
    };
  }
};

/**
 * Retrieves patterns from the database based on the provided parameters.
 * @param {Object} query - An object containing query parameters.
 * @param {number} query.chosenThirtyTwentyNinePattern - The ID of the chosen pattern from the thirty twentyNine Pattern.
 * @param {number} [query.countOfNumberInFirstColumn] - The count of numbers in the first column.
 * @returns {Object} An object containing the status and data of the retrieved patterns.
 * - If successful, returns an object with status true and the retrieved patterns.
 * - If required parameters are missing or invalid, returns an object with status false and an error message.
 * - If no patterns match the provided criteria, returns an object with status false and a message indicating fetching failure.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getFiveTensAndNinePattern = async (query) => {
  try {
    // Check if query is provided
    if (!query)
      return { status: false, message: "Missing required parameters" };

    // Check if chosenThirtyTwentyNinePattern is provided
    if (!query?.chosenThirtyTwentyNinePattern)
      return {
        status: false,
        message: "A Pattern choice from thirty twentyNine Pattern is required",
      };

    // Define the whereCondition object
    let whereCondition = {
      pattern_thirty_twentynine_id: query?.chosenThirtyTwentyNinePattern,
    };

    // Check if countOfNumberInFirstColumn is provided
    if (query?.countOfNumberInFirstColumn) {
      whereCondition = {
        ...whereCondition,
        [Op.and]: [{ column_1: query.countOfNumberInFirstColumn }],
      };
    }

    // Fetch data from the database
    const response = await PatternFiveTensAndNine.findAll({
      attributes: [
        "pattern_five_tens_nine_id",
        "column_1",
        "column_2",
        "column_3",
        "column_4",
        "column_5",
        "column_6",
      ],
      where: whereCondition,
    });

    // Check if response contains data
    if (response?.length > 0) {
      // Process the response data
      const dataArray = response.reduce((acc, item) => {
        const { pattern_five_tens_nine_id, ...values } = item.dataValues;
        acc[pattern_five_tens_nine_id] = Object.values(values);
        return acc;
      }, {});

      // Return the retrieved patterns with a success status
      return { status: true, data: dataArray };
    } else {
      // Return a message indicating fetching failure if no patterns match the criteria
      return {
        status: false,
        message: "Fetching failed invalid parameters",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching five tens and nine pattern",
    };
  }
};

/**
 * Retrieves the pattern ID from the database based on the provided pattern.
 * @param {number[]} pattern - An array representing the pattern.
 * @returns {Object} An object containing the status and data of the retrieved pattern ID.
 * - If successful, returns an object with status true and the retrieved pattern ID.
 * - If the provided pattern is invalid, returns an object with status false and an error message.
 * - If the pattern ID cannot be fetched, returns an object with status false and a corresponding error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getFiveTensAndNinePatternIdFromPattern = async (pattern) => {
  try {
    // Check if pattern is provided and has the correct length
    if (!pattern || pattern.length !== 6)
      return { status: false, message: "Invalid Pattern" };

    // Define the condition based on the provided pattern
    const condition = {
      column_1: pattern[0],
      column_2: pattern[1],
      column_3: pattern[2],
      column_4: pattern[3],
      column_5: pattern[4],
      column_6: pattern[5],
    };

    // Fetch the pattern ID from the database
    const response = await PatternFiveTensAndNine.findOne({
      where: condition,
      attributes: ["pattern_five_tens_nine_id"],
    });

    // Check if pattern ID is retrieved successfully
    if (response) {
      // Return the retrieved pattern ID with a success status
      return {
        status: true,
        data: response?.dataValues?.pattern_five_tens_nine_id,
      };
    } else {
      // Return an error message if the pattern ID cannot be fetched
      return {
        status: false,
        message: "Invalid pattern could not fetch Odd even pattern Id",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching pattern id from five tens and nine patterns",
    };
  }
};

/**
 * Retrieves the combinations of the five tens and nine pattern based on the provided query.
 * @param {Object} query - An object containing query parameters.
 * @param {number} query.chosenThirtyTwentyNinePattern - The chosen thirty twentyNine pattern ID.
 * @param {number} [query.countOfNumberInFirstColumn] - The count of numbers in the first column.
 * @returns {Object} An object containing the status and data of the retrieved pattern combinations.
 * - If successful, returns an object with status true and the retrieved pattern combinations.
 * - If any required parameter is missing, returns an object with status false and an error message.
 * - If the provided parameters result in no valid combinations, returns an object with status false and a corresponding error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getFiveTensAndNinePatternCombinations = async (query) => {
  try {
    // Check if query is provided
    if (!query)
      return { status: false, message: "Missing required parameters" };

    // Check if chosenThirtyTwentyNinePattern is provided
    if (!query?.chosenThirtyTwentyNinePattern)
      return {
        status: false,
        message: "A Pattern choice from thirty twentyNine Pattern is required",
      };

    // Define the whereCondition object
    let whereCondition = {
      pattern_thirty_twentynine_id: query?.chosenThirtyTwentyNinePattern,
    };

    // Check if countOfNumberInFirstColumn is provided
    if (query?.countOfNumberInFirstColumn) {
      whereCondition = {
        ...whereCondition,
        [Op.and]: [{ column_1: query.countOfNumberInFirstColumn }],
      };
    }

    // Fetch data from the database
    const response = await PatternFiveTensAndNine.findAll({
      attributes: ["pattern_five_tens_nine_id", "total_combination"],
      where: whereCondition,
    });

    // Check if valid combinations are retrieved
    if (response?.length > 0) {
      // Process the response data
      const dataArray = response.reduce((acc, item) => {
        const { pattern_five_tens_nine_id, ...values } = item.dataValues;
        acc[pattern_five_tens_nine_id] = Object.values(values);
        return acc;
      }, {});

      // Return the retrieved pattern combinations with a success status
      return { status: true, data: dataArray };
    } else {
      // Return an error message if no valid combinations are found
      return {
        status: false,
        message:
          "Invalid parameter to fetch five tens and nine pattern combinations",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching five tens and nine pattern combination",
    };
  }
};

/**
 * Retrieves the five tens and nine pattern based on the provided pattern ID.
 * @param {Object} query - An object containing the query parameters.
 * @param {number} query.chosenFiveTensAndNineId - The ID of the chosen five tens and nine pattern.
 * @returns {Object} An object containing the status and data of the retrieved pattern.
 * - If successful, returns an object with status true and the retrieved pattern data.
 * - If the required pattern ID is missing, returns an object with status false and an error message.
 * - If the provided pattern ID does not match any existing pattern, returns an object with status false and a corresponding error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getFiveTensAndNinePatternById = async (query) => {
  try {
    // Check if chosenFiveTensAndNineId is provided
    if (!query.chosenFiveTensAndNineId)
      return {
        status: false,
        message: "Five tens and nine pattern id required",
      };

    // Fetch the pattern from the database
    const response = await PatternFiveTensAndNine.findByPk(
      query.chosenFiveTensAndNineId,
      {
        attributes: [
          "column_1",
          "column_2",
          "column_3",
          "column_4",
          "column_5",
          "column_6",
        ],
      }
    );

    // Check if the pattern is found
    if (response) {
      // Return the retrieved pattern data with a success status
      return { status: true, data: Object.values(response.dataValues) };
    } else {
      // Return an error message if the pattern ID is invalid
      return {
        status: false,
        message:
          "Invalid parameter Five tens and nine pattern could not be found",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching five tens and nine pattern by Id",
    };
  }
};

/**
 * Retrieves the total combination count of a five tens and nine pattern based on the provided pattern ID.
 * @param {Object} query - An object containing the query parameters.
 * @param {number} query.chosenFiveTensAndNineId - The ID of the chosen five tens and nine pattern.
 * @returns {Object} An object containing the status and total combination count of the pattern.
 * - If successful, returns an object with status true and the total combination count.
 * - If the required pattern ID is missing, returns an object with status false and an error message.
 * - If the provided pattern ID does not match any existing pattern, returns an object with status false and a corresponding error message.
 * - If an error occurs during the process, returns an object with status false and an error message.
 */
const getFiveTensAndNinePatternCombinationById = async (query) => {
  try {
    // Check if chosenFiveTensAndNineId is provided
    if (!query.chosenFiveTensAndNineId)
      return {
        status: false,
        message: "Five tens and nine pattern id required",
      };

    // Fetch the pattern combination count from the database
    const response = await PatternFiveTensAndNine.findByPk(
      query.chosenFiveTensAndNineId,
      {
        attributes: ["total_combination"],
      }
    );

    // Check if the pattern is found
    if (response) {
      // Return the total combination count with a success status
      return { status: true, data: response.total_combination };
    } else {
      // Return an error message if the pattern ID is invalid
      return {
        status: false,
        message: "Invalid parameter Combination could not be found",
      };
    }
  } catch (error) {
    // Return an error message if an error occurs during the process
    return {
      status: false,
      message: "Error fetching five tens and nine pattern by Id",
    };
  }
};

/**
 * Retrieves the bucket related to a five tens and nine pattern based on the provided pattern.
 * @param {Object} query - An object containing the query parameters.
 * @param {number[]} query.chosenFiveTensAndNinePattern - The chosen five tens and nine pattern.
 * @returns {Object} An object containing the status and data representing the bucket related to the pattern.
 * - If successful, returns an object with status true and an array representing the bucket related to the pattern.
 * - If the required pattern is missing, returns an object with status false and an error message.
 */
const getBucketRelatedToPattern = async (query) => {
  // Check if chosenFiveTensAndNinePattern is provided
  if (!query?.chosenFiveTensAndNinePattern)
    return {
      status: false,
      message: "Five tens and nine pattern required",
    };

  // Define column headers
  const columnHeaders = [1, 2, 3, 4, 5, 6];
  // Initialize array to store numbers and their corresponding columns
  const numberBelongsToWhichColumn = [];

  // Iterate over the pattern and assign numbers to their columns
  for (let i = 0; i < query.chosenFiveTensAndNinePattern.length; i++) {
    const count = parseInt(query.chosenFiveTensAndNinePattern[i]);
    const columnValues = Array(count).fill(columnHeaders[i]);
    numberBelongsToWhichColumn.push(...columnValues);
  }

  // Return the array representing the bucket related to the pattern
  return { status: true, data: numberBelongsToWhichColumn };
};

/**
 * Retrieves a simplified classification object containing sorted values from the CLASSIFIED_NUMBERS object.
 * @returns {Object} An object containing the simplified classification with sorted values.
 */
const getSimplifiedClassificationObject = async () => {
  // Initialize an empty object to store the simplified classification
  const simplifiedObject = {};

  // Iterate over the keys of the CLASSIFIED_NUMBERS object
  Object.keys(CLASSIFIED_NUMBERS).forEach((key) => {
    // Retrieve the values for the current key, flatten them into a single array, and sort them
    const values = Object.values(CLASSIFIED_NUMBERS[key])
      .flat()
      .sort((a, b) => a - b);

    // Assign the sorted values to the simplified object
    simplifiedObject[key] = values;
  });

  // Return the simplified classification object
  return simplifiedObject;
};

/**
 * Generates the main grid based on the provided parameters.
 * @param {Object} query - An object containing the required parameters: numberBelongsToWhichColumn and chosenOddEvenPattern.
 * @returns {Object} An object with the status indicating success or failure, and data containing the generated main grid.
 */
const getMainGrid = async (query) => {
  try {
    // Check if numberBelongsToWhichColumn and chosenOddEvenPattern are provided
    if (!query?.numberBelongsToWhichColumn || !query?.chosenOddEvenPattern)
      return { status: false, message: "Missing required parameters" };

    //Flag to detect whether any invalid row exist
    let inValidFlag = false;

    // Retrieve the simplified classification object
    const simplifiedObject = await getSimplifiedClassificationObject();

    // Initialize an empty array to store the grid
    let grid = [];

    // Iterate over each value in numberBelongsToWhichColumn
    query.numberBelongsToWhichColumn.forEach((value, index) => {
      // Retrieve the oddEvenPatternType for the current index
      const oddEvenPatternType = query.chosenOddEvenPattern[index];

      // Filter the values from the simplified classification object based on the current oddEvenPatternType and value
      let row = simplifiedObject[oddEvenPatternType].filter(
        (patternValue) =>
          patternValue > value * 10 - 10 && patternValue <= value * 10
      );

      // Exclude values that conflict with previous rows
      for (let i = 0; i < index; i++) {
        if (row.some((valueInRow) => valueInRow <= grid[i][0])) {
          row = row.filter((valueInRow) => valueInRow > grid[i][0]);
        }
      }
      if (row?.length === 0) {
        inValidFlag = true;
      }

      // Push the filtered row to the grid array
      grid.push(row);
    });

    if (inValidFlag) {
      return {
        status: false,
        message: "Wrong input to generate the MainGrid",
      };
    } else {
      // Return the status and generated grid
      return { status: true, data: grid };
    }
  } catch (error) {
    // Return error message if an error occurs during grid generation
    return { status: false, message: "Error generating Main Grid" };
  }
};

/**
 * Generates all possible multiplier types for each row based on the provided parameters.
 * @param {Object} query - An object containing the required parameters: numberBelongsToWhichColumn and chosenOddEvenPattern.
 * @returns {Object} An object with the status indicating success or failure, and data containing the possible multiplier types for each row.
 */
const getAllPossibleMultiplierTypeForEachRow = async (query) => {
  try {
    // Check if numberBelongsToWhichColumn and chosenOddEvenPattern are provided
    if (!query?.numberBelongsToWhichColumn || !query?.chosenOddEvenPattern)
      return { status: false, message: "Missing required parameters" };

    // Retrieve the keys for multiplier types based on the chosenOddEvenPattern
    const multiTypeKeys = query?.chosenOddEvenPattern.map((pattern) =>
      Object.keys(CLASSIFIED_NUMBERS[pattern])
    );

    // Generate the main grid based on the provided parameters
    const mainGrid = await getMainGrid({
      numberBelongsToWhichColumn: query?.numberBelongsToWhichColumn,
      chosenOddEvenPattern: query?.chosenOddEvenPattern,
    });

    // If main grid generation is successful
    if (mainGrid.status) {
      // Initialize an array to store the possible multiplier types for each row
      const keyArray = [];

      // Iterate over each row in the main grid
      for (let i = 0; i < multiTypeKeys.length; i++) {
        // Initialize an array to store the possible multiplier types for the current row
        const rowArray = [];

        // Iterate over each multiplier type key for the current row
        for (let j = 0; j < multiTypeKeys[i].length; j++) {
          // Check if any number in the current row matches the multiplier type
          if (
            mainGrid.data[i].some((num) =>
              CLASSIFIED_NUMBERS[query.chosenOddEvenPattern[i]][
                multiTypeKeys[i][j]
              ].includes(num)
            )
          ) {
            // If there is a match, push the multiplier type to the rowArray
            rowArray.push(multiTypeKeys[i][j]);
          }
        }

        // Push the rowArray to the keyArray
        keyArray.push(rowArray);
      }

      // Return the status and the array of possible multiplier types for each row
      return { status: true, data: keyArray };
    }
  } catch (error) {
    // Return error message if an error occurs during generation
    return {
      status: false,
      message:
        "Error generating possibilities of Multiplier types for Each Rows",
    };
  }
};

/**
 * Generates a multi-type grid based on the provided parameters.
 * @param {Object} query - An object containing the required parameters: numberBelongsToWhichColumn, chosenOddEvenPattern, and optional numbers.
 * @returns {Object} An object with the status indicating success or failure, and data containing the multi-type grid.
 */
const getMultiTypeGrid = async (query) => {
  try {
    // Check if numberBelongsToWhichColumn and chosenOddEvenPattern are provided
    if (!query?.numberBelongsToWhichColumn || !query?.chosenOddEvenPattern)
      return { status: false, message: "Missing required parameters" };

    // Generate the main grid based on the provided parameters
    const mainGrid = await getMainGrid({
      numberBelongsToWhichColumn: query?.numberBelongsToWhichColumn,
      chosenOddEvenPattern: query?.chosenOddEvenPattern,
    });

    // If main grid generation is successful
    if (mainGrid.status) {
      // Check if numbers are provided in the query
      if (query?.numbers) {
        // Iterate over each number provided in the query
        for (let i = 0; i < 6; i++) {
          const num = query?.numbers[`n${i + 1}`];
          if (num) {
            // Filter the main grid data based on the provided number and update the row
            const newArrayRow = CLASSIFIED_NUMBERS[
              query?.chosenOddEvenPattern[i]
            ][num].filter(
              (item) =>
                item > query?.numberBelongsToWhichColumn[i] * 10 - 10 &&
                item <= query?.numberBelongsToWhichColumn[i] * 10
            );
            mainGrid.data[i] = newArrayRow;
          }
        }

        // Adjust the main grid to ensure consistency between rows
        for (let i = 0; i < mainGrid.data.length - 1; i++) {
          if (
            mainGrid.data[i + 1].some(
              (valueInRow) => valueInRow <= mainGrid.data[i][0]
            )
          ) {
            mainGrid.data[i + 1] = mainGrid.data[i + 1].filter(
              (valueInRow) => valueInRow > mainGrid.data[i][0]
            );
          }
        }

        // Return the status and the updated multi-type grid
        return { status: true, data: mainGrid.data };
      }

      // Return the status and the original multi-type grid if no numbers are provided
      return { status: true, data: mainGrid.data };
    }
  } catch (error) {
    // Return error message if an error occurs during generation
    return { status: false, message: "Error generating MultiType Grid" };
  }
};

/**
 * Retrieves pattern choices from the given line of numbers.
 * @param {Object} query - An object containing the line parameter.
 * @returns {Object} An object with the status indicating success or failure, and data containing pattern choices.
 */
const getPatternChoicesFromLine = async (query) => {
  try {
    // Check if the line parameter is missing or invalid
    if (
      !query?.line ||
      (typeof query.line === "string" && query.line === "") ||
      (Array.isArray(query.line) && query.line.length !== 6)
    ) {
      return { status: false, message: "Line parameter is missing" };
    }

    // Convert the line parameter to an array of numbers if it's a string
    let lineNumbers;
    if (Array.isArray(query?.line)) {
      lineNumbers = query.line;
    } else {
      lineNumbers = query?.line.split(" ").map(Number);
    }

    // Retrieve simplified classification object
    const classifiedNumbers = await getSimplifiedClassificationObject();

    // Determine odd-even pattern based on line numbers
    const oddEvenPattern = [];
    for (const number of lineNumbers) {
      const index = Object.keys(classifiedNumbers).find((key) =>
        classifiedNumbers[key].includes(number)
      );
      if (index) {
        oddEvenPattern.push(index);
      }
    }

    // Determine pattern distribution (five, tens, and nine) based on line numbers
    const linePattern = [0, 0, 0, 0, 0, 0];
    lineNumbers.forEach((number) => {
      if (number >= 1 && number <= 10) {
        linePattern[0]++;
      } else if (number >= 11 && number <= 20) {
        linePattern[1]++;
      } else if (number >= 21 && number <= 30) {
        linePattern[2]++;
      } else if (number >= 31 && number <= 40) {
        linePattern[3]++;
      } else if (number >= 41 && number <= 50) {
        linePattern[4]++;
      } else if (number >= 51 && number <= 59) {
        linePattern[5]++;
      }
    });

    // Retrieve five, tens, and nine pattern ID from the database
    const fiveTensAndNinePatternId =
      await getFiveTensAndNinePatternIdFromPattern(linePattern);

    // Retrieve odd-even pattern ID from the database
    const oddEvenPatternId = await getOddEvenPatternIdFromPattern(
      oddEvenPattern
    );

    // Determine multiple type choices based on line numbers and odd-even pattern
    const multipleTypeChoice = [];
    for (let i = 0; i < lineNumbers.length; i++) {
      const index = Object.keys(CLASSIFIED_NUMBERS[oddEvenPattern[i]]).find(
        (key) =>
          CLASSIFIED_NUMBERS[oddEvenPattern[i]][key].includes(lineNumbers[i])
      );
      if (index) {
        multipleTypeChoice.push(index);
      }
    }

    // Return the pattern choices
    return {
      status: true,
      data: {
        oddEvenPatternId: oddEvenPatternId.data,
        fiveTensAndNinePatternId: fiveTensAndNinePatternId.data,
        multipleTypeChoice: multipleTypeChoice,
      },
    };
  } catch (error) {
    // Return error message if an error occurs
    return {
      status: false,
      message: "Error getting pattern from the given line",
    };
  }
};

/**
 * Transforms multi-dimensional data to string type with padding.
 * @param {Object} input - The input object containing multi-dimensional data.
 * @returns {Object} The output object with string type values padded with spaces.
 */
const transformMultiDimensionalDataToStringType = (input) => {
  const output = {};

  // Iterate through each key in the input object
  for (const key in input) {
    const values = input[key];
    // Convert each value to string type and pad with spaces
    output[key] = values
      .map((value) => value.toString().padStart(2, " "))
      .join(" ");
  }

  return output;
};

/**
 * Calculates combinations of a grid.
 * @param {Array<Array<number>>} grid - The grid containing numbers.
 * @returns {Array<string>} An array of combinations.
 */
const calculateCombinationOfGrid = async (grid) => {
  let totalCombination = [];

  // Loop through every second row of the grid
  for (let x = 0; x < grid.length; x += 2) {
    let columnOfNP = [];

    // Iterate through each number in the first row
    for (let i = 0; i < grid[x].length; i++) {
      // Iterate through each number in the second row
      for (let j = 0; j < grid[x + 1].length; j++) {
        // Check if the numbers are not equal and the combination doesn't already exist
        if (
          grid[x][i] < grid[x + 1][j] &&
          !columnOfNP.includes(grid[x + 1][j] + " " + grid[x][i])
        ) {
          columnOfNP.push(grid[x][i] + " " + grid[x + 1][j]);
        }
      }
    }
    totalCombination.push(columnOfNP);
  }

  // Initialize array to store combinations of two rows
  let combine2 = [];

  // Iterate through combinations of the first and second rows
  for (let i = 0; i < totalCombination[0].length; i++) {
    for (let j = 0; j < totalCombination[1].length; j++) {
      // Check if the last number of the first combination is less than the first number of the second combination
      if (
        parseInt(totalCombination[0][i].split(" ")[1], 10) <
        parseInt(totalCombination[1][j].split(" ")[0], 10)
      ) {
        combine2.push(totalCombination[0][i] + " " + totalCombination[1][j]);
      }
    }
  }

  // Initialize array to store combinations of three rows
  let combine3 = [];

  // Iterate through combinations of two rows and the third row
  for (let i = 0; i < combine2.length; i++) {
    for (let j = 0; j < totalCombination[2].length; j++) {
      // Check if the last number of the second combination is less than the first number of the third combination
      if (
        parseInt(combine2[i].split(" ")[3], 10) <
        parseInt(totalCombination[2][j].split(" ")[0], 10)
      ) {
        combine3.push(combine2[i] + " " + totalCombination[2][j]);
      }
    }
  }

  return combine3;
};

module.exports = {
  getThirtyTwentyNinePattern,
  getOddEvenPattern,
  getOddEvenPatternById,
  getOddEvenPatternIdFromPattern,
  getFiveTensAndNinePattern,
  getFiveTensAndNinePatternById,
  getFiveTensAndNinePatternCombinations,
  getFiveTensAndNinePatternCombinationById,
  getFiveTensAndNinePatternIdFromPattern,
  getBucketRelatedToPattern,
  getSimplifiedClassificationObject,
  getMainGrid,
  getAllPossibleMultiplierTypeForEachRow,
  getMultiTypeGrid,
  getPatternChoicesFromLine,
  transformMultiDimensionalDataToStringType,
  calculateCombinationOfGrid,
};
