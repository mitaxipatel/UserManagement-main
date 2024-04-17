const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { activityLogService } = require('../service')
const ApiSuccessResponse = require('./../utils/apiResponse')

const list = catchAsync(async (req, res) => {
    const data = await activityLogService.list(req.user.id,req.query)
    res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'Activity Log listed successfully'))
})

module.exports = {
    list
}
