const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const pokemonType = sequelize.define("pokemonType", {
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
});

module.exports = pokemonType;