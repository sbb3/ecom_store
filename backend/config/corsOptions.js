const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // if received origin is in the allowedOrigins array, or if no origin was received (e.g. the request was made from Postman), then allow the request, !origin which can happen for same-origin requests
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true, // <-- REQUIRED backend setting, otherwise cookies won't be sent, even if CORS is enabled, and you'll get a 401 Unauthorized error
    optionsSuccessStatus: 200
}

module.exports = corsOptions
