"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixController = void 0;
const flexibleMappingService_1 = require("../services/flexibleMappingService");
const fixService_1 = require("../services/fixService");
const errorHandler_1 = require("../middleware/errorHandler");
exports.fixController = {
    /**
     * POST /api/fix/analyse
     * analyses the invoice and returns missing fields
     */
    analyse: async (req, res, next) => {
        try {
            const { invoiceData } = req.body;
            if (!invoiceData) {
                throw errorHandler_1.ApiError.badRequest('invoiceData is required');
            }
            if (typeof invoiceData !== 'object' || invoiceData === null) {
                throw errorHandler_1.ApiError.badRequest('invoiceData must be a valid JSON object');
            }
            // Extract invoice from wrapper if present
            let invoice = invoiceData;
            if (invoiceData.Invoice) {
                if (Array.isArray(invoiceData.Invoice)) {
                    invoice = invoiceData.Invoice[0] || invoiceData;
                }
                else if (typeof invoiceData.Invoice === 'object') {
                    invoice = invoiceData.Invoice;
                }
            }
            // Detect missing fields
            const missingFieldsReport = (0, flexibleMappingService_1.detectMissingFields)(invoice);
            // Return the missing fields report with additional helpful info
            res.status(200).json({
                missingFields: missingFieldsReport.missing,
                foundFields: missingFieldsReport.found,
                summary: missingFieldsReport.summary,
                supportedFixFields: (0, fixService_1.getSupportedFixFields)(),
                note: 'Use /api/fix/apply to provide values for missing fields'
            });
        }
        catch (error) {
            console.error('Error in fix analyse controller:', error);
            next(error);
        }
    },
    /**
     * POST /api/fix/apply
     * Applies fixes to the invoice and returns updated JSON + XML
     */
    apply: async (req, res, next) => {
        try {
            const { invoiceData, fixes } = req.body;
            if (!invoiceData) {
                throw errorHandler_1.ApiError.badRequest('invoiceData is required');
            }
            if (!fixes) {
                throw errorHandler_1.ApiError.badRequest('fixes object is required');
            }
            if (typeof invoiceData !== 'object' || invoiceData === null) {
                throw errorHandler_1.ApiError.badRequest('invoiceData must be a valid JSON object');
            }
            // Validate fixes
            const validation = (0, fixService_1.validateFixes)(fixes);
            if (!validation.valid) {
                throw errorHandler_1.ApiError.badRequest(validation.error || 'Invalid fixes object');
            }
            // Extract invoice from wrapper if present
            let invoice = invoiceData;
            let hasWrapper = false;
            if (invoiceData.Invoice) {
                hasWrapper = true;
                if (Array.isArray(invoiceData.Invoice)) {
                    invoice = invoiceData.Invoice[0] || invoiceData;
                }
                else if (typeof invoiceData.Invoice === 'object') {
                    invoice = invoiceData.Invoice;
                }
            }
            // Apply fixes to the invoice
            const updatedInvoice = (0, fixService_1.applyFixesToInvoice)(invoice, fixes);
            // Reconstruct with wrapper if it was present
            let updatedInvoiceData = updatedInvoice;
            if (hasWrapper) {
                updatedInvoiceData = {
                    ...invoiceData,
                    Invoice: [updatedInvoice]
                };
            }
            // Convert to XML
            const ublXml = await (0, flexibleMappingService_1.convertFlexibleJsonToUblXml)(updatedInvoice);
            // Detect remaining missing fields
            const missingFieldsReport = (0, flexibleMappingService_1.detectMissingFields)(updatedInvoice);
            // Return everything
            res.status(200).json({
                updatedJson: updatedInvoiceData,
                xml: ublXml,
                missingFields: {
                    missing: missingFieldsReport.missing,
                    found: missingFieldsReport.found,
                    summary: missingFieldsReport.summary
                },
                appliedFixes: Object.keys(fixes)
            });
        }
        catch (error) {
            console.error('Error in fix apply controller:', error);
            next(error);
        }
    }
};
