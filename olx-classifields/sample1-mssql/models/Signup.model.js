const  SEQUELIZE= require("sequelize");
const  sequelize= require("../utils/database");

const rawDataOne = sequelize.define("userData", {
  id:{
    type:SEQUELIZE.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  email: {
    type: SEQUELIZE.STRING,
    unique: true
  },
  username: {
    type: SEQUELIZE.TEXT,
    unique: true
  },
  password: {
    type: SEQUELIZE.TEXT,
  },
 
});

module.exports = rawDataOne;
