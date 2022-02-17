const model = require("../models/index");
const response = require("../helper/response");

const createProduct = async (req, res) => {
  const { id } = req.userInfo;
  const image = req.files;
  const body = { ...req.body, user_id: id };
  console.log(body);
  body.image = undefined;
  let dataImg = [];
  if (image) {
    for (let i = 0; i < image.length; i++) {
      dataImg.push(image[i].filename);
    }
  }
  //   const body = {
  //       name:name,
  //       price:parseInt(price),
  //       stock:parseInt(stock),
  //       condition,
  //       category

  //   }
  // price = parseInt(price);
  try {
    const result = await model.products.create(body);
    if (dataImg.length > 0) {
      console.log(dataImg);
      await Promise.all(
        dataImg.map(async (item) => {
          const url = `${process.env.IMAGE_HOST}${[item]}`;
          // ? `${process.env.IMAGE_HOST}${dataImg[item]}`
          // : null;
          return await model.image_products.create({
            product_id: result.id,
            image: url,
          });
        })
      );
    }
    return response(res, {
      data: result,
      status: 200,
      message: "create product success",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      massage: "Terjadi Error",
      error,
    });
  }
};


const getAllProduct= async (req, res) => {
  try {
    const result = await model.products.findAll({
      include: [
        {
          model: model.image_products,
          as: "image",
        },
      ],
    });
    return response(res, {
      data: result,
      status: 200,
      message: "get product by id succes",
    });
    
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }

}


const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await model.products.findOne({
      where: {
        id: productId,
      },
      include: [
        {
          model: model.image_products,
          as: "image",
        },
      ],
    });
    return response(res, {
      data: result,
      status: 200,
      message: "get product by id succes",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.userInfo;
  const { productId } = req.params;
  const image = req.files;
  const body = req.body;
  body.image = undefined;
  let dataImg = [];
  if (image) {
    for (let i = 0; i < image.length; i++) {
      dataImg.push(image[i].filename);
    }
  }
  try {
    const cekId = await model.products.findOne({
      where: {
        id: productId,
      },
    });
    console.log("dimana", cekId.dataValues.user_id);
    if (cekId.dataValues.user_id !== id)
      return response(res, {
        data: null,
        status: 400,
        message: "bukan product anda",
      });
    await model.products.update(body, {
      where: {
        id: productId,
      },
    });
    if (dataImg.length > 0) {
      console.log(dataImg);
      await model.image_products.destroy({ where: { product_id: productId } });
      await Promise.all(
        dataImg.map(async (item) => {
          const url = `${process.env.IMAGE_HOST}${[item]}`;
          return await model.image_products.create({
            product_id: productId,
            image: url,
          });
        })
      );
    }
    return response(res, {
      data: null,
      status: 200,
      message: "get product by id succes",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const deleteById = async (req, res) => {
  const {id} = req.userInfo
  const { productId } = req.params;
  try {
    const cekId = await model.products.findOne({
      where: {
        id: productId,
      },
    });
    console.log("dimana", cekId.dataValues.user_id);
    if (cekId.dataValues.user_id !== id)
      return response(res, {
        data: null,
        status: 400,
        message: "bukan product anda",
      });
    const result = await model.products.destroy({
      where: {
        id: productId,
      },
    });
    await model.image_products.destroy({ where: { product_id: productId } });
    return response(res, {
      data: result,
      status: 200,
      message: "delete product by id succes",
    });
    // httpResponse(res, await services.createUser(req.body));
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

module.exports = { createProduct, getProductById, updateProduct, deleteById, getAllProduct };
