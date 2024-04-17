const express = require('express')
const auth = require('../../src/middlewares/auth')
const profileValidation = require('../../src/validations/profile.Validation')
const profileController = require('../../src/controllers/profile.controller')
const validate = require('../../src/middlewares/validate')

const router = express.Router()

router.get('/me', auth(), profileController.userInfo)
router.put('/change-password', auth(), validate(profileValidation.changePassword), profileController.changePassword)
router.patch('/update-info', auth(), validate(profileValidation.updateUserInfo), profileController.updateUserInfo)
module.exports = router
