const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const { password } = require('./coustom.validation')

const createUser = {
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().required(),
        password: Joi.string().required().custom(password),
        userType: Joi.string().required()
    }),
};

const updateUser = {
    body: Joi.object().keys({
        fullName: Joi.string(),
        email: Joi.string().email(),
        mobile: Joi.string(),
    }),
};

module.exports = {
    createUser,
    updateUser,
};
