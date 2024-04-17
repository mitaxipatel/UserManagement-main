// const createError = require('http-errors')
const httpStatus = require('http-status')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
// const moment = require('moment')
const moment = require('moment-timezone')
const passport = require('passport')
const { jwtStrategy } = require('./src/config/passport')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const session = require('express-session')
const timeout = require('connect-timeout')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

const oneDay = 1000 * 60 * 60 * 24

const indexRouter = require('./routes/index')
const routes = require('./routes/v1')

const app = express()

const ApiError = require('./src/utils/ApiError')
const { errorConverter, errorHandler } = require('./src/middlewares/error')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
moment.tz.setDefault(process.env.TZ)

app.use(logger('dev'))

// Time out for all requests
app.use(timeout('1000s'))

// To limit request payload size
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

// To limit too many request from singal ip
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// parse json request
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// set security HTTP heades
app.use(helmet())

// sanitize request
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

// jwt authentication
app.use(session({
  secret: 'SECRET',
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false
}))
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use(passport.session())

// enable cors
app.use(cors())

app.use('/', indexRouter, apiLimiter)
app.use('/v1', routes, apiLimiter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Page Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app
