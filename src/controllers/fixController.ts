import { Request, Response, NextFunction } from 'express';
import { detectMissingFields, convertFlexibleJsonToUblXml, MissingFieldsReport } from '../services/flexibleMappingService';
import { applyFixesToInvoice, validateFixes, getSupportedFixFields } from '../services/fixService';
import { ApiError } from '../middleware/errorHandler';

export const fixController = {
  analyse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceData } = req.body;
      
      if (!invoiceData) {
        throw ApiError.badRequest('invoiceData is required');
      }
      
      if (typeof invoiceData !== 'object' || invoiceData === null) {
        throw ApiError.badRequest('invoiceData must be a valid JSON object');
      }
      
      let invoice = invoiceData;
      if (invoiceData.Invoice) {
        if (Array.isArray(invoiceData.Invoice)) {
          invoice = invoiceData.Invoice[0] || invoiceData;
        } else if (typeof invoiceData.Invoice === 'object') {
          invoice = invoiceData.Invoice;
        }
      }
      
      const missingFieldsReport = detectMissingFields(invoice);
      
      res.status(200).json({
        missingFields: missingFieldsReport.missing,
        foundFields: missingFieldsReport.found,
        summary: missingFieldsReport.summary,
        supportedFixFields: getSupportedFixFields(),
        note: 'Use /api/fix/apply to provide values for missing fields'
      });
    } catch (error) {
      console.error('Error in fix analyse controller:', error);
      next(error);
    }
  },

  apply: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { invoiceData, fixes } = req.body;
      
      if (!invoiceData) {
        throw ApiError.badRequest('invoiceData is required');
      }
      
      if (!fixes) {
        throw ApiError.badRequest('fixes object is required');
      }
      
      if (typeof invoiceData !== 'object' || invoiceData === null) {
        throw ApiError.badRequest('invoiceData must be a valid JSON object');
      }
      
      const validation = validateFixes(fixes);
      if (!validation.valid) {
        throw ApiError.badRequest(validation.error || 'Invalid fixes object');
      }
      
      let invoice = invoiceData;
      let hasWrapper = false;
      
      if (invoiceData.Invoice) {
        hasWrapper = true;
        if (Array.isArray(invoiceData.Invoice)) {
          invoice = invoiceData.Invoice[0] || invoiceData;
        } else if (typeof invoiceData.Invoice === 'object') {
          invoice = invoiceData.Invoice;
        }
      }
      
      const updatedInvoice = applyFixesToInvoice(invoice, fixes);
      
      let updatedInvoiceData = updatedInvoice;
      if (hasWrapper) {
        updatedInvoiceData = {
          ...invoiceData,
          Invoice: [updatedInvoice]
        };
      }
      
      const ublXml = await convertFlexibleJsonToUblXml(updatedInvoice);
      
      const missingFieldsReport = detectMissingFields(updatedInvoice);
      
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
    } catch (error) {
      console.error('Error in fix apply controller:', error);
      next(error);
    }
  }
};

