import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

// Helper function to check if a value is an object (and not null/array)
const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Flexible validation that accepts any reasonable JSON structure
export const validateConvertRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { invoiceType, outputFormat, invoiceData } = req.body;

    // Check for basic required parameters
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

    // Accept any JSON structure - no strict requirements
    let invoice = invoiceData;
    
    // If there's an Invoice property, use it, otherwise use the whole object
    if (invoiceData.Invoice) {
      if (Array.isArray(invoiceData.Invoice)) {
        invoice = invoiceData.Invoice[0] || invoiceData;
      } else if (typeof invoiceData.Invoice === 'object') {
        invoice = invoiceData.Invoice;
      }
    }

    // No strict field validation - the flexible mapping service will handle extraction
    // Just log what we received for debugging
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
