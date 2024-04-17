const httpStatus = require('http-status')
const { User } = require('../models')
const ApiError = require('../utils/ApiError')
const activityLogService = require('./activityLog.service')

const createUser = async (userBody) => {
    console.log("🚀 ~ createUser ~ userBody:", userBody)
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    if (userBody.userType === 'superadmin' && await User.superAdminExists()) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Super Admin Exists')
    }
    const user = new User(userBody)
    await user.save()
    await activityLogService.createActivityLog({ userId: user._id, message: "User Created Successfully" })
    return user
}

const list = async (query, user) => {
    const page = query.page
    const limit = query.limit
    const skip = (page -1) * limit
    const userList =  await User.find((user.userType !== 'superadmin' ? {parentUser: user.id} : {})).limit(limit).skip(skip)
    return {userList, page, limit, totalCount: await User.countDocuments((user.userType !== 'superadmin' ? {parentUser: user.id} : {}))}
}

const getUserById = async (id) => {
    return await User.findById(id)
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email })
}

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    Object.assign(user, updateBody)
    await user.save()
    await activityLogService.createActivityLog({ userId: user._id, message: "User Updated Successfully" })
    return user
}

const deleteUserById = async (userId) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    await User.deleteOne({_id: userId})
    await activityLogService.createActivityLog({ userId: user._id, message: "User Deleted Successfully" })
    return "User Deleted Successfully"
}

const currentPassword = async (userId, password) => {
    const document = await getUserById(userId)
    if (!document) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (!document || !(await document.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please enter the correct current password')
    }

    await activityLogService.createActivityLog({ userId: userId, message: "User Password got Metched Successfully" })


    return document
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    list,
    currentPassword
}
