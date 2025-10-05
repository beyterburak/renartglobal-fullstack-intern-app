function errorHandler(err, req, res, next) {
    if (process.env.NODE_ENV !== 'production') {
        console.error('Error occurred:', err.message);
        console.error('Stack:', err.stack);
    }

    const statusCode = err.statusCode || err.status || 500;

    res.status(statusCode).json({
        success: false,
        error: err.name || 'ServerError',
        message: process.env.NODE_ENV === 'production'
            ? 'An error occurred'
            : err.message
    });
}

module.exports = errorHandler;