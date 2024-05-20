require("pg").defaults.parseInt8 = true;
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const database = require("../config/setting");
const databaseInstance = {};
const basename = path.basename(__filename);

let sequelize;
if (database) {
  sequelize = new Sequelize(database);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    databaseInstance[model.name] = model;
  });

Object.keys(databaseInstance).forEach((modelName) => {
  if (databaseInstance[modelName].associate) {
    databaseInstance[modelName].associate(databaseInstance);
  }
});

databaseInstance.sequelize = sequelize;
databaseInstance.Sequelize = Sequelize;
// databaseInstance.checkConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.log("Unable to connect to the database:", error);
//   }
// };
// databaseInstance.checkConnection = async () => {
//   await sequelize.close();
// };
module.exports = databaseInstance;
