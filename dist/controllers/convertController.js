"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertController = void 0;
const conversionService_1 = require("../services/conversionService");
const flexibleMappingService_1 = require("../services/flexibleMappingService");
exports.convertController = {
    convert: async (req, res, next) => {
        try {
            const { processedInvoice, useFlexibleMapping } = req.body;
            if (!processedInvoice) {
                throw new Error('No processed invoice data found');
            }
            let ublXml;
            let missingFieldsReport = null;
            // Use flexible mapping by default, fall back to strict mapping if specified
            if (useFlexibleMapping === false) {
                console.log('Using strict mapping (legacy mode)');
                ublXml = await (0, conversionService_1.convertJsonToUblXml)(processedInvoice);
            }
            else {
                console.log('Using flexible mapping');
                // Detect missing fields before conversion
                missingFieldsReport = (0, flexibleMappingService_1.detectMissingFields)(processedInvoice);
                ublXml = await (0, flexibleMappingService_1.convertFlexibleJsonToUblXml)(processedInvoice);
            }
            // Return JSON response with both XML and missing fields report
            res.status(200).json({
                xml: ublXml,
                missingFields: missingFieldsReport || {
                    missing: [],
                    found: [],
                    summary: 'Field detection not available in strict mapping mode'
                }
            });
        }
        catch (error) {
            console.error('Error in convertController:', error);
            next(error);
        }
    }
};
