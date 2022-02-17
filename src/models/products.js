'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.hasMany(models.image_products, {
        sourceKey: 'id',
        foreignKey: 'product_id',
        as: 'image'
      })
    }
  }
  products.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    condition: DataTypes.STRING,
    description: DataTypes.STRING,
    like: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    color: DataTypes.STRING,
    brand: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};