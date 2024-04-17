const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))
const { password } = require('./coustom.validation')

const changePassword = {
    body: Joi.object().keys({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required(password)
    })
}

const updateUserInfo = {
    body: Joi.object().keys({
        email: Joi.string().email(),
        fullName: Joi.string(),
        mobile: Joi.string()
    })
}

module.exports = {
    changePassword,
    updateUserInfo
}
