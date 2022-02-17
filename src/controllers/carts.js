const model = require("../models/index");
const response = require("../helper/response");

const createCart = async (req, res) => {
  const { products } = req.body;
  console.log(products);
  try {
    await Promise.all(
      products.map((product) => {
        return model.carts.create({
          product_id: product.product_id,
          user_id: product.user_id,
          quantity: product.quantity,
          total_price: product.total_price,
        });
      })
    );
    return response(res, {
      data: products,
      status: 200,
      message: "create payment succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};
const getCartByUserId = async (req, res) => {
  const { id } = req.userInfo;
  try {
    const result = await model.carts.findAll({
      whare: {
        user_id: id,
      },
      include: {
        model: model.products,
        as: "product",
        attributes: ['name', 'price'],
        include:[{
            model:model.image_products,
            as:"image",
            attributes: ['image'],
        }]
      },
    });
    return response(res, {
      status: 200,
      data: result,
      message: "get cart by user id success",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};
const getCartCountByUserId = async (req, res) => {
    const {id}= req.userInfo
    try {
        const result = await model.carts.count({
            where:{
                user_id:id
            }
        })
        return response(res, {
            status: 200,
            data: result,
            message: "get count cart by user id success",
          });
    } catch (error) {
        return response(res, {
            status: 500,
            message: "Terjadi Error",
            error,
          });
    }
}

module.exports = { createCart, getCartByUserId,getCartCountByUserId };
