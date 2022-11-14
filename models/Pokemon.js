const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const pokemon = sequelize.define("pokemon", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
  ImgaUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },  
});

module.exports = pokemon;