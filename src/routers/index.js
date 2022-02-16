const express = require("express")
const mainRouter = express.Router()
const authRouter = require('./auth')
const userRouter = require('./users')
// const productRouter = require('./product.js')
// const paymentRouter = require('./payment.js')
// const testimonieRouter = require('./testimonie.js')
// const promoRouter = require('./promo.js')
// const historyRouter = require('./history.js')

mainRouter.use('/auth', authRouter)
// mainRouter.use('/payment',paymentRouter)
mainRouter.use('/user', userRouter)
// mainRouter.use('/product', productRouter)
// mainRouter.use('/testimonie', testimonieRouter)
// mainRouter.use('/promo', promoRouter)
// mainRouter.use('/history',historyRouter)

module.exports = mainRouter