const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))
const { password } = require('./coustom.validation')

const register = {
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().required(),
        password: Joi.string().required().custom(password),
        confirmPassword: Joi.string().required().custom(password),
        userType: Joi.string().required()
    })
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = {
    register,
    login
}
