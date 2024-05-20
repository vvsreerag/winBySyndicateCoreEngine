const lottoEnginService = require("../src/services/lottoEngineServices");

test("getBucketRelatedToPattern chosenFiveTensAndNinePattern is an array  [2, 0, 4, 0, 0, 0]", async () => {
  const query = { chosenFiveTensAndNinePattern: [2, 0, 4, 0, 0, 0] };
  const data = await lottoEnginService.getBucketRelatedToPattern(query);
  expect(data).toEqual({ status: true, data: [1, 1, 3, 3, 3, 3] });
});

test("getBucketRelatedToPattern with no arguments", async () => {
  const data = await lottoEnginService.getBucketRelatedToPattern();
  expect(data).toEqual({
    status: false,
    message: "Five tens and nine pattern required",
  });
});
