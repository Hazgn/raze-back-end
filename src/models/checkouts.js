'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class checkouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  checkouts.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    status_order: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'checkouts',
  });
  return checkouts;
};