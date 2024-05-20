const lottoEnginService = require("../src/services/lottoEngineServices");

test("getAllPossibleMultiplierTypeForEachRow numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 1, 1, 1, 2, 2, 2 ]", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
  };
  const data = await lottoEnginService.getAllPossibleMultiplierTypeForEachRow(
    query
  );
  expect(data).toEqual({
    status: true,
    data: [
      ["1", "3"],
      ["1", "3"],
      ["1", "3", "5"],
      ["2", "4", "7"],
      ["2", "4", "7"],
      ["2", "7"],
    ],
  });
});

test("getAllPossibleMultiplierTypeForEachRow with missing parameters", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
  };
  const data = await lottoEnginService.getAllPossibleMultiplierTypeForEachRow(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Missing required parameters",
  });
});

test("getAllPossibleMultiplierTypeForEachRow to handles error on exceptions", async () => {
  const query = {
    chosenOddEvenPattern: [1, 1, 5, 2, 2, 2],
    numberBelongsToWhichColumn: [5, 1, 3, 3, 3, 3],
  };
  const data = await lottoEnginService.getAllPossibleMultiplierTypeForEachRow(
    query
  );
  expect(data).toEqual({
    status: false,
    message: "Error generating possibilities of Multiplier types for Each Rows",
  });
});

// service to generate MultiType grid

test("getMultiTypeGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 1, 1, 1, 2, 2, 2 ] with passing any multi type", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
  };
  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: true,
    data: [
      [1, 2, 3, 5, 7, 9],
      [2, 3, 5, 7, 9],
      [21, 23, 25, 27, 29],
      [22, 24, 26, 28, 30],
      [24, 26, 28, 30],
      [26, 28, 30],
    ],
  });
});

test("getMultiTypeGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 1, 1, 1, 2, 2, 2 ] and n1 = 1, n2 = 1", async () => {
  const numbers = { n1: 1, n2: 1 };

  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
    numbers: numbers,
  };
  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: true,
    data: [
      [1, 2, 3, 5, 7],
      [2, 3, 5, 7],
      [21, 23, 25, 27, 29],
      [22, 24, 26, 28, 30],
      [24, 26, 28, 30],
      [26, 28, 30],
    ],
  });
});

test("getMultiTypeGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 1, 1, 1, 2, 2, 2 ] and n1 = 1, n2 = 3", async () => {
  const numbers = { n1: 1, n2: 3 };
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
    numbers: numbers,
  };

  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: true,
    data: [
      [1, 2, 3, 5, 7],
      [9],
      [21, 23, 25, 27, 29],
      [22, 24, 26, 28, 30],
      [24, 26, 28, 30],
      [26, 28, 30],
    ],
  });
});

test("getMultiTypeGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 1, 1, 1, 2, 2, 2 ] and n1 = 1, n2 = 3, n3 = 3", async () => {
  const numbers = { n1: 1, n2: 3, n3: 3 };
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
    numbers: numbers,
  };

  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: true,
    data: [[1, 2, 3, 5, 7], [9], [27], [28, 30], [30], []],
  });
});

test("getMultiTypeGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 1, 1, 1, 2, 2, 2 ] and n1 = 1, n2 = 3, n3 = 1, n4 = 4, n5 = 2, n6 =2", async () => {
  const numbers = { n1: 1, n2: 3, n3: 1, n4: 4, n5: 2, n6: 2 };
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
    numbers: numbers,
  };

  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: true,
    data: [[1, 2, 3, 5, 7], [9], [23, 29], [24], [26, 30], [30]],
  });
});

test("getMultiTypeGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and without chosenOddEvenPattern", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
  };
  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: false,
    message: "Missing required parameters",
  });
});

test("getMultiTypeGrid to handles error on exceptions", async () => {
  const numbers = { n1: 8, n2: 12, n3: 1, n4: 4, n5: 2, n6: 2 };
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
    numbers: numbers,
  };
  const data = await lottoEnginService.getMultiTypeGrid(query);
  expect(data).toEqual({
    status: false,
    message: "Error generating MultiType Grid",
  });
});
