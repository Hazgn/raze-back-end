const express = require('express')
const authRouter = express.Router()
const authController = require('./../controllers/auth')
const { register, login } = require('./../middlewares/validate')
// const auth = require('../middlewares/auth')

authRouter.post('/signup', register, authController.register)
authRouter.post('/forgotpassword', authController.forgotPassword)
authRouter.post('/login', login, authController.login)
authRouter.post('/logout', authController.logout)
authRouter.post('/resetpassword', authController.resetPassword)

module.exports = authRouter