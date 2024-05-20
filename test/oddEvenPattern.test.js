const lottoEnginService = require("../src/services/lottoEngineServices");
const PatternOddEven = require("../src/database/models").pattern_odd_even;

test("getOddEvenPattern with firstNumberType is odd", async () => {
  const expectedData = {
    33: [1, 1, 1, 1, 1, 1],
    34: [1, 1, 1, 1, 1, 2],
    35: [1, 1, 1, 1, 2, 1],
    36: [1, 1, 1, 2, 1, 1],
    37: [1, 1, 2, 1, 1, 1],
    38: [1, 2, 1, 1, 1, 1],
    39: [1, 1, 1, 1, 2, 2],
    40: [1, 1, 1, 2, 1, 2],
    41: [1, 1, 2, 1, 1, 2],
    42: [1, 2, 1, 1, 1, 2],
    43: [1, 1, 1, 2, 2, 1],
    44: [1, 1, 2, 1, 2, 1],
    45: [1, 2, 1, 1, 2, 1],
    46: [1, 1, 2, 2, 1, 1],
    47: [1, 2, 1, 2, 1, 1],
    48: [1, 2, 2, 1, 1, 1],
    49: [1, 1, 1, 2, 2, 2],
    50: [1, 1, 2, 1, 2, 2],
    51: [1, 2, 1, 1, 2, 2],
    52: [1, 1, 2, 2, 1, 2],
    53: [1, 2, 1, 2, 1, 2],
    54: [1, 2, 2, 1, 1, 2],
    55: [1, 1, 2, 2, 2, 1],
    56: [1, 2, 1, 2, 2, 1],
    57: [1, 2, 2, 1, 2, 1],
    58: [1, 2, 2, 2, 1, 1],
    59: [1, 1, 2, 2, 2, 2],
    60: [1, 2, 1, 2, 2, 2],
    61: [1, 2, 2, 1, 2, 2],
    62: [1, 2, 2, 2, 1, 2],
    63: [1, 2, 2, 2, 2, 1],
    64: [1, 2, 2, 2, 2, 2],
  };
  const query = { firstNumberType: 1 };
  const data = await lottoEnginService.getOddEvenPattern(query);
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getOddEvenPattern with both firstNumberType is odd and countOfEvenNumber is 3", async () => {
  const expectedData = {
    49: [1, 1, 1, 2, 2, 2],
    50: [1, 1, 2, 1, 2, 2],
    51: [1, 2, 1, 1, 2, 2],
    52: [1, 1, 2, 2, 1, 2],
    53: [1, 2, 1, 2, 1, 2],
    54: [1, 2, 2, 1, 1, 2],
    55: [1, 1, 2, 2, 2, 1],
    56: [1, 2, 1, 2, 2, 1],
    57: [1, 2, 2, 1, 2, 1],
    58: [1, 2, 2, 2, 1, 1],
  };

  const query = { firstNumberType: 1, countOfEvenNumber: 3 };
  const data = await lottoEnginService.getOddEvenPattern(query);
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getOddEvenPattern with countOfEvenNumber is 3", async () => {
  const expectedData = {
    17: [2, 2, 2, 1, 1, 1],
    18: [2, 2, 1, 2, 1, 1],
    19: [2, 1, 2, 2, 1, 1],
    20: [2, 2, 1, 1, 2, 1],
    21: [2, 1, 2, 1, 2, 1],
    22: [2, 1, 1, 2, 2, 1],
    23: [2, 2, 1, 1, 1, 2],
    24: [2, 1, 2, 1, 1, 2],
    25: [2, 1, 1, 2, 1, 2],
    26: [2, 1, 1, 1, 2, 2],
    49: [1, 1, 1, 2, 2, 2],
    50: [1, 1, 2, 1, 2, 2],
    51: [1, 2, 1, 1, 2, 2],
    52: [1, 1, 2, 2, 1, 2],
    53: [1, 2, 1, 2, 1, 2],
    54: [1, 2, 2, 1, 1, 2],
    55: [1, 1, 2, 2, 2, 1],
    56: [1, 2, 1, 2, 2, 1],
    57: [1, 2, 2, 1, 2, 1],
    58: [1, 2, 2, 2, 1, 1],
  };
  const query = { countOfEvenNumber: 3 };
  const data = await lottoEnginService.getOddEvenPattern(query);
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getOddEvenPattern with no query parameters", async () => {
  const expectedData = {
    1: [2, 2, 2, 2, 2, 2],
    2: [2, 2, 2, 2, 2, 1],
    3: [2, 2, 2, 2, 1, 2],
    4: [2, 2, 2, 1, 2, 2],
    5: [2, 2, 1, 2, 2, 2],
    6: [2, 1, 2, 2, 2, 2],
    7: [2, 2, 2, 2, 1, 1],
    8: [2, 2, 2, 1, 2, 1],
    9: [2, 2, 1, 2, 2, 1],
    10: [2, 1, 2, 2, 2, 1],
    11: [2, 2, 2, 1, 1, 2],
    12: [2, 2, 1, 2, 1, 2],
    13: [2, 1, 2, 2, 1, 2],
    14: [2, 2, 1, 1, 2, 2],
    15: [2, 1, 2, 1, 2, 2],
    16: [2, 1, 1, 2, 2, 2],
    17: [2, 2, 2, 1, 1, 1],
    18: [2, 2, 1, 2, 1, 1],
    19: [2, 1, 2, 2, 1, 1],
    20: [2, 2, 1, 1, 2, 1],
    21: [2, 1, 2, 1, 2, 1],
    22: [2, 1, 1, 2, 2, 1],
    23: [2, 2, 1, 1, 1, 2],
    24: [2, 1, 2, 1, 1, 2],
    25: [2, 1, 1, 2, 1, 2],
    26: [2, 1, 1, 1, 2, 2],
    27: [2, 2, 1, 1, 1, 1],
    28: [2, 1, 2, 1, 1, 1],
    29: [2, 1, 1, 2, 1, 1],
    30: [2, 1, 1, 1, 2, 1],
    31: [2, 1, 1, 1, 1, 2],
    32: [2, 1, 1, 1, 1, 1],
    33: [1, 1, 1, 1, 1, 1],
    34: [1, 1, 1, 1, 1, 2],
    35: [1, 1, 1, 1, 2, 1],
    36: [1, 1, 1, 2, 1, 1],
    37: [1, 1, 2, 1, 1, 1],
    38: [1, 2, 1, 1, 1, 1],
    39: [1, 1, 1, 1, 2, 2],
    40: [1, 1, 1, 2, 1, 2],
    41: [1, 1, 2, 1, 1, 2],
    42: [1, 2, 1, 1, 1, 2],
    43: [1, 1, 1, 2, 2, 1],
    44: [1, 1, 2, 1, 2, 1],
    45: [1, 2, 1, 1, 2, 1],
    46: [1, 1, 2, 2, 1, 1],
    47: [1, 2, 1, 2, 1, 1],
    48: [1, 2, 2, 1, 1, 1],
    49: [1, 1, 1, 2, 2, 2],
    50: [1, 1, 2, 1, 2, 2],
    51: [1, 2, 1, 1, 2, 2],
    52: [1, 1, 2, 2, 1, 2],
    53: [1, 2, 1, 2, 1, 2],
    54: [1, 2, 2, 1, 1, 2],
    55: [1, 1, 2, 2, 2, 1],
    56: [1, 2, 1, 2, 2, 1],
    57: [1, 2, 2, 1, 2, 1],
    58: [1, 2, 2, 2, 1, 1],
    59: [1, 1, 2, 2, 2, 2],
    60: [1, 2, 1, 2, 2, 2],
    61: [1, 2, 2, 1, 2, 2],
    62: [1, 2, 2, 2, 1, 2],
    63: [1, 2, 2, 2, 2, 1],
    64: [1, 2, 2, 2, 2, 2],
  };
  const data = await lottoEnginService.getOddEvenPattern({});
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getOddEvenPattern with invalid parameters", async () => {
  const query = { firstNumberType: 4, countOfEvenNumber: 3 };
  const data = await lottoEnginService.getOddEvenPattern(query);
  expect(data).toEqual({ status: false, message: "No result found" });
});

test("getOddEvenPatternById chosenOddEvenPatternId is 1", async () => {
  const query = { chosenOddEvenPatternId: 1 };
  const data = await lottoEnginService.getOddEvenPatternById(query);
  expect(data).toEqual({ status: true, data: [2, 2, 2, 2, 2, 2] });
});

test("getOddEvenPatternById invalid chosenOddEvenPatternId is 65", async () => {
  const query = { chosenOddEvenPatternId: 68 };
  const data = await lottoEnginService.getOddEvenPatternById(query);
  expect(data).toEqual({ status: false, message: "Invalid pattern id" });
});

test("getOddEvenPatternById without parameter", async () => {
  const data = await lottoEnginService.getOddEvenPatternById();
  expect(data).toEqual({
    status: false,
    message: "Odd Even Pattern is required",
  });
});

test("getOddEvenPatternIdFromPattern without pattern", async () => {
  const result = await lottoEnginService.getOddEvenPatternIdFromPattern();

  expect(result).toEqual({
    status: false,
    message: "Invalid Pattern",
  });
});

test("getOddEvenPatternIdFromPattern with wrong pattern [2, 0, 1, 0, 3, 0]", async () => {
  const query = [2, 0, 1, 0, 3, 0];
  const result = await lottoEnginService.getOddEvenPatternIdFromPattern(query);

  expect(result).toEqual({
    status: false,
    message: "Could not fetch Odd even pattern Id",
  });
});

test("getOddEvenPattern to handles error on exceptions", async () => {
  jest
    .spyOn(PatternOddEven, "findAll")
    .mockRejectedValue(new Error("Database error"));

  const query = { firstNumberType: 2, countOfEvenNumber: 3 };
  const result = await lottoEnginService.getOddEvenPattern(query);

  expect(result).toEqual({
    status: false,
    message: "Error fetching odd even pattern",
  });
});

test("getOddEvenPatternById to handles error on exceptions", async () => {
  jest
    .spyOn(PatternOddEven, "findOne")
    .mockRejectedValue(new Error("Database error"));

  const query = { chosenOddEvenPatternId: 66 };
  const result = await lottoEnginService.getOddEvenPatternById(query);

  expect(result).toEqual({
    status: false,
    message: "Error fetching odd even pattern by id",
  });
});

test("getOddEvenPatternIdFromPattern to handles error on exceptions", async () => {
  jest
    .spyOn(PatternOddEven, "findOne")
    .mockRejectedValue(new Error("Database error"));

  const query = [2, 0, 1, 0, 3, 0];
  const result = await lottoEnginService.getOddEvenPatternIdFromPattern(query);

  expect(result).toEqual({
    status: false,
    message: "Error fetching pattern id from odd even pattern",
  });
});
