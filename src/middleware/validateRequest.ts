import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const validateConvertRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { invoiceType, outputFormat, invoiceData } = req.body;

    if (!invoiceType || !outputFormat || !invoiceData) {
      throw ApiError.badRequest('Missing required fields: invoiceType, outputFormat, and invoiceData are required');
    }

    if (invoiceType.toLowerCase() !== 'json') {
      throw ApiError.badRequest('Only JSON input format is currently supported');
    }

    if (outputFormat.toLowerCase() !== 'ubl xml') {
      throw ApiError.badRequest('Only UBL XML output format is currently supported');
    }

    // Very permissive validation - just check that we have some kind of object
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
    // I will use this part for debugging and for future logging to tell users what is missing
    console.log('Received invoice data structure:', Object.keys(invoice).join(', '));

    req.body.processedInvoice = invoice;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      console.error('Validation error:', error);
      next(ApiError.badRequest('Invalid request data'));
    }
  }
};
