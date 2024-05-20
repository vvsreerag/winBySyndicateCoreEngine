const lottoEnginService = require("../src/services/lottoEngineServices");
const PatternThirtyTwentyNine =
  require("../src/database/models").pattern_thirty_twentynine;

test("getThirtyTwentyNinePattern to get all patterns", async () => {
  const expectedData = {
    1: [6, 0],
    2: [5, 1],
    3: [4, 2],
    4: [3, 3],
    5: [2, 4],
    6: [1, 5],
    7: [0, 6],
  };
  const data = await lottoEnginService.getThirtyTwentyNinePattern();
  expect(data).toEqual({ status: true, data: expectedData });
});

test("getThirtyTwentyNinePattern returns status false and message for an empty response", async () => {
  jest.spyOn(PatternThirtyTwentyNine, "findAll").mockResolvedValue([]);

  const result = await lottoEnginService.getThirtyTwentyNinePattern();

  expect(result).toEqual({
    status: false,
    message: "Invalid: failed to fetch Thirty TwentyNine Pattern",
  });
});

test("getThirtyTwentyNinePattern to handles error on exceptions", async () => {
  jest
    .spyOn(PatternThirtyTwentyNine, "findAll")
    .mockRejectedValue(new Error("Some error occurred"));
  const result = await lottoEnginService.getThirtyTwentyNinePattern();
  expect(result).toEqual({
    status: false,
    message: "Error fetching Thirty TwentyNine pattern",
  });
});
