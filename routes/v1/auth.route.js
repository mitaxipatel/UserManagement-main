const express = require('express')
const validate = require('../../src/middlewares/validate')
const authValidation = require('../../src/validations/auth.validation')
const authController = require('../../src/controllers/auth.controllers')

const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)
router.post('/logout', authController.logout)

module.exports = router
