const dotenv = require("dotenv");
const path = require("path");
const Joi = require("@hapi/joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });
const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description("Mongo DB URL"),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
module.exports = {
    env: envVars.NODE_ENV.toLowerCase(),
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    jwt: {
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        secret: envVars.JWT_SECRET,
        resetPasswordExpirationMinutes:
            envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    },
};
