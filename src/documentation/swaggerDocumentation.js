const engineMainGrid = require("./allRoutes/engineMainGrid");
const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Lotto Engine",
    version: "1.0",
  },
  servers: [{ url: "http://localhost:2111", description: "Local DEV" }],
  tags: [
    {
      name: "Engine Section 1",
      description: "Engine to get First Grid",
    },
    {
      name: "Engine Section 2",
      description: "Engine to Set Multiplier Type in Grid",
    },
    {
      name: "Engine Section 3",
      description: "Engine to get Grids from Lines",
    },
  ],

  paths: {
    ...engineMainGrid,
  },
};

module.exports = swaggerDocumentation;
