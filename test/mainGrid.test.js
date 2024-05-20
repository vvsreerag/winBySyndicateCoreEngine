const lottoEnginService = require("../src/services/lottoEngineServices");

test("getMainGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 2, 1, 2, 1, 2, 2 ]", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [2, 1, 2, 1, 2, 2],
  };
  const data = await lottoEnginService.getMainGrid(query);
  expect(data).toEqual({
    status: true,
    data: [
      [4, 6, 8, 10],
      [5, 7, 9],
      [22, 24, 26, 28, 30],
      [23, 25, 27, 29],
      [24, 26, 28, 30],
      [26, 28, 30],
    ],
  });
});

test("getMainGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ] and chosenOddEvenPattern is [ 2, 1, 2, 1, 2, 2 ]", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [1, 1, 1, 2, 2, 2],
  };
  const data = await lottoEnginService.getMainGrid(query);
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

test("getMainGrid numberBelongsToWhichColumn is an array [ 1, 1, 1, 1, 1, 2 ] and chosenOddEvenPattern is [ 2, 2, 2, 2, 2, 1 ]", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 1, 1, 1, 2],
    chosenOddEvenPattern: [2, 2, 2, 2, 2, 1],
  };
  const data = await lottoEnginService.getMainGrid(query);
  expect(data).toEqual({
    status: false,
    message: "Wrong input to generate the MainGrid",
  });
});

test("getMainGrid numberBelongsToWhichColumn is an array [ 1, 1, 3, 3, 3, 3 ]", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
  };
  const data = await lottoEnginService.getMainGrid(query);
  expect(data).toEqual({
    status: false,
    message: "Missing required parameters",
  });
});

test("getMainGrid without any arguments", async () => {
  const data = await lottoEnginService.getMainGrid();
  expect(data).toEqual({
    status: false,
    message: "Missing required parameters",
  });
});

test("getMainGrid to handles error on exceptions", async () => {
  const query = {
    numberBelongsToWhichColumn: [1, 1, 3, 3, 3, 3],
    chosenOddEvenPattern: [3, 1, 1, 2, 2, 2],
  };
  const data = await lottoEnginService.getMainGrid(query);
  expect(data).toEqual({
    status: false,
    message: "Error generating Main Grid",
  });
});
