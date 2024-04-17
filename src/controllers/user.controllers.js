const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { userService } = require('../service')
const ApiSuccessResponse = require('./../utils/apiResponse')

const createUser = catchAsync(async (req, res) => {
    const data = await userService.createUser({...req.body, parentUser: req.user.id})
    res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'User Created successfully'))
})

const listUser = catchAsync(async (req, res) => {
    const data = await userService.list(req.query, req.user)
    res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'User listed successfully'))
})

const updateUser = catchAsync(async (req, res) => {
    const data = await userService.updateUserById(req.params.id, req.body)
    res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'User Updated successfully'))
})

const deleteUser = catchAsync(async (req, res) => {
    const data = await userService.deleteUserById(req.params.id)
    res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'User Deleted successfully'))
})

module.exports = {
    createUser,
    listUser,
    updateUser,
    deleteUser,
}
