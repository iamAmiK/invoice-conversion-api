"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            ...(err.errors && { errors: err.errors })
        });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            errors: err.errors
        });
    }
    const statusCode = err.statusCode || 500;
    const errorResponse = {
        status: 'error',
        message: err.message || 'Internal server error'
    };
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
class ApiError extends Error {
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    static badRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
    static notFound(message) {
        return new ApiError(404, message);
    }
}
exports.ApiError = ApiError;
