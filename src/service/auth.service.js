const httpStatus = require('http-status')
const userService = require('./user.service')
const activityLogService = require('./activityLog.service')
const tokenService = require('./token.service')
const ApiError = require('../utils/ApiError')


const registerUser = async (body) => {
    const user = await userService.createUser(body)
    const tokens = await tokenService.generateAuthTokens(user.id)

    await activityLogService.createActivityLog({ userId: user._id, message: "User Registered In Successfully" })
    return { user, tokens }
}

const loginUserWithEmailAndPassword = async (req) => {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password')
    }
    const tokens = await tokenService.generateAuthTokens(user.id)

    await activityLogService.createActivityLog({ userId: user._id, message: "User Logged In Successfully" })
    return { user, tokens }
}

module.exports = {
    registerUser,
    loginUserWithEmailAndPassword
}