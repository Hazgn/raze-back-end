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
    static associate(models) {
      checkouts.hasMany(models.products, {
        sourceKey: 'product_id',
        foreignKey: 'id',
        as: 'product'
      })
    }
  }
  checkouts.init({
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    status_order: DataTypes.STRING,
    order_id: DataTypes.STRING,
    name_user:DataTypes.STRING,
    adress: DataTypes.STRING,
    phone:DataTypes.STRING,
    payment_id:DataTypes.STRING,
    shipping_status:DataTypes.STRING,
    quantity:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'checkouts',
  });
  return checkouts;
};