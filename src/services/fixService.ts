export interface InvoiceFixes {
  [key: string]: any;
}
// can add more fields here if needed ltr!
const FIELD_MAPPING_REVERSE: { [key: string]: { jsonKeys: string[], dataType: string } } = {
  'ublVersionID': { jsonKeys: ['ublVersionID', 'UBLVersionID'], dataType: 'identifier' },
  'id': { jsonKeys: ['id', 'ID'], dataType: 'identifier' },
  'invoiceId': { jsonKeys: ['id', 'ID'], dataType: 'identifier' },
  'issueDate': { jsonKeys: ['issueDate', 'IssueDate'], dataType: 'date' },
  'dueDate': { jsonKeys: ['dueDate', 'DueDate'], dataType: 'date' },
  'taxPointDate': { jsonKeys: ['taxPointDate', 'TaxPointDate'], dataType: 'date' },
  'invoiceTypeCode': { jsonKeys: ['invoiceTypeCode', 'InvoiceTypeCode'], dataType: 'code' },
  'documentCurrencyCode': { jsonKeys: ['currencyCode', 'DocumentCurrencyCode'], dataType: 'code' },
  'note': { jsonKeys: ['note', 'Note'], dataType: 'text' },
  'accountingCost': { jsonKeys: ['accountingCost', 'AccountingCost'], dataType: 'text' },
  'buyerReference': { jsonKeys: ['buyerReference', 'BuyerReference'], dataType: 'text' },
  
  'orderReference': { jsonKeys: ['orderReference', 'OrderReference'], dataType: 'identifier' },
  
  'supplierName': { jsonKeys: ['supplier.name', 'supplier.companyName'], dataType: 'text' },
  'customerName': { jsonKeys: ['customer.name', 'customer.companyName'], dataType: 'text' },
  
  'supplierStreet': { jsonKeys: ['supplier.address.street', 'supplier.street'], dataType: 'text' },
  'supplierCity': { jsonKeys: ['supplier.address.city', 'supplier.city'], dataType: 'text' },
  'supplierPostalCode': { jsonKeys: ['supplier.address.postalCode', 'supplier.postalCode'], dataType: 'text' },
  'supplierCountry': { jsonKeys: ['supplier.address.country', 'supplier.country'], dataType: 'text' },
  
  'customerStreet': { jsonKeys: ['customer.address.street', 'customer.street'], dataType: 'text' },
  'customerCity': { jsonKeys: ['customer.address.city', 'customer.city'], dataType: 'text' },
  'customerPostalCode': { jsonKeys: ['customer.address.postalCode', 'customer.postalCode'], dataType: 'text' },
  'customerCountry': { jsonKeys: ['customer.address.country', 'customer.country'], dataType: 'text' },
  
  'supplierPhone': { jsonKeys: ['supplier.phone', 'supplier.contact.phone'], dataType: 'text' },
  'supplierEmail': { jsonKeys: ['supplier.email', 'supplier.contact.email'], dataType: 'text' },
  'customerPhone': { jsonKeys: ['customer.phone', 'customer.contact.phone'], dataType: 'text' },
  'customerEmail': { jsonKeys: ['customer.email', 'customer.contact.email'], dataType: 'text' },
  
  'deliveryDate': { jsonKeys: ['delivery.actualDeliveryDate', 'deliveryDate'], dataType: 'date' },
  
  'paymentMethod': { jsonKeys: ['paymentMeans.paymentMeansCode', 'paymentMethod'], dataType: 'code' },
  'paymentTerms': { jsonKeys: ['paymentTerms.note', 'paymentTerms'], dataType: 'text' },
  
  'taxAmount': { jsonKeys: ['taxTotal.taxAmount', 'taxAmount'], dataType: 'amount' },
  'lineExtensionAmount': { jsonKeys: ['totals.lineExtensionAmount', 'lineExtensionAmount'], dataType: 'amount' },
  'taxExclusiveAmount': { jsonKeys: ['totals.taxExclusiveAmount', 'taxExclusiveAmount'], dataType: 'amount' },
  'taxInclusiveAmount': { jsonKeys: ['totals.taxInclusiveAmount', 'taxInclusiveAmount'], dataType: 'amount' },
  'payableAmount': { jsonKeys: ['totals.payableAmount', 'payableAmount'], dataType: 'amount' }
};

const setNestedProperty = (obj: any, path: string, value: any): void => {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
};

const hasNestedProperty = (obj: any, path: string): boolean => {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (!current || typeof current !== 'object' || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
};

export const applyFixesToInvoice = (invoiceData: any, fixes: InvoiceFixes): any => {
  const updatedInvoice = JSON.parse(JSON.stringify(invoiceData));
  
  for (const [fieldName, value] of Object.entries(fixes)) {
    if (value === null || value === undefined || value === '') {
      continue;
    }
    
    const mapping = FIELD_MAPPING_REVERSE[fieldName];
    
    if (mapping) {
      let placed = false;
      
      for (const jsonKey of mapping.jsonKeys) {
        if (!hasNestedProperty(updatedInvoice, jsonKey)) {
          setNestedProperty(updatedInvoice, jsonKey, value);
          placed = true;
          break;
        }
      }
      
      if (!placed) {
        const firstKey = mapping.jsonKeys[0];
        setNestedProperty(updatedInvoice, firstKey, value);
      }
    } else {
      if (!updatedInvoice[fieldName]) {
        updatedInvoice[fieldName] = value;
      }
    }
  }
  
  return updatedInvoice;
};

export const validateFixes = (fixes: any): { valid: boolean; error?: string } => {
  if (!fixes || typeof fixes !== 'object') {
    return { valid: false, error: 'Fixes must be a valid object' };
  }
  
  if (Array.isArray(fixes)) {
    return { valid: false, error: 'Fixes must be an object, not an array' };
  }
  
  const keys = Object.keys(fixes);
  if (keys.length === 0) {
    return { valid: false, error: 'Fixes object cannot be empty' };
  }
  
  return { valid: true };
};

export const getSupportedFixFields = (): string[] => {
  return Object.keys(FIELD_MAPPING_REVERSE).sort();
};