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
            // Use flexible mapping by default, fall back to strict mapping if specified
            if (useFlexibleMapping === false) {
                console.log('Using strict mapping (legacy mode)');
                ublXml = await (0, conversionService_1.convertJsonToUblXml)(processedInvoice);
            }
            else {
                console.log('Using flexible mapping');
                ublXml = await (0, flexibleMappingService_1.convertFlexibleJsonToUblXml)(processedInvoice);
            }
            res.set('Content-Type', 'application/xml');
            res.status(200).send(ublXml);
        }
        catch (error) {
            console.error('Error in convertController:', error);
            next(error);
        }
    }
};
