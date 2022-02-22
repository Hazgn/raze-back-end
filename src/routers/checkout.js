const express = require('express')
const checkoutRouter = express.Router()
const checkoutController = require('./../controllers/checkout')
const {checkToken} = require('../middlewares/auth')

checkoutRouter
    .post('/createcheckout',checkToken,checkoutController.createCheckout)
    .post('/handlemidtrans',checkoutController.handleMidtrans)
    .get("/",checkToken,checkoutController.getCheckoutByUserId)
    .get("/checkoutseller",checkToken,checkoutController.getCheckoutBySeller)
    .patch("/:checkoutId",checkToken,checkoutController.updateCheckout)
    .get("/ordertracking",checkToken,checkoutController.getOrderTracking)
    // .get("/", checkToken,cartController.getCartByUserId) 
    // .get("/cartcount",checkToken,cartController.getCartCountByUserId)
    // .patch("/:cartId", checkToken,cartController.updateCart)
    // .patch('/:productId',checkToken,checkRoleAdmin,fileUpload,productController.updateProduct)
    // .get('/:productId', productController.getProductById)
    // // .get('/',  productController.getAllProduct)
    // .delete('/:productId',checkToken,checkRoleAdmin,  productController.deleteById)



module.exports = checkoutRouter