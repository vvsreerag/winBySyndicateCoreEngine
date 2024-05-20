const lottoEnginService = require("../src/services/lottoEngineServices");
const PatternFiveTensAndNine =
  require("../src/database/models").pattern_five_tens_nine;

test("getFiveTensAndNinePattern where chosenThirtyTwentyNinePattern  is 1", async () => {
  const expectedData = {
    1: [6, 0, 0, 0, 0, 0],
    2: [5, 1, 0, 0, 0, 0],
    3: [5, 0, 1, 0, 0, 0],
    4: [4, 2, 0, 0, 0, 0],
    5: [4, 1, 1, 0, 0, 0],
    6: [4, 0, 2, 0, 0, 0],
    7: [3, 3, 0, 0, 0, 0],
    8: [3, 2, 1, 0, 0, 0],
    9: [3, 1, 2, 0, 0, 0],
    10: [3, 0, 3, 0, 0, 0],
    11: [2, 4, 0, 0, 0, 0],
    12: [2, 3, 1, 0, 0, 0],
    13: [2, 2, 2, 0, 0, 0],
    14: [2, 1, 3, 0, 0, 0],
    15: [2, 0, 4, 0, 0, 0],
    16: [1, 5, 0, 0, 0, 0],
    17: [1, 4, 1, 0, 0, 0],
    18: [1, 3, 2, 0, 0, 0],
    19: [1, 2, 3, 0, 0, 0],
    20: [1, 1, 4, 0, 0, 0],
    21: [1, 0, 5, 0, 0, 0],
    22: [0, 6, 0, 0, 0, 0],
    23: [0, 5, 1, 0, 0, 0],
    24: [0, 4, 2, 0, 0, 0],
    25: [0, 3, 3, 0, 0, 0],
    26: [0, 2, 4, 0, 0, 0],
    27: [0, 1, 5, 0, 0, 0],
    28: [0, 0, 6, 0, 0, 0],
  };
  const query = {
    chosenThirtyTwentyNinePattern: 1,
  };
  const data = await lottoEnginService.getFiveTensAndNinePattern(query);
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getFiveTensAndNinePattern where chosenThirtyTwentyNinePattern is 1 and countOfNumberInFirstColumn is 2", async () => {
  const expectedData = {
    11: [2, 4, 0, 0, 0, 0],
    12: [2, 3, 1, 0, 0, 0],
    13: [2, 2, 2, 0, 0, 0],
    14: [2, 1, 3, 0, 0, 0],
    15: [2, 0, 4, 0, 0, 0],
  };

  const query = {
    chosenThirtyTwentyNinePattern: 1,
    countOfNumberInFirstColumn: 2,
  };
  const data = await lottoEnginService.getFiveTensAndNinePattern(query);
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getFiveTensAndNinePattern with out any arguments which should return null", async () => {
  const data = await lottoEnginService.getFiveTensAndNinePattern();
  expect(data).toEqual({
    status: false,
    message: "Missing required parameters",
  });
});

test("getFiveTensAndNinePattern with which should return null", async () => {
  const query = { chosenThirtyTwentyNinePattern: null };
  const data = await lottoEnginService.getFiveTensAndNinePattern(query);
  expect(data).toEqual({
    status: false,
    message: "A Pattern choice from thirty twentyNine Pattern is required",
  });
});

test("getFiveTensAndNinePattern with which should return null", async () => {
  const query = { chosenThirtyTwentyNinePattern: 9 };
  const data = await lottoEnginService.getFiveTensAndNinePattern(query);
  expect(data).toEqual({
    status: false,
    message: "Fetching failed invalid parameters",
  });
});

//Services to call combination of five tens and nine

test("getFiveTensAndNinePatternCombinations where chosenThirtyTwentyNinePattern  is 1", async () => {
  const expectedData = {
    1: [210],
    2: [2520],
    3: [2520],
    4: [9450],
    5: [21000],
    6: [9450],
    7: [14400],
    8: [54000],
    9: [54000],
    10: [14400],
    11: [9450],
    12: [54000],
    13: [91125],
    14: [54000],
    15: [9450],
    16: [2520],
    17: [21000],
    18: [54000],
    19: [54000],
    20: [21000],
    21: [2520],
    22: [210],
    23: [2520],
    24: [9450],
    25: [14400],
    26: [9450],
    27: [2520],
    28: [210],
  };
  const query = {
    chosenThirtyTwentyNinePattern: 1,
  };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinations(
    query
  );
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getFiveTensAndNinePatternCombinations where chosenThirtyTwentyNinePattern  is 1 and countOfNumberInFirstColumn is 2", async () => {
  const expectedData = {
    11: [9450],
    12: [54000],
    13: [91125],
    14: [54000],
    15: [9450],
  };

  const query = {
    chosenThirtyTwentyNinePattern: 1,
    countOfNumberInFirstColumn: 2,
  };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinations(
    query
  );
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getFiveTensAndNinePatternCombinations where chosenThirtyTwentyNinePattern  is null", async () => {
  const query = {
    chosenThirtyTwentyNinePattern: null,
  };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinations(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "A Pattern choice from thirty twentyNine Pattern is required",
  });
});

test("getFiveTensAndNinePatternCombinations where chosenThirtyTwentyNinePattern  is invalid", async () => {
  const query = {
    chosenThirtyTwentyNinePattern: 9,
  };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinations(
    query
  );
  expect(data).toEqual({
    status: false,
    message:
      "Invalid parameter to fetch five tens and nine pattern combinations",
  });
});

test("getFiveTensAndNinePatternCombinations with out any arguments which should return null", async () => {
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinations();
  expect(data).toEqual({
    message: "Missing required parameters",
    status: false,
  });
});

//Service to call a five tens and nine pattern by passing id

test("getFiveTensAndNinePatternById chosenFiveTensAndNineId is 15", async () => {
  const query = { chosenFiveTensAndNineId: 15 };
  const data = await lottoEnginService.getFiveTensAndNinePatternById(query);
  expect(data).toEqual({ status: true, data: [2, 0, 4, 0, 0, 0] });
});

test("getFiveTensAndNinePatternById chosenFiveTensAndNineId is null", async () => {
  const query = { chosenFiveTensAndNineId: null };
  const data = await lottoEnginService.getFiveTensAndNinePatternById(query);
  expect(data).toEqual({
    status: false,
    message: "Five tens and nine pattern id required",
  });
});

test("getFiveTensAndNinePatternById chosenFiveTensAndNineId is invalid", async () => {
  const query = { chosenFiveTensAndNineId: 500 };
  const data = await lottoEnginService.getFiveTensAndNinePatternById(query);
  expect(data).toEqual({
    status: false,
    message: "Invalid parameter Five tens and nine pattern could not be found",
  });
});

//Service to call a combination of five tens and nine pattern by passing id

test("getFiveTensAndNinePatternCombinationById chosenFiveTensAndNineId is 15", async () => {
  const query = { chosenFiveTensAndNineId: 15 };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinationById(
    query
  );
  expect(data).toEqual({ status: true, data: 9450 });
});

test("getFiveTensAndNinePatternCombinationById chosenFiveTensAndNineId is null", async () => {
  const query = { chosenFiveTensAndNineId: null };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinationById(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Five tens and nine pattern id required",
  });
});

test("getFiveTensAndNinePatternCombinationById chosenFiveTensAndNineId is invalid", async () => {
  const query = { chosenFiveTensAndNineId: 1500 };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinationById(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Invalid parameter Combination could not be found",
  });
});

// Service to get pattern id from a pattern
test("getFiveTensAndNinePatternIdFromPattern pattern is [2, 0, 1, 3, 0, 0]", async () => {
  const query = [2, 0, 1, 3, 0, 0];
  const data = await lottoEnginService.getFiveTensAndNinePatternIdFromPattern(
    query
  );
  expect(data).toEqual({ status: true, data: 202 });
});

test("getFiveTensAndNinePatternIdFromPattern pattern is null", async () => {
  const query = null;
  const data = await lottoEnginService.getFiveTensAndNinePatternIdFromPattern(
    query
  );
  expect(data).toEqual({ status: false, message: "Invalid Pattern" });
});

test("getFiveTensAndNinePatternIdFromPattern pattern is invalid input [6, 0, 1, 3, 0, 0]", async () => {
  const query = [6, 0, 1, 3, 0, 0];
  const data = await lottoEnginService.getFiveTensAndNinePatternIdFromPattern(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Invalid pattern could not fetch Odd even pattern Id",
  });
});

//Handle Exception Error

test("getFiveTensAndNinePattern to handles error on exceptions", async () => {
  jest
    .spyOn(PatternFiveTensAndNine, "findAll")
    .mockRejectedValue(new Error("Database error"));

  const query = {
    chosenThirtyTwentyNinePattern: 1,
    countOfNumberInFirstColumn: 2,
  };
  const result = await lottoEnginService.getFiveTensAndNinePattern(query);

  expect(result).toEqual({
    status: false,
    message: "Error fetching five tens and nine pattern",
  });
});

test("getFiveTensAndNinePatternCombinations to handles error on exceptions", async () => {
  jest
    .spyOn(PatternFiveTensAndNine, "findAll")
    .mockRejectedValue(new Error("Database error"));

  const query = {
    chosenThirtyTwentyNinePattern: 1,
    countOfNumberInFirstColumn: 2,
  };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinations(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Error fetching five tens and nine pattern combination",
  });
});

test("getFiveTensAndNinePatternById to handles error on exceptions", async () => {
  jest
    .spyOn(PatternFiveTensAndNine, "findOne")
    .mockRejectedValue(new Error("Database error"));
  const query = { chosenFiveTensAndNineId: 15 };
  const data = await lottoEnginService.getFiveTensAndNinePatternById(query);
  expect(data).toEqual({
    status: false,
    message: "Error fetching five tens and nine pattern by Id",
  });
});

test("getFiveTensAndNinePatternCombinationById to handles error on exceptions", async () => {
  jest
    .spyOn(PatternFiveTensAndNine, "findOne")
    .mockRejectedValue(new Error("Database error"));
  const query = { chosenFiveTensAndNineId: 15 };
  const data = await lottoEnginService.getFiveTensAndNinePatternCombinationById(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Error fetching five tens and nine pattern by Id",
  });
});

test("getFiveTensAndNinePatternIdFromPattern to handles error on exceptions", async () => {
  jest
    .spyOn(PatternFiveTensAndNine, "findOne")
    .mockRejectedValue(new Error("Database error"));
  const query = [2, 0, 1, 3, 0, 0];
  const data = await lottoEnginService.getFiveTensAndNinePatternIdFromPattern(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Error fetching pattern id from five tens and nine patterns",
  });
});
