const express = require('express')
const auth = require("../../src/middlewares/auth");
const validate = require('../../src/middlewares/validate')
const userValidation = require('../../src/validations/user.validation.js')
const userController = require('../../src/controllers/user.controllers')

const router = express.Router()

router.post('/create-user', auth(), validate(userValidation.createUser), userController.createUser)
router.get('/list-user', auth(), userController.listUser)
router.patch('/update-user/:id', auth(), validate(userValidation.updateUser), userController.updateUser)
router.delete('/delete-user/:id', auth(), userController.deleteUser)

module.exports = router
