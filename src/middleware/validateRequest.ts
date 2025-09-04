import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

// Helper function to check if a value is an object (and not null/array)
const isObject = (value: any): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Helper function to check if a value is an array with at least one element
const isNonEmptyArray = (value: any): boolean => {
  return Array.isArray(value) && value.length > 0;
};

// Helper to get the first element if it's an array, or the value itself
const getFirstIfArray = (value: any): any => {
  return Array.isArray(value) ? value[0] : value;
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

    if (!isObject(invoiceData)) {
      throw ApiError.badRequest('invoiceData must be a valid JSON object');
    }

    let invoice = invoiceData;
    if (isNonEmptyArray(invoiceData.Invoice)) {
      invoice = invoiceData.Invoice[0];
    } else if (!isObject(invoiceData.Invoice) && Object.keys(invoiceData).length > 0) {
      invoice = invoiceData;
    } else {
      throw ApiError.badRequest('Invalid invoice data: Missing or invalid Invoice structure');
    }

    const requiredFields = [
      { field: 'ID', message: 'Missing required field: ID' },
      { field: 'IssueDate', message: 'Missing required field: IssueDate' },
      { field: 'InvoiceTypeCode', message: 'Missing required field: InvoiceTypeCode' },
      { field: 'DocumentCurrencyCode', message: 'Missing required field: DocumentCurrencyCode' }
    ];

    for (const { field, message } of requiredFields) {
      const value = invoice[field];
      if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
        throw ApiError.badRequest(message);
      }
    }

    const validateParty = (party: any, partyName: string) => {
      if (!party) return;
      
      const partyObj = Array.isArray(party) ? party[0] : party;
      if (partyObj && !isObject(partyObj.Party)) {
        console.warn(`Warning: Invalid ${partyName}: Missing or invalid Party object`);
      }
    };

    validateParty(invoice.AccountingSupplierParty, 'AccountingSupplierParty');
    validateParty(invoice.AccountingCustomerParty, 'AccountingCustomerParty');

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
