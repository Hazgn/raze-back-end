'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class white_list_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  white_list_tokens.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'white_list_tokens',
  });
  return white_list_tokens;
};