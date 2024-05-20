const lottoEnginService = require("../src/services/lottoEngineServices");

test("getPatternChoicesFromLine line is an array [2, 6, 10, 24, 36, 47]", async () => {
  const query = { line: [2, 6, 10, 24, 36, 47] };
  const data = await lottoEnginService.getPatternChoicesFromLine(query);
  expect(data).toEqual({
    status: true,
    data: {
      oddEvenPatternId: 63,
      fiveTensAndNinePatternId: 105,
      multipleTypeChoice: ["1", "4", "2", "4", "9", "1"],
    },
  });
});

test("getPatternChoicesFromLine line is string 2 6 10 24 36 47", async () => {
  const query = { line: "2 6 10 24 36 47" };
  const data = await lottoEnginService.getPatternChoicesFromLine(query);
  expect(data).toEqual({
    status: true,
    data: {
      oddEvenPatternId: 63,
      fiveTensAndNinePatternId: 105,
      multipleTypeChoice: ["1", "4", "2", "4", "9", "1"],
    },
  });
});

test("getPatternChoicesFromLine line is an array [12, 16, 20, 34, 46, 57]", async () => {
  const query = { line: [12, 16, 20, 34, 46, 57] };
  const data = await lottoEnginService.getPatternChoicesFromLine(query);
  expect(data).toEqual({
    status: true,
    data: {
      oddEvenPatternId: 2,
      fiveTensAndNinePatternId: 246,
      multipleTypeChoice: ["4", "4", "2", "2", "2", "3"],
    },
  });
});

test("getPatternChoicesFromLine line is null or empty array", async () => {
  const query = { line: "" };
  const data = await lottoEnginService.getPatternChoicesFromLine(query);
  expect(data).toEqual({ status: false, message: "Line parameter is missing" });
});

test("getPatternChoicesFromLine to handles error on exceptions", async () => {
  const query = { line: [12, 16, 20, 34, 46, 100] };
  const data = await lottoEnginService.getPatternChoicesFromLine(query);
  expect(data).toEqual({
    status: false,
    message: "Error getting pattern from the given line",
  });
});
