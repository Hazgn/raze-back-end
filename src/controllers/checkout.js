const model = require("../models/index");
const response = require("../helper/response");
const midtransClient = require("midtrans-client");
const dayjs = require("dayjs");

let coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.SERVER_KEY_MIDTRANS,
  clientKey: process.env.CLIENT_KEY_MIDTRANS,
});

const paymentMidtrans = async (total_price, bank, payment_id) => {
  const parameter = {
    payment_type: "bank_transfer",
    transaction_details: {
      gross_amount: parseInt(total_price),
      order_id: payment_id,
    },
    bank_transfer: {
      bank: bank,
    },
  };
  return await coreApi.charge(parameter);
};

const createCheckout = async (req, res) => {
  const { id } = req.userInfo;
  const { cart, total_price, bank, adress, phone, name_user } = req.body;
  console.log(id, cart);
  const payment_id = `RAZZ-PAYMENT-${dayjs().format("YYm-mss-DD")}`;
  try {
    for (const item of cart) {
        const cekStock = await model.products.findOne({
            where: { id: item.product_id },
          });
          console.log(cekStock);
          const stock = cekStock.dataValues.stock;
          const updateStock = stock - item.quantity;
          if(updateStock<0){
            return response(res, {
                status: 400,
                message: "silahkan cek stock kembali",
              });
        }
    }
    
    

    await Promise.all(
      cart.map(async (item) => {
        await model.checkouts.create({
          user_id: id,
          product_id: item.product_id,
          total_price: item.total_price,
          adress,
          phone,
          name_user,
          quantity: item.quantity,
          order_id: `RAZZ-${dayjs().format('YYm-mss-DD')}-${item.product_id}`,
          payment_id
        });
      })
    );
    await Promise.all(
        cart.map(async (item) => {
            const cekStock = await model.products.findOne({
                where: { id: item.product_id },
              });
              const stock = cekStock.dataValues.stock;
              const updateStock = stock - item.quantity;
              const result = await model.products.update(
                { stock: updateStock },
                { where: { id: item.product_id } }
              );
            console.log(result);
        }))
        const resMidtrans = await paymentMidtrans(total_price, bank, payment_id);
  
    return response(res, {
      data: resMidtrans,
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

const getCheckoutByUserId = async (req, res) => {
  const { id } = req.userInfo;
  try {
    const result = await model.checkouts.findAll({
      where: { user_id: id },
      include: {
        model: model.products,
        as: "product",
        attributes: ["name", "price"],
        include: [
          {
            model: model.image_products,
            as: "image",
            attributes: ["image"],
          },
        ],
      },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "get checkout by id succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const getCheckoutById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await model.checkouts.findOne({
      where: { id: id },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "get checkout by id succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};

const handleMidtrans = async (req, res) => {
  const { order_id, transaction_status } = req.body;
  try {
    const result = await model.checkouts.update(
      { 
        status_order: transaction_status,
        shipping_status:"Process"
       },
      { where: { payment_id: order_id } }
    );
    return response(res, {
      data: result,
      status: 200,
      message: "get checkout by id succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
};
const getCheckoutBySeller = async (req, res) => {
  const {id}= req.userInfo
  try {
    const result = await model.checkouts.findAll({
      
      include: {
        model: model.products,
        as: "product",
        attributes: ["name", "price"],
        where: { user_id: id },
        include: [
          {
            model: model.image_products,
            as: "image",
            attributes: ["image"],
          },
        ],
      },
    });
    return response(res, {
      data: result,
      status: 200,
      message: "get checkout by id succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
}

const updateCheckout = async (req, res) => {
  const { checkoutId } = req.params;
  const body = req.body
  console.log(body);
  try {
    await model.checkouts.update(body,{where:{id:checkoutId}})
    return response(res, {
      status: 200,
      message: "update checkout by seller succes",
    });
  } catch (error) {
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
}

const getOrderTracking = async (req,res) =>{
  const {  tracking } = req.params;
  console.log(tracking);
  try {
    const result = await model.checkouts.findOne({where:{order_id:tracking}})
    return response(res, {
      data : result,
      status: 200,
      message: "update checkout by seller succes",
    });
  } catch (error) {
    console.log(error);
    return response(res, {
      status: 500,
      message: "Terjadi Error",
      error,
    });
  }
}

module.exports = { createCheckout, getCheckoutByUserId, handleMidtrans,getCheckoutBySeller,updateCheckout,getOrderTracking,getCheckoutById };
