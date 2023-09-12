const SEQUILIZE = require("sequelize");

const Sequilize = new SEQUILIZE("application", "sa", "123456", {
  dialect: "mssql",
  host: "localhost",
  port: "1433", // Default port 53558
  logging: false, // disable logging; default: console.log
  dialectOptions: {
    requestTimeout: 30000, // timeout = 30 seconds
  },
});

module.exports = Sequilize;
