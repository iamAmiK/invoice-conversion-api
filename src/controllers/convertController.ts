import { Request, Response, NextFunction } from 'express';
import { convertJsonToUblXml } from '../services/conversionService';
import { ApiError } from '../middleware/errorHandler';

export const convertController = {
  convert: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { processedInvoice } = req.body;
      
      if (!processedInvoice) {
        throw new Error('No processed invoice data found');
      }
      
      const ublXml = await convertJsonToUblXml(processedInvoice);
      
      res.set('Content-Type', 'application/xml');
      
      res.status(200).send(ublXml);
    } catch (error) {
      console.error('Error in convertController:', error);
      next(error);
    }
  }
}
