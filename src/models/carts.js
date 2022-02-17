'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      carts.hasMany(models.products, {
        sourceKey: 'product_id',
        foreignKey: 'id',
        as: 'product'
      })
    }
  }
  carts.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    checkout_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'carts',
  });
  return carts;
};