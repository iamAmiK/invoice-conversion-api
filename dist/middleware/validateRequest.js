"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConvertRequest = void 0;
const errorHandler_1 = require("./errorHandler");
// Helper function to check if a value is an object (and not null/array)
const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};
// Flexible validation that accepts any reasonable JSON structure
const validateConvertRequest = (req, res, next) => {
    try {
        const { invoiceType, outputFormat, invoiceData } = req.body;
        // Check for basic required parameters
        if (!invoiceType || !outputFormat || !invoiceData) {
            throw errorHandler_1.ApiError.badRequest('Missing required fields: invoiceType, outputFormat, and invoiceData are required');
        }
        if (invoiceType.toLowerCase() !== 'json') {
            throw errorHandler_1.ApiError.badRequest('Only JSON input format is currently supported');
        }
        if (outputFormat.toLowerCase() !== 'ubl xml') {
            throw errorHandler_1.ApiError.badRequest('Only UBL XML output format is currently supported');
        }
        // Very permissive validation - just check that we have some kind of object
        if (typeof invoiceData !== 'object' || invoiceData === null) {
            throw errorHandler_1.ApiError.badRequest('invoiceData must be a valid JSON object');
        }
        // Accept any JSON structure - no strict requirements
        let invoice = invoiceData;
        // If there's an Invoice property, use it, otherwise use the whole object
        if (invoiceData.Invoice) {
            if (Array.isArray(invoiceData.Invoice)) {
                invoice = invoiceData.Invoice[0] || invoiceData;
            }
            else if (typeof invoiceData.Invoice === 'object') {
                invoice = invoiceData.Invoice;
            }
        }
        // No strict field validation - the flexible mapping service will handle extraction
        // Just log what we received for debugging
        console.log('Received invoice data structure:', Object.keys(invoice).join(', '));
        req.body.processedInvoice = invoice;
        next();
    }
    catch (error) {
        if (error instanceof errorHandler_1.ApiError) {
            next(error);
        }
        else {
            console.error('Validation error:', error);
            next(errorHandler_1.ApiError.badRequest('Invalid request data'));
        }
    }
};
exports.validateConvertRequest = validateConvertRequest;
