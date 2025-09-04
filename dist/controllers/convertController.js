"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertController = void 0;
const conversionService_1 = require("../services/conversionService");
exports.convertController = {
    convert: async (req, res, next) => {
        try {
            const { processedInvoice } = req.body;
            if (!processedInvoice) {
                throw new Error('No processed invoice data found');
            }
            const ublXml = await (0, conversionService_1.convertJsonToUblXml)(processedInvoice);
            res.set('Content-Type', 'application/xml');
            res.status(200).send(ublXml);
        }
        catch (error) {
            console.error('Error in convertController:', error);
            next(error);
        }
    }
};
