import { Request, Response, NextFunction } from 'express';
import { convertJsonToUblXml } from '../services/conversionService';
import { convertFlexibleJsonToUblXml, detectMissingFields, MissingFieldsReport } from '../services/flexibleMappingService';
import { ApiError } from '../middleware/errorHandler';

export const convertController = {
  convert: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { processedInvoice, useFlexibleMapping } = req.body;
      
      if (!processedInvoice) {
        throw new Error('No processed invoice data found');
      }
      
      let ublXml: string;
      let missingFieldsReport: MissingFieldsReport | null = null;
      
      // Use flexible mapping by default, fall back to strict mapping if specified
      if (useFlexibleMapping === false) {
        console.log('Using strict mapping (legacy mode)');
        ublXml = await convertJsonToUblXml(processedInvoice);
      } else {
        console.log('Using flexible mapping');
        // Detect missing fields before conversion
        missingFieldsReport = detectMissingFields(processedInvoice);
        ublXml = await convertFlexibleJsonToUblXml(processedInvoice);
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
    } catch (error) {
      console.error('Error in convertController:', error);
      next(error);
    }
  }
}
