const express = require('express')
const cartRouter = express.Router()
const cartController = require('./../controllers/carts')
const {checkToken} = require('../middlewares/auth')

cartRouter
    .post('/createcart',checkToken,cartController.createCart)
    .get("/", checkToken,cartController.getCartByUserId)
    .get("/cartcount",checkToken,cartController.getCartCountByUserId)
    .patch("/:cartId", checkToken,cartController.updateCart)
    // .patch('/:productId',checkToken,checkRoleAdmin,fileUpload,productController.updateProduct)
    // .get('/:productId', productController.getProductById)
    // // .get('/',  productController.getAllProduct)
    // .delete('/:productId',checkToken,checkRoleAdmin,  productController.deleteById)



module.exports = cartRouter