const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/products')
const {checkToken} = require('../middlewares/auth')
const {checkRoleAdmin} = require('../middlewares/authorize')
const {fileUpload} = require('../middlewares/upload')

productRouter
    .post('/createproduct',checkToken,checkRoleAdmin,fileUpload,productController.createProduct)
    .patch('/:productId',checkToken,checkRoleAdmin,fileUpload,productController.updateProduct)
    .get("/getproductbyseler",checkToken,checkRoleAdmin,productController.getProductBySeller)
    .get('/:productId', productController.getProductById)
    .get('/',  productController.getAllProduct)
    .delete('/:productId',checkToken,checkRoleAdmin,  productController.deleteById)



module.exports = productRouter