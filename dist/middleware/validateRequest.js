"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConvertRequest = void 0;
const errorHandler_1 = require("./errorHandler");
// Helper function to check if a value is an object (and not null/array)
const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
};
// Helper function to check if a value is an array with at least one element
const isNonEmptyArray = (value) => {
    return Array.isArray(value) && value.length > 0;
};
// Helper to get the first element if it's an array, or the value itself
const getFirstIfArray = (value) => {
    return Array.isArray(value) ? value[0] : value;
};
const validateConvertRequest = (req, res, next) => {
    try {
        const { invoiceType, outputFormat, invoiceData } = req.body;
        if (!invoiceType || !outputFormat || !invoiceData) {
            throw errorHandler_1.ApiError.badRequest('Missing required fields: invoiceType, outputFormat, and invoiceData are required');
        }
        if (invoiceType.toLowerCase() !== 'json') {
            throw errorHandler_1.ApiError.badRequest('Only JSON input format is currently supported');
        }
        if (outputFormat.toLowerCase() !== 'ubl xml') {
            throw errorHandler_1.ApiError.badRequest('Only UBL XML output format is currently supported');
        }
        if (!isObject(invoiceData)) {
            throw errorHandler_1.ApiError.badRequest('invoiceData must be a valid JSON object');
        }
        let invoice = invoiceData;
        if (isNonEmptyArray(invoiceData.Invoice)) {
            invoice = invoiceData.Invoice[0];
        }
        else if (!isObject(invoiceData.Invoice) && Object.keys(invoiceData).length > 0) {
            invoice = invoiceData;
        }
        else {
            throw errorHandler_1.ApiError.badRequest('Invalid invoice data: Missing or invalid Invoice structure');
        }
        const requiredFields = [
            { field: 'ID', message: 'Missing required field: ID' },
            { field: 'IssueDate', message: 'Missing required field: IssueDate' },
            { field: 'InvoiceTypeCode', message: 'Missing required field: InvoiceTypeCode' },
            { field: 'DocumentCurrencyCode', message: 'Missing required field: DocumentCurrencyCode' }
        ];
        for (const { field, message } of requiredFields) {
            const value = invoice[field];
            if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
                throw errorHandler_1.ApiError.badRequest(message);
            }
        }
        const validateParty = (party, partyName) => {
            if (!party)
                return;
            const partyObj = Array.isArray(party) ? party[0] : party;
            if (partyObj && !isObject(partyObj.Party)) {
                console.warn(`Warning: Invalid ${partyName}: Missing or invalid Party object`);
            }
        };
        validateParty(invoice.AccountingSupplierParty, 'AccountingSupplierParty');
        validateParty(invoice.AccountingCustomerParty, 'AccountingCustomerParty');
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
