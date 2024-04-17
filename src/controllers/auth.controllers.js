const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { authService } = require('../service')
const ApiSuccessResponse = require('./../utils/apiResponse')

const register = catchAsync(async (req, res) => {
    const data = await authService.registerUser(req.body)
    res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'User registered successfully'))
})

const login = catchAsync(async (req, res) => {
    const user = await authService.loginUserWithEmailAndPassword(req)
    res.send(user)
})

const logout = catchAsync(async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(new ApiErrorResponse(httpStatus.INTERNAL_SERVER_ERROR, 'Error occurred during logout'));
        }
        res.status(httpStatus.OK).send(new ApiSuccessResponse({}, httpStatus.OK, 'User logged out successfully'));
    });
});

module.exports = {
    register, login, logout
}
