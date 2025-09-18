import { Request, Response, NextFunction } from 'express';
import { convertJsonToUblXml } from '../services/conversionService';
import { convertFlexibleJsonToUblXml } from '../services/flexibleMappingService';
import { ApiError } from '../middleware/errorHandler';

export const convertController = {
  convert: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { processedInvoice, useFlexibleMapping } = req.body;
      
      if (!processedInvoice) {
        throw new Error('No processed invoice data found');
      }
      
      let ublXml: string;
      
      // Use flexible mapping by default, fall back to strict mapping if specified
      if (useFlexibleMapping === false) {
        console.log('Using strict mapping (legacy mode)');
        ublXml = await convertJsonToUblXml(processedInvoice);
      } else {
        console.log('Using flexible mapping');
        ublXml = await convertFlexibleJsonToUblXml(processedInvoice);
      }
      
      res.set('Content-Type', 'application/xml');
      
      res.status(200).send(ublXml);
    } catch (error) {
      console.error('Error in convertController:', error);
      next(error);
    }
  }
}
