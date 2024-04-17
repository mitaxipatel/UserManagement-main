const httpStatus = require('http-status')
const logger = require('../config/logger')
const ApiError = require('../utils/ApiError')
const path = require('path')
const fs = require('fs')
const { activityLogService } = require('../service')

const errorLogFilePath = path.join(__dirname, 'error.log')
const errorLogStream = fs.createWriteStream(errorLogFilePath, { flags: 'a' })

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new ApiError(statusCode, message, false, err.stack)
    }
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        error: true,
        success: false,
        stack: err.stack,
    }

    logger.error(err)

    errorLogStream.write(err.toString() + '\n')
    activityLogService.createActivityLog({ error: true, message: err.toString() + '\n' })

    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler
}
