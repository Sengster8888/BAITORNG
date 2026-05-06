const config = require('../config/env');

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${statusCode} - ${message}`);
    if (err.stack && config.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: config.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = errorMiddleware;
