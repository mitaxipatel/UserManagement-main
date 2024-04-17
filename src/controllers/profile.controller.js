const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const ApiSuccessResponse = require('../utils/apiResponse')
const { profileService } = require('../service')
// const UserResponseAdapter = require('../utils/adapter/UserResponse')

const userInfo = catchAsync(async (req, res) => {
    const data = await profileService.userInfo(req)
    res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'User Retrieved successfully'))
})

const changePassword = catchAsync(async (req, res) => {
    const data = await profileService.changePassword(req)
    res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Password changed successfully'))
})

const updateUserInfo = catchAsync(async (req, res) => {
    const data = await profileService.updateUserInfo(req)
    res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'Profile updated successfully'))
})

module.exports = {
    userInfo,
    changePassword,
    updateUserInfo
}
