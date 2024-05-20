const getAllThirtyTwentyNinePattern = {
  tags: ["Engine Section 1"],
  summary: "Get Thirty TwentyNine Pattern",
  description: "Retrieve all patterns for Thirty TwentyNine Pattern",
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                description: "Object containing Thirty TwentyNine Pattern data",
                example: {
                  data: {
                    1: " 6  0",
                    2: " 5  1",
                    3: " 4  2",
                    4: " 3  3",
                    5: " 2  4",
                    6: " 1  5",
                    7: " 0  6",
                  },
                },
              },
              total: {
                type: "integer",
                description: "Total number of patterns",
                example: 10,
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            error: "Internal Server Error",
          },
        },
      },
    },
  },
};

const getOddEvenPattern = {
  tags: ["Engine Section 1"],
  summary: "Get Odd Even Pattern",
  description: "Retrieve the list of patterns for Odd Even Pattern.",
  parameters: [
    {
      in: "query",
      name: "firstNumberType",
      schema: {
        type: "string",
        example: "1",
      },
      description: "The type of the first number (1 for odd, 2 for even).",
      required: true,
    },
    {
      in: "query",
      name: "countOfEvenNumber",
      schema: {
        type: "string",
        example: "3",
      },
      description: "The count of even numbers in the pattern (max 6).",
      required: true,
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              data: {
                49: " 1  1  1  2  2  2",
                50: " 1  1  2  1  2  2",
                51: " 1  2  1  1  2  2",
                52: " 1  1  2  2  1  2",
                53: " 1  2  1  2  1  2",
                54: " 1  2  2  1  1  2",
                55: " 1  1  2  2  2  1",
                56: " 1  2  1  2  2  1",
                57: " 1  2  2  1  2  1",
                58: " 1  2  2  2  1  1",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const getFiveTensAndNinePattern = {
  tags: ["Engine Section 1"],
  summary: "Get Five Tens and Nine Pattern",
  description: "Retrieve the list of patterns for Five Tens and Nine Pattern.",
  parameters: [
    {
      in: "query",
      name: "chosenThirtyTwentyNinePattern",
      schema: {
        type: "string",
        example: "4",
      },
      description: "The chosen Thirty TwentyNine Pattern ID.",
      required: true,
    },
    {
      in: "query",
      name: "countOfNumberInFirstColumn",
      schema: {
        type: "string",
        example: "2",
      },
      description: "The count of numbers in the first column.",
      required: true,
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              data: {
                192: " 2  1  0  3  0  0",
                193: " 2  1  0  2  1  0",
                194: " 2  1  0  2  0  1",
                195: " 2  1  0  1  2  0",
                196: " 2  1  0  1  1  1",
                197: " 2  1  0  1  0  2",
                198: " 2  1  0  0  3  0",
                199: " 2  1  0  0  2  1",
                200: " 2  1  0  0  1  2",
                201: " 2  1  0  0  0  3",
                202: " 2  0  1  3  0  0",
                203: " 2  0  1  2  1  0",
                204: " 2  0  1  2  0  1",
                205: " 2  0  1  1  2  0",
                206: " 2  0  1  1  1  1",
                207: " 2  0  1  1  0  2",
                208: " 2  0  1  0  3  0",
                209: " 2  0  1  0  2  1",
                210: " 2  0  1  0  1  2",
                211: " 2  0  1  0  0  3",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const getMainGrid = {
  tags: ["Engine Section 1"],
  summary: "Generate MainGrid",
  description:
    "Generate the MainGrid at a maximum of 6x6 according to the Five Tens and Nine Pattern ID and Odd Even Pattern ID.",
  parameters: [
    {
      in: "query",
      name: "chosenFiveTensAndNineId",
      schema: {
        type: "string",
        example: "181",
      },
      description: "The chosen Five Tens and Nine Pattern ID.",
      required: true,
    },
    {
      in: "query",
      name: "chosenOddEvenPatternId",
      schema: {
        type: "string",
        example: "23",
      },
      description: "The chosen Odd Even Pattern ID.",
      required: true,
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                },
              },
              combination: {
                type: "integer",
                description: "The total number of combinations",
              },
            },
          },
          example: {
            data: [
              [22, 24, 26, 28, 30],
              [24, 26, 28, 30],
              [25, 27, 29],
              [27, 29],
              [51, 53, 55, 57, 59],
              [52, 54, 56, 58],
            ],
            combination: 50,
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const getPossibleMultiTypes = {
  tags: ["Engine Section 2"],
  summary: "Get Possible Multiplier Types",
  description:
    "Generate all possible multiplier types for each row according to the chosen Five Tens and Nine Pattern ID and Odd Even Pattern ID.",
  parameters: [
    {
      in: "query",
      name: "chosenFiveTensAndNineId",
      schema: {
        type: "string",
        example: "242",
      },
      description: "The chosen Five Tens and Nine Pattern ID.",
      required: true,
    },
    {
      in: "query",
      name: "chosenOddEvenPatternId",
      schema: {
        type: "string",
        example: "2",
      },
      description: "The chosen Odd Even Pattern ID.",
      required: true,
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          example: {
            data: [
              ["2", "4", "7", "9"],
              ["2", "4", "7", "9"],
              ["2", "4", "9"],
              ["2", "4", "9"],
              ["2", "9"],
              ["1", "3", "5"],
            ],
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const getMultiTypeGrid = {
  tags: ["Engine Section 2"],
  summary: "Get MultiType Grid",
  description:
    "Generate the MultiTypeGrid based on the chosen Five Tens and Nine Pattern ID and Odd Even Pattern ID, along with provided numbers.",
  parameters: [
    {
      in: "query",
      name: "chosenFiveTensAndNineId",
      schema: {
        type: "string",
        example: "242",
      },
      description: "The chosen Five Tens and Nine Pattern ID.",
      required: true,
    },
    {
      in: "query",
      name: "chosenOddEvenPatternId",
      schema: {
        type: "string",
        example: "2",
      },
      description: "The chosen Odd Even Pattern ID.",
      required: true,
    },
    {
      in: "query",
      name: "n1",
      schema: {
        type: "string",
        example: "4",
      },
      description: "First number.",
    },
    {
      in: "query",
      name: "n2",
      schema: {
        type: "string",
        example: "4",
      },
      description: "Second number.",
    },
    {
      in: "query",
      name: "n3",
      schema: {
        type: "string",
        example: "9",
      },
      description: "Third number.",
    },
    {
      in: "query",
      name: "n4",
      schema: {
        type: "string",
        example: "4",
      },
      description: "Fourth number.",
    },
    {
      in: "query",
      name: "n5",
      schema: {
        type: "string",
        example: "2",
      },
      description: "Fifth number.",
    },
    {
      in: "query",
      name: "n6",
      schema: {
        type: "string",
        example: "3",
      },
      description: "Sixth number.",
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "array",
                  items: {
                    type: "integer",
                  },
                },
              },
              combination: {
                type: "integer",
              },
            },
          },
          example: {
            data: [[12, 16], [16], [18], [32], [34, 38, 40], [39]],
            combination: 2,
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const getDetailsOfLine = {
  tags: ["Engine Section 3"],
  summary: "Get Details of Line",
  description: "Retrieve pattern choices from the provided line of numbers.",
  parameters: [
    {
      in: "query",
      name: "line",
      schema: {
        type: "string",
        example: "12 16 18 32 34 39",
      },
      description: "The line of numbers separated by spaces.",
      required: true,
    },
  ],
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "object",
                additionalProperties: {
                  type: "string",
                },
              },
            },
          },
          example: {
            data: {
              oddEvenPatternId: 2,
              fiveTensAndNinePatternId: 242,
              multipleTypeChoice: ["4", "4", "9", "4", "2", "3"],
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Missing required parameters",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              error: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const engineMainGrid = {
  "/api/v1/engine/getAllThirtyTwentyNinePattern": {
    get: getAllThirtyTwentyNinePattern,
  },
  "/api/v1/engine/getOddEvenPattern": {
    get: getOddEvenPattern,
  },
  "/api/v1/engine/getFiveTensAndNinePattern": {
    get: getFiveTensAndNinePattern,
  },
  "/api/v1/engine/getMainGrid": {
    get: getMainGrid,
  },
  "/api/v1/engine/getPossibleMultiTypes": {
    get: getPossibleMultiTypes,
  },
  "/api/v1/engine/getMultiTypeGrid": {
    get: getMultiTypeGrid,
  },
  "/api/v1/engine/getDetailsOfLine": {
    get: getDetailsOfLine,
  },
};

module.exports = engineMainGrid;
