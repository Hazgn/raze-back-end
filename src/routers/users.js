const express = require('express')
const userRouter = express.Router()
const userController = require('./../controllers/users')
const auth = require('./../middlewares/auth')
const { fileUpload } = require('../middlewares/upload')

userRouter.get('/profile' , auth.checkToken , userController.userById)
userRouter.patch('/edit/password', auth.checkToken, userController.editPassword)
userRouter.patch('/edit', auth.checkToken, fileUpload, userController.editUser)

module.exports = userRouter