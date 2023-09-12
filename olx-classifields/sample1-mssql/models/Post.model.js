const  SEQUELIZE= require("sequelize");
const  sequelize= require("../utils/database");

const postData = sequelize.define("postdata", {
  id:{
    type:SEQUELIZE.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true
  },

  name: {
    type: SEQUELIZE.TEXT,
  },
  description: {
    type: SEQUELIZE.TEXT,
  },
  category: {
    type: SEQUELIZE.TEXT,
  },
  image: {
    type: SEQUELIZE.TEXT,
  },
  location: {
    type: SEQUELIZE.TEXT,
  },
  postedAt: {
    type: SEQUELIZE.STRING,
  },
  price: {
    type: SEQUELIZE.STRING,
  },
  signatureId:{
    type: SEQUELIZE.STRING||SEQUELIZE.INTEGER,
    primaryKey: true
  }

});

module.exports = postData;
