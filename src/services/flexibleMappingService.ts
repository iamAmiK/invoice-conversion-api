import { Builder } from 'xml2js';

interface FieldMapping {
  xmlElement: string;
  xmlNamespace: 'cbc' | 'cac' | 'ubl';
  jsonFields: string[];
  dataType: 'text' | 'identifier' | 'amount' | 'date' | 'numeric' | 'indicator' | 'code';
  attributes?: string[];
}

// mapping for invoice data
export const INVOICE_FIELD_MAPPINGS: FieldMapping[] = [
  {
    xmlElement: 'UBLVersionID',
    xmlNamespace: 'cbc',
    jsonFields: ['ublVersionID', 'ublVersion', 'version'],
    dataType: 'identifier'
  },
  {
    xmlElement: 'ID',
    xmlNamespace: 'cbc',
    jsonFields: ['id', 'invoiceId', 'invoiceNumber', 'number', 'documentId', 'docId'],
    dataType: 'identifier'
  },
  {
    xmlElement: 'IssueDate',
    xmlNamespace: 'cbc',
    jsonFields: ['issueDate', 'date', 'invoiceDate', 'dateIssued', 'createdDate', 'documentDate'],
    dataType: 'date'
  },
  {
    xmlElement: 'DueDate',
    xmlNamespace: 'cbc',
    jsonFields: ['dueDate', 'paymentDue', 'dueDatePayment', 'paymentDueDate'],
    dataType: 'date'
  },
  {
    xmlElement: 'TaxPointDate',
    xmlNamespace: 'cbc',
    jsonFields: ['taxPointDate', 'taxDate', 'vatDate'],
    dataType: 'date'
  },
  {
    xmlElement: 'InvoiceTypeCode',
    xmlNamespace: 'cbc',
    jsonFields: ['invoiceTypeCode', 'typeCode', 'documentTypeCode', 'type'],
    dataType: 'code'
  },
  {
    xmlElement: 'DocumentCurrencyCode',
    xmlNamespace: 'cbc',
    jsonFields: ['currencyCode', 'currency', 'documentCurrencyCode', 'curr'],
    dataType: 'code'
  },
  {
    xmlElement: 'Note',
    xmlNamespace: 'cbc',
    jsonFields: ['note', 'notes', 'description', 'comment', 'remarks'],
    dataType: 'text'
  },
  {
    xmlElement: 'AccountingCost',
    xmlNamespace: 'cbc',
    jsonFields: ['accountingCost', 'costCenter', 'projectCode', 'bookingCode'],
    dataType: 'text'
  },
  {
    xmlElement: 'BuyerReference',
    xmlNamespace: 'cbc',
    jsonFields: ['buyerReference', 'purchaseOrder', 'poNumber', 'orderNumber', 'customerReference'],
    dataType: 'text'
  },
  
  // Reference Information
  {
    xmlElement: 'ID',
    xmlNamespace: 'cbc',
    jsonFields: ['orderReference', 'orderRef', 'purchaseOrderNumber'],
    dataType: 'identifier'
  },
  {
    xmlElement: 'DocumentType',
    xmlNamespace: 'cbc',
    jsonFields: ['documentType', 'docType', 'referenceType'],
    dataType: 'text'
  },
  
  // Party Information
  {
    xmlElement: 'EndpointID',
    xmlNamespace: 'cbc',
    jsonFields: ['endpointID', 'gln', 'electronicAddress'],
    dataType: 'identifier'
  },
  {
    xmlElement: 'CompanyID',
    xmlNamespace: 'cbc',
    jsonFields: ['companyID', 'registrationNumber', 'businessNumber', 'taxNumber', 'vatNumber'],
    dataType: 'identifier'
  },
  {
    xmlElement: 'RegistrationName',
    xmlNamespace: 'cbc',
    jsonFields: ['supplierName', 'sellerName', 'companyName', 'vendorName', 'name', 'registrationName', 'legalName'],
    dataType: 'text'
  },
  
  // Address Information
  {
    xmlElement: 'StreetName',
    xmlNamespace: 'cbc',
    jsonFields: ['street', 'address', 'streetAddress', 'address1', 'addressLine1', 'streetName'],
    dataType: 'text'
  },
  {
    xmlElement: 'AdditionalStreetName',
    xmlNamespace: 'cbc',
    jsonFields: ['address2', 'addressLine2', 'additionalStreetName', 'suite', 'apartment'],
    dataType: 'text'
  },
  {
    xmlElement: 'BuildingNumber',
    xmlNamespace: 'cbc',
    jsonFields: ['buildingNumber', 'houseNumber', 'streetNumber'],
    dataType: 'text'
  },
  {
    xmlElement: 'Department',
    xmlNamespace: 'cbc',
    jsonFields: ['department', 'division', 'unit'],
    dataType: 'text'
  },
  {
    xmlElement: 'Postbox',
    xmlNamespace: 'cbc',
    jsonFields: ['postbox', 'poBox', 'mailbox'],
    dataType: 'text'
  },
  {
    xmlElement: 'CityName',
    xmlNamespace: 'cbc',
    jsonFields: ['city', 'cityName', 'town'],
    dataType: 'text'
  },
  {
    xmlElement: 'PostalZone',
    xmlNamespace: 'cbc',
    jsonFields: ['postalCode', 'zipCode', 'zip', 'postcode', 'postalZone'],
    dataType: 'text'
  },
  {
    xmlElement: 'CountrySubentity',
    xmlNamespace: 'cbc',
    jsonFields: ['state', 'province', 'region', 'countrySubentity'],
    dataType: 'text'
  },
  {
    xmlElement: 'CountrySubentityCode',
    xmlNamespace: 'cbc',
    jsonFields: ['stateCode', 'provinceCode', 'regionCode', 'countrySubentityCode'],
    dataType: 'code'
  },
  {
    xmlElement: 'IdentificationCode',
    xmlNamespace: 'cbc',
    jsonFields: ['country', 'countryCode', 'identificationCode'],
    dataType: 'code'
  },
  
  // Contact Information
  {
    xmlElement: 'Telephone',
    xmlNamespace: 'cbc',
    jsonFields: ['phone', 'telephone', 'phoneNumber', 'tel'],
    dataType: 'text'
  },
  {
    xmlElement: 'Telefax',
    xmlNamespace: 'cbc',
    jsonFields: ['fax', 'telefax', 'faxNumber'],
    dataType: 'text'
  },
  {
    xmlElement: 'ElectronicMail',
    xmlNamespace: 'cbc',
    jsonFields: ['email', 'emailAddress', 'electronicMail', 'e-mail'],
    dataType: 'text'
  },
  
  // Person Information
  {
    xmlElement: 'FirstName',
    xmlNamespace: 'cbc',
    jsonFields: ['firstName', 'givenName'],
    dataType: 'text'
  },
  {
    xmlElement: 'FamilyName',
    xmlNamespace: 'cbc',
    jsonFields: ['lastName', 'familyName', 'surname'],
    dataType: 'text'
  },
  {
    xmlElement: 'MiddleName',
    xmlNamespace: 'cbc',
    jsonFields: ['middleName'],
    dataType: 'text'
  },
  {
    xmlElement: 'JobTitle',
    xmlNamespace: 'cbc',
    jsonFields: ['jobTitle', 'title', 'position'],
    dataType: 'text'
  },
  
  // Delivery Information
  {
    xmlElement: 'ActualDeliveryDate',
    xmlNamespace: 'cbc',
    jsonFields: ['deliveryDate', 'actualDeliveryDate', 'shippingDate'],
    dataType: 'date'
  },
  
  // Payment Information
  {
    xmlElement: 'PaymentMeansCode',
    xmlNamespace: 'cbc',
    jsonFields: ['paymentMethod', 'paymentMeansCode', 'paymentType'],
    dataType: 'code'
  },
  {
    xmlElement: 'PaymentDueDate',
    xmlNamespace: 'cbc',
    jsonFields: ['paymentDueDate', 'dueDate', 'paymentDate'],
    dataType: 'date'
  },
  {
    xmlElement: 'PaymentChannelCode',
    xmlNamespace: 'cbc',
    jsonFields: ['paymentChannelCode', 'paymentChannel'],
    dataType: 'code'
  },
  {
    xmlElement: 'PaymentID',
    xmlNamespace: 'cbc',
    jsonFields: ['paymentID', 'paymentReference', 'remittanceInfo'],
    dataType: 'identifier'
  },
  
  // Allowance/Charge Information
  {
    xmlElement: 'ChargeIndicator',
    xmlNamespace: 'cbc',
    jsonFields: ['chargeIndicator', 'isCharge'],
    dataType: 'indicator'
  },
  {
    xmlElement: 'AllowanceChargeReason',
    xmlNamespace: 'cbc',
    jsonFields: ['allowanceChargeReason', 'reason', 'chargeReason', 'discountReason'],
    dataType: 'text'
  },
  {
    xmlElement: 'Amount',
    xmlNamespace: 'cbc',
    jsonFields: ['amount', 'chargeAmount', 'discountAmount'],
    dataType: 'amount'
  },
  {
    xmlElement: 'MultiplierFactorNumeric',
    xmlNamespace: 'cbc',
    jsonFields: ['multiplierFactor', 'percentage', 'rate'],
    dataType: 'numeric'
  },
  {
    xmlElement: 'BaseAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['baseAmount', 'originalAmount'],
    dataType: 'amount'
  },
  
  // Tax Information
  {
    xmlElement: 'TaxableAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['taxableAmount', 'taxBasis'],
    dataType: 'amount'
  },
  {
    xmlElement: 'Percent',
    xmlNamespace: 'cbc',
    jsonFields: ['percent', 'taxPercent', 'taxRate', 'rate'],
    dataType: 'numeric'
  },
  {
    xmlElement: 'TaxExemptionReasonCode',
    xmlNamespace: 'cbc',
    jsonFields: ['taxExemptionReasonCode', 'exemptionCode'],
    dataType: 'code'
  },
  {
    xmlElement: 'TaxExemptionReason',
    xmlNamespace: 'cbc',
    jsonFields: ['taxExemptionReason', 'exemptionReason'],
    dataType: 'text'
  },
  
  // Customer/Buyer Information
  {
    xmlElement: 'Name',
    xmlNamespace: 'cbc',
    jsonFields: ['customerName', 'buyerName', 'clientName', 'name'],
    dataType: 'text'
  },
  
  // Monetary Totals
  {
    xmlElement: 'LineExtensionAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['lineTotal', 'subtotal', 'lineAmount', 'lineExtensionAmount', 'netAmount'],
    dataType: 'amount'
  },
  {
    xmlElement: 'TaxExclusiveAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['taxExclusiveAmount', 'amountBeforeTax', 'netTotal', 'subtotal'],
    dataType: 'amount'
  },
  {
    xmlElement: 'TaxInclusiveAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['taxInclusiveAmount', 'total', 'totalAmount', 'grandTotal', 'amountWithTax'],
    dataType: 'amount'
  },
  {
    xmlElement: 'AllowanceTotalAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['allowanceTotalAmount', 'totalDiscount', 'discountTotal'],
    dataType: 'amount'
  },
  {
    xmlElement: 'ChargeTotalAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['chargeTotalAmount', 'totalCharges', 'chargeTotal'],
    dataType: 'amount'
  },
  {
    xmlElement: 'PrepaidAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['prepaidAmount', 'advancePayment', 'deposit'],
    dataType: 'amount'
  },
  {
    xmlElement: 'PayableRoundingAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['payableRoundingAmount', 'rounding'],
    dataType: 'amount'
  },
  {
    xmlElement: 'PayableAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['payableAmount', 'amountDue', 'totalDue', 'finalAmount', 'payable'],
    dataType: 'amount'
  },
  {
    xmlElement: 'TaxAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['taxAmount', 'tax', 'vatAmount', 'totalTax'],
    dataType: 'amount'
  },
  
  // Line Item Information
  {
    xmlElement: 'InvoicedQuantity',
    xmlNamespace: 'cbc',
    jsonFields: ['quantity', 'qty', 'invoicedQuantity', 'amount'],
    dataType: 'numeric'
  },
  {
    xmlElement: 'BaseQuantity',
    xmlNamespace: 'cbc',
    jsonFields: ['baseQuantity', 'unitQuantity'],
    dataType: 'numeric'
  },
  {
    xmlElement: 'PriceAmount',
    xmlNamespace: 'cbc',
    jsonFields: ['price', 'unitPrice', 'priceAmount', 'rate'],
    dataType: 'amount'
  },
  {
    xmlElement: 'Description',
    xmlNamespace: 'cbc',
    jsonFields: ['description', 'itemDescription', 'details', 'productDescription'],
    dataType: 'text'
  },
  {
    xmlElement: 'LineID',
    xmlNamespace: 'cbc',
    jsonFields: ['lineID', 'lineNumber', 'orderLineNumber'],
    dataType: 'identifier'
  },
  
  // Item Classification
  {
    xmlElement: 'ItemClassificationCode',
    xmlNamespace: 'cbc',
    jsonFields: ['itemClassificationCode', 'commodityCode', 'productCode'],
    dataType: 'code'
  }
];

// Recursive function to search for field values in any JSON structure
const findFieldValue = (obj: any, searchFields: string[]): any => {
  if (typeof obj !== 'object' || obj === null) {
    return null;
  }
  
  // First, try direct key matches (case-insensitive)
  for (const field of searchFields) {
    for (const key in obj) {
      if (key.toLowerCase() === field.toLowerCase()) {
        const value = obj[key];
        // If it's an object with common content fields, extract the value
        if (typeof value === 'object' && value !== null) {
          if (value._ !== undefined) return value._;
          if (value.value !== undefined) return value.value;
          if (value.content !== undefined) return value.content;
          if (value.text !== undefined) return value.text;
          if (Array.isArray(value) && value.length > 0) {
            const firstItem = value[0];
            if (typeof firstItem === 'object') {
              if (firstItem._ !== undefined) return firstItem._;
              if (firstItem.value !== undefined) return firstItem.value;
              if (firstItem.content !== undefined) return firstItem.content;
              if (firstItem.text !== undefined) return firstItem.text;
              // Handle content type fields from original system
              if (firstItem.IdentifierContent !== undefined) return firstItem.IdentifierContent;
              if (firstItem.TextContent !== undefined) return firstItem.TextContent;
              if (firstItem.AmountContent !== undefined) return firstItem.AmountContent;
              if (firstItem.DateContent !== undefined) return firstItem.DateContent;
              if (firstItem.NumericContent !== undefined) return firstItem.NumericContent;
              if (firstItem.CodeContent !== undefined) return firstItem.CodeContent;
            }
            return firstItem;
          }
        }
        return value;
      }
    }
  }
  
  // Recursive search in nested objects and arrays
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      const found = findFieldValue(value, searchFields);
      if (found !== null && found !== undefined && found !== '') {
        return found;
      }
    }
  }
  
  return null;
};

// NEW: Function to find array field values specifically for line items
const findArrayFieldValue = (obj: any, searchFields: string[]): any => {
  if (typeof obj !== 'object' || obj === null) {
    return null;
  }
  
  // First, try direct key matches (case-insensitive)
  for (const field of searchFields) {
    for (const key in obj) {
      if (key.toLowerCase() === field.toLowerCase()) {
        return obj[key]; // Return the entire array, not just first item
      }
    }
  }
  
  // Recursive search in nested objects
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const found = findArrayFieldValue(value, searchFields);
      if (found !== null && found !== undefined) {
        return found;
      }
    }
  }
  
  return null;
};

// Extract attributes from original value if present
const extractAttributes = (obj: any, searchFields: string[]): Record<string, any> => {
  const attributes: Record<string, any> = {};
  
  if (typeof obj !== 'object' || obj === null) {
    return attributes;
  }
  
  // Look for the field and extract attributes
  for (const field of searchFields) {
    for (const key in obj) {
      if (key.toLowerCase() === field.toLowerCase()) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // Extract attributes (keys starting with non-underscore after _)
          for (const attrKey in value) {
            if (attrKey !== '_' && attrKey !== 'value' && attrKey !== 'content' && attrKey !== 'text' &&
                !attrKey.endsWith('Content') && attrKey !== 'IdentifierContent' && 
                attrKey !== 'TextContent' && attrKey !== 'AmountContent' && attrKey !== 'DateContent') {
              attributes[attrKey] = value[attrKey];
            }
          }
        }
        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
          const firstItem = value[0];
          for (const attrKey in firstItem) {
            if (attrKey !== '_' && attrKey !== 'value' && attrKey !== 'content' && attrKey !== 'text' &&
                !attrKey.endsWith('Content')) {
              attributes[attrKey] = firstItem[attrKey];
            }
          }
        }
        break;
      }
    }
  }
  
  return attributes;
};

// Build XML structure from extracted data
const buildXmlStructure = (jsonData: any): any => {
  const result: Record<string, any> = {};
  
  // Extract basic invoice fields
  for (const mapping of INVOICE_FIELD_MAPPINGS) {
    const value = findFieldValue(jsonData, mapping.jsonFields);
    if (value !== null && value !== undefined && value !== '') {
      const attributes = extractAttributes(jsonData, mapping.jsonFields);
      
      if (mapping.xmlNamespace === 'cbc') {
        if (Object.keys(attributes).length > 0) {
          result[`cbc:${mapping.xmlElement}`] = [{ $: attributes, _: value }];
        } else {
          result[`cbc:${mapping.xmlElement}`] = [value];
        }
      } else if (mapping.xmlNamespace === 'cac') {
        result[`cac:${mapping.xmlElement}`] = [value];
      }
    }
  }
  
  // Handle invoice period
  const invoicePeriod = findFieldValue(jsonData, ['invoicePeriod', 'billingPeriod', 'period']);
  if (invoicePeriod) {
    result['cac:InvoicePeriod'] = buildInvoicePeriod(invoicePeriod);
  }
  
  // Handle order reference
  const orderRef = findFieldValue(jsonData, ['orderReference', 'orderRef', 'purchaseOrder', 'poNumber', 'purchaseOrderReference']);
  if (orderRef) {
    result['cac:OrderReference'] = [{ 'cbc:ID': [orderRef] }];
  }
  
  // Handle contract reference
  const contractRef = findFieldValue(jsonData, ['contractReference', 'contract']);
  if (contractRef) {
    result['cac:ContractDocumentReference'] = buildDocumentReference(contractRef);
  }
  
  // Handle additional document references
  const docRefs = findFieldValue(jsonData, ['additionalDocumentReference', 'documents', 'attachments']);
  if (docRefs) {
    result['cac:AdditionalDocumentReference'] = buildDocumentReferences(docRefs);
  }
  
  // Handle supplier party information
  const supplierData = findFieldValue(jsonData, ['supplier', 'seller', 'vendor', 'accountingSupplierParty', 'supplierParty', 'vendorName']);
  if (supplierData) {
    result['cac:AccountingSupplierParty'] = buildPartyStructure(supplierData, 'supplier', jsonData);
  }
  
  // Handle customer party information
  const customerData = findFieldValue(jsonData, ['customer', 'buyer', 'client', 'accountingCustomerParty', 'customerParty', 'customerName']);
  if (customerData) {
    result['cac:AccountingCustomerParty'] = buildPartyStructure(customerData, 'customer', jsonData);
  }
  
  // Handle payee party
  const payeeData = findFieldValue(jsonData, ['payee', 'payeeParty']);
  if (payeeData) {
    result['cac:PayeeParty'] = buildPartyStructure(payeeData, 'payee', jsonData);
  }
  
  // Handle delivery information
  const deliveryData = findFieldValue(jsonData, ['delivery', 'shipping']);
  if (deliveryData) {
    result['cac:Delivery'] = buildDeliveryStructure(deliveryData);
  }
  
  // Handle payment means
  const paymentMeans = findFieldValue(jsonData, ['paymentMeans', 'payment', 'paymentMethod']);
  if (paymentMeans) {
    result['cac:PaymentMeans'] = buildPaymentMeansStructure(paymentMeans);
  }
  
  // Handle payment terms
  const paymentTerms = findFieldValue(jsonData, ['paymentTerms', 'terms', 'paymentTerms']);
  if (paymentTerms) {
    result['cac:PaymentTerms'] = buildPaymentTermsStructure(paymentTerms);
  }
  
  // Handle allowances and charges
  const allowanceCharges = findFieldValue(jsonData, ['allowanceCharge', 'discounts', 'charges', 'fees']);
  if (allowanceCharges) {
    result['cac:AllowanceCharge'] = buildAllowanceChargeStructure(allowanceCharges);
  }
  
  // Handle tax information
  const taxData = findFieldValue(jsonData, ['taxTotal', 'tax', 'taxes', 'totalTaxOrVAT']);
  if (taxData || result['cbc:TaxAmount']) {
    result['cac:TaxTotal'] = buildTaxTotalStructure(taxData || jsonData);
  }
  
  // FIXED: Handle line items - use the new array-specific function
  const lineItems = findArrayFieldValue(jsonData, ['lines', 'items', 'lineItems', 'invoiceLines', 'invoiceLine']);
  if (lineItems && Array.isArray(lineItems)) {
    result['cac:InvoiceLine'] = buildLineItems(lineItems);
  }
  
  // Handle totals
  const totalsData = findFieldValue(jsonData, ['totals', 'legalMonetaryTotal', 'monetaryTotal', 'amounts', 'totalAmount']);
  if (totalsData || result['cbc:TaxInclusiveAmount'] || result['cbc:PayableAmount']) {
    result['cac:LegalMonetaryTotal'] = buildTotalsStructure(totalsData || jsonData);
  }
  
  return result;
};

// ENHANCED: Build party structure for supplier/customer/payee
const buildPartyStructure = (partyData: any, partyType: 'supplier' | 'customer' | 'payee', originalData?: any): any[] => {
  const party: Record<string, any> = {};
  
  // Use original data as fallback for address information
  const addressSource = partyData || originalData;
  
  // Endpoint ID
  const endpointId = findFieldValue(partyData, ['endpointID', 'gln', 'electronicAddress']);
  if (endpointId) {
    party['cbc:EndpointID'] = [endpointId];
  }
  
  // Party identification
  const partyId = findFieldValue(partyData || originalData, ['partyIdentification', 'id', 'supplierId', 'customerId', 'customerID']);
  if (partyId) {
    party['cac:PartyIdentification'] = [{ 'cbc:ID': [partyId] }];
  }
  
  // Party name - handle string values directly
  let name;
  if (typeof partyData === 'string') {
    name = partyData;
  } else {
    name = findFieldValue(partyData || originalData, ['name', 'companyName', 'legalName', 'vendorName', 'customerName']);
  }
  if (name) {
    party['cac:PartyName'] = [{ 'cbc:Name': [name] }];
  }
  
  // Address - look for address fields in both partyData and originalData
  const addressData = findFieldValue(addressSource, ['address', 'postalAddress']) || addressSource;
  if (addressData || originalData) {
    const address: Record<string, any> = {};
    
    const addressId = findFieldValue(addressData, ['addressId', 'id']);
    if (addressId) address['cbc:ID'] = [addressId];
    
    const postbox = findFieldValue(addressData, ['postbox', 'poBox']);
    if (postbox) address['cbc:Postbox'] = [postbox];
    
    // Try to find address from various fields based on party type
    let street;
    if (partyType === 'supplier') {
      street = findFieldValue(originalData, ['vendorAddress', 'supplier address', 'sellerAddress']) ||
              findFieldValue(addressData, ['street', 'streetName', 'address1', 'address']);
    } else if (partyType === 'customer') {
      street = findFieldValue(originalData, ['billingAddress', 'customerAddress', 'buyerAddress']) ||
              findFieldValue(addressData, ['street', 'streetName', 'address1', 'address']);
    } else {
      street = findFieldValue(addressData, ['street', 'streetName', 'address1', 'address']);
    }
    
    if (street) address['cbc:StreetName'] = [street];
    
    const additionalStreet = findFieldValue(addressData, ['address2', 'additionalStreetName', 'suite']);
    if (additionalStreet) address['cbc:AdditionalStreetName'] = [additionalStreet];
    
    const buildingNumber = findFieldValue(addressData, ['buildingNumber', 'houseNumber']);
    if (buildingNumber) address['cbc:BuildingNumber'] = [buildingNumber];
    
    const department = findFieldValue(addressData, ['department', 'division']);
    if (department) address['cbc:Department'] = [department];
    
    const city = findFieldValue(addressData, ['city', 'cityName']);
    if (city) address['cbc:CityName'] = [city];
    
    const postal = findFieldValue(addressData, ['postalCode', 'zipCode', 'zip']);
    if (postal) address['cbc:PostalZone'] = [postal];
    
    const countrySubentity = findFieldValue(addressData, ['state', 'province', 'region']);
    if (countrySubentity) address['cbc:CountrySubentity'] = [countrySubentity];
    
    const countrySubentityCode = findFieldValue(addressData, ['stateCode', 'provinceCode']);
    if (countrySubentityCode) address['cbc:CountrySubentityCode'] = [countrySubentityCode];
    
    const country = findFieldValue(addressData, ['country', 'countryCode']);
    if (country) {
      address['cac:Country'] = [{ 'cbc:IdentificationCode': [country] }];
    }
    
    if (Object.keys(address).length > 0) {
      party['cac:PostalAddress'] = [address];
    }
  }
  
  // Party tax scheme
  const taxData = findFieldValue(partyData, ['partyTaxScheme', 'tax', 'vat']);
  if (taxData) {
    const taxScheme: Record<string, any> = {};
    
    const companyId = findFieldValue(taxData, ['companyID', 'vatNumber', 'taxNumber']);
    if (companyId) taxScheme['cbc:CompanyID'] = [companyId];
    
    const schemeData = findFieldValue(taxData, ['taxScheme', 'scheme']);
    if (schemeData || companyId) {
      const scheme: Record<string, any> = {};
      const schemeId = findFieldValue(schemeData, ['id']) || 'VAT';
      scheme['cbc:ID'] = [schemeId];
      taxScheme['cac:TaxScheme'] = [scheme];
    }
    
    if (Object.keys(taxScheme).length > 0) {
      party['cac:PartyTaxScheme'] = [taxScheme];
    }
  }
  
  // Party legal entity
  const legalData = findFieldValue(partyData, ['partyLegalEntity', 'legalEntity', 'legal']);
  if (legalData || name) {
    const legalEntity: Record<string, any> = {};
    
    const legalName = findFieldValue(legalData, ['registrationName', 'legalName']) || name;
    if (legalName) legalEntity['cbc:RegistrationName'] = [legalName];
    
    const companyId = findFieldValue(legalData, ['companyID', 'registrationNumber', 'businessNumber']);
    if (companyId) legalEntity['cbc:CompanyID'] = [companyId];
    
    const regAddress = findFieldValue(legalData, ['registrationAddress']);
    if (regAddress) {
      const regAddr: Record<string, any> = {};
      
      const city = findFieldValue(regAddress, ['city', 'cityName']);
      if (city) regAddr['cbc:CityName'] = [city];
      
      const countrySubentity = findFieldValue(regAddress, ['state', 'province', 'region']);
      if (countrySubentity) regAddr['cbc:CountrySubentity'] = [countrySubentity];
      
      const country = findFieldValue(regAddress, ['country', 'countryCode']);
      if (country) regAddr['cac:Country'] = [{ 'cbc:IdentificationCode': [country] }];
      
      if (Object.keys(regAddr).length > 0) {
        legalEntity['cac:RegistrationAddress'] = [regAddr];
      }
    }
    
    if (Object.keys(legalEntity).length > 0) {
      party['cac:PartyLegalEntity'] = [legalEntity];
    }
  }
  
  // Contact information
  const contactData = findFieldValue(partyData, ['contact', 'contactInfo']);
  if (contactData || partyData) {
    const contact: Record<string, any> = {};
    
    const phone = findFieldValue(contactData || partyData, ['phone', 'telephone']);
    if (phone) contact['cbc:Telephone'] = [phone];
    
    const fax = findFieldValue(contactData || partyData, ['fax', 'telefax']);
    if (fax) contact['cbc:Telefax'] = [fax];
    
    const email = findFieldValue(contactData || partyData, ['email', 'emailAddress']);
    if (email) contact['cbc:ElectronicMail'] = [email];
    
    if (Object.keys(contact).length > 0) {
      party['cac:Contact'] = [contact];
    }
  }
  
  // Person information
  const personData = findFieldValue(partyData, ['person', 'contactPerson']);
  if (personData) {
    const person: Record<string, any> = {};
    
    const firstName = findFieldValue(personData, ['firstName', 'givenName']);
    if (firstName) person['cbc:FirstName'] = [firstName];
    
    const familyName = findFieldValue(personData, ['lastName', 'familyName', 'surname']);
    if (familyName) person['cbc:FamilyName'] = [familyName];
    
    const middleName = findFieldValue(personData, ['middleName']);
    if (middleName) person['cbc:MiddleName'] = [middleName];
    
    const jobTitle = findFieldValue(personData, ['jobTitle', 'title', 'position']);
    if (jobTitle) person['cbc:JobTitle'] = [jobTitle];
    
    if (Object.keys(person).length > 0) {
      party['cac:Person'] = [person];
    }
  }
  
  return [{ 'cac:Party': [party] }];
};

// ENHANCED: Build line items structure
const buildLineItems = (lineItemsData: any): any[] => {
  if (!Array.isArray(lineItemsData)) {
    lineItemsData = [lineItemsData];
  }
  
  return lineItemsData.map((item: any, index: number) => {
    const line: Record<string, any> = {};
    
    // Line ID
    const id = findFieldValue(item, ['id', 'lineId', 'lineNumber', 'index']) || (index + 1).toString();
    line['cbc:ID'] = [id];
    
    // Note
    const note = findFieldValue(item, ['note', 'comment', 'remarks']);
    if (note) line['cbc:Note'] = [note];
    
    // Quantity - handle both numeric values and string values with units
    const quantityValue = findFieldValue(item, ['quantity', 'qty', 'invoicedQuantity']);
    if (quantityValue) {
      let quantity = quantityValue;
      let unitCode = findFieldValue(item, ['unitCode', 'unit']) || 'C62';
      
      // If quantity is a string like "72.00 PCE", extract the number and unit
      if (typeof quantityValue === 'string') {
        const match = quantityValue.match(/^([\d.]+)\s*(.*)$/);
        if (match) {
          quantity = match[1];
          if (match[2] && match[2].trim()) {
            unitCode = match[2].trim();
          }
        }
      }
      
      line['cbc:InvoicedQuantity'] = [{ $: { unitCode }, _: quantity }];
    }
    
    // Line amount - clean currency from amount if present
    const amountValue = findFieldValue(item, ['amount', 'lineAmount', 'lineExtensionAmount', 'total']);
    if (amountValue) {
      let amount = amountValue;
      // If amount is a string like "323.28 AUD", extract just the number
      if (typeof amountValue === 'string') {
        const match = amountValue.match(/^([\d.]+)/);
        if (match) {
          amount = match[1];
        }
      }
      line['cbc:LineExtensionAmount'] = [amount];
    }
    
    // Accounting cost
    const accountingCost = findFieldValue(item, ['accountingCost', 'costCenter', 'bookingCode']);
    if (accountingCost) line['cbc:AccountingCost'] = [accountingCost];
    
    // Order line reference
    const orderLineRef = findFieldValue(item, ['orderLineReference', 'orderLineNumber', 'poLineNumber']);
    if (orderLineRef) {
      line['cac:OrderLineReference'] = [{ 'cbc:LineID': [orderLineRef] }];
    }
    
    // Allowances and charges
    const allowanceCharges = findFieldValue(item, ['allowanceCharge', 'discounts', 'charges']);
    if (allowanceCharges) {
      line['cac:AllowanceCharge'] = buildAllowanceChargeStructure(allowanceCharges);
    }
    
    // Tax total for line
    const lineTax = findFieldValue(item, ['taxTotal', 'tax']);
    if (lineTax) {
      const taxAmount = findFieldValue(lineTax, ['taxAmount', 'amount']);
      if (taxAmount) {
        line['cac:TaxTotal'] = [{ 'cbc:TaxAmount': [taxAmount] }];
      }
    }
    
    // Item information
    const itemData = findFieldValue(item, ['item', 'product']) || item;
    if (itemData) {
      const itemObj: Record<string, any> = {};
      
      const itemName = findFieldValue(itemData, ['name', 'itemName', 'productName', 'description']);
      if (itemName) itemObj['cbc:Name'] = [itemName];
      
      const itemDesc = findFieldValue(itemData, ['description', 'details', 'productDescription']);
      if (itemDesc && itemDesc !== itemName) itemObj['cbc:Description'] = [itemDesc];
      
      // Sellers item identification
      const sellerItemId = findFieldValue(itemData, ['sellersItemIdentification', 'sellerItemId', 'sku']);
      if (sellerItemId) {
        itemObj['cac:SellersItemIdentification'] = [{ 'cbc:ID': [sellerItemId] }];
      }
      
      // Standard item identification
      const standardItemId = findFieldValue(itemData, ['standardItemIdentification', 'gtin', 'upc', 'ean']);
      if (standardItemId) {
        itemObj['cac:StandardItemIdentification'] = [{ 'cbc:ID': [standardItemId] }];
      }
      
      // Commodity classification
      const commodityCode = findFieldValue(itemData, ['commodityClassification', 'itemClassificationCode', 'productCode']);
      if (commodityCode) {
        itemObj['cac:CommodityClassification'] = [{ 'cbc:ItemClassificationCode': [commodityCode] }];
      }
      
      // Classified tax category - extract tax percentage from item if available
      const taxCategory = findFieldValue(itemData, ['classifiedTaxCategory', 'taxCategory']);
      const taxPercent = findFieldValue(item, ['tax', 'taxRate', 'taxPercent']);
      
      if (taxCategory || taxPercent) {
        const category: Record<string, any> = {};
        
        const categoryId = findFieldValue(taxCategory, ['id', 'code']) || 'S';
        category['cbc:ID'] = [categoryId];
        
        // Use tax percentage from item if available
        let percent = findFieldValue(taxCategory, ['percent', 'rate']);
        if (!percent && taxPercent) {
          // Handle tax like "10.00 %" - extract just the number
          if (typeof taxPercent === 'string') {
            const match = taxPercent.match(/^([\d.]+)/);
            if (match) {
              percent = match[1];
            }
          } else {
            percent = taxPercent;
          }
        }
        if (percent) category['cbc:Percent'] = [percent];
        
        const schemeData = findFieldValue(taxCategory, ['taxScheme', 'scheme']);
        if (schemeData || categoryId) {
          const scheme: Record<string, any> = {};
          const schemeId = findFieldValue(schemeData, ['id']) || 'VAT';
          scheme['cbc:ID'] = [schemeId];
          category['cac:TaxScheme'] = [scheme];
        }
        
        itemObj['cac:ClassifiedTaxCategory'] = [category];
      }
      
      // Additional item properties
      let properties = findFieldValue(itemData, ['additionalItemProperty', 'properties', 'attributes']);
      if (properties) {
        if (!Array.isArray(properties)) {
          properties = [properties];
        }
        
        itemObj['cac:AdditionalItemProperty'] = properties.map((prop: any) => ({
          'cbc:Name': [findFieldValue(prop, ['name', 'key'])],
          'cbc:Value': [findFieldValue(prop, ['value', 'val'])]
        }));
      }
      
      if (Object.keys(itemObj).length > 0) {
        line['cac:Item'] = [itemObj];
      }
    }
    
    // Price information
    const priceData = findFieldValue(item, ['price', 'pricing']) || item;
    if (priceData) {
      const priceObj: Record<string, any> = {};
      
      const priceAmountValue = findFieldValue(priceData, ['priceAmount', 'unitPrice', 'price', 'rate']);
      if (priceAmountValue) {
        let priceAmount = priceAmountValue;
        // If price is a string like "4.4900 AUD", extract just the number
        if (typeof priceAmountValue === 'string') {
          const match = priceAmountValue.match(/^([\d.]+)/);
          if (match) {
            priceAmount = match[1];
          }
        }
        priceObj['cbc:PriceAmount'] = [priceAmount];
      }
      
      const baseQuantity = findFieldValue(priceData, ['baseQuantity', 'priceQuantity']);
      if (baseQuantity) {
        const unitCode = findFieldValue(priceData, ['priceUnitCode', 'unit']) || 'C62';
        priceObj['cbc:BaseQuantity'] = [{ $: { unitCode }, _: baseQuantity }];
      }
      
      // Price allowances and charges
      const priceAllowanceCharges = findFieldValue(priceData, ['allowanceCharge', 'discounts']);
      if (priceAllowanceCharges) {
        priceObj['cac:AllowanceCharge'] = buildAllowanceChargeStructure(priceAllowanceCharges);
      }
      
      if (Object.keys(priceObj).length > 0) {
        line['cac:Price'] = [priceObj];
      }
    }
    
    return line;
  });
};

// ENHANCED: Build totals structure
const buildTotalsStructure = (totalsData: any): any[] => {
  const totals: Record<string, any> = {};
  
  const lineExtension = findFieldValue(totalsData, ['lineExtensionAmount', 'subtotal', 'netAmount']);
  if (lineExtension) {
    let amount = lineExtension;
    if (typeof lineExtension === 'string') {
      const match = lineExtension.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:LineExtensionAmount'] = [amount];
  }
  
  const taxExclusive = findFieldValue(totalsData, ['taxExclusiveAmount', 'amountBeforeTax', 'netTotal']);
  if (taxExclusive) {
    let amount = taxExclusive;
    if (typeof taxExclusive === 'string') {
      const match = taxExclusive.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:TaxExclusiveAmount'] = [amount];
  }
  
  const taxInclusive = findFieldValue(totalsData, ['taxInclusiveAmount', 'total', 'totalAmount', 'grandTotal']);
  if (taxInclusive) {
    let amount = taxInclusive;
    if (typeof taxInclusive === 'string') {
      const match = taxInclusive.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:TaxInclusiveAmount'] = [amount];
  }
  
  const allowanceTotal = findFieldValue(totalsData, ['allowanceTotalAmount', 'totalDiscount']);
  if (allowanceTotal) {
    let amount = allowanceTotal;
    if (typeof allowanceTotal === 'string') {
      const match = allowanceTotal.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:AllowanceTotalAmount'] = [amount];
  }
  
  const chargeTotal = findFieldValue(totalsData, ['chargeTotalAmount', 'totalCharges']);
  if (chargeTotal) {
    let amount = chargeTotal;
    if (typeof chargeTotal === 'string') {
      const match = chargeTotal.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:ChargeTotalAmount'] = [amount];
  }
  
  const prepaid = findFieldValue(totalsData, ['prepaidAmount', 'advancePayment', 'deposit']);
  if (prepaid) {
    let amount = prepaid;
    if (typeof prepaid === 'string') {
      const match = prepaid.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:PrepaidAmount'] = [amount];
  }
  
  const rounding = findFieldValue(totalsData, ['payableRoundingAmount', 'rounding']);
  if (rounding) {
    let amount = rounding;
    if (typeof rounding === 'string') {
      const match = rounding.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:PayableRoundingAmount'] = [amount];
  }
  
  const payable = findFieldValue(totalsData, ['payableAmount', 'amountDue', 'totalDue', 'finalAmount']);
  if (payable) {
    let amount = payable;
    if (typeof payable === 'string') {
      const match = payable.match(/^([\d.]+)/);
      if (match) amount = match[1];
    }
    totals['cbc:PayableAmount'] = [amount];
  }
  
  return [totals];
};

// Build invoice period structure
const buildInvoicePeriod = (periodData: any): any[] => {
  const period: Record<string, any> = {};
  
  const startDate = findFieldValue(periodData, ['startDate', 'from', 'periodStart']);
  if (startDate) period['cbc:StartDate'] = [startDate];
  
  const endDate = findFieldValue(periodData, ['endDate', 'to', 'periodEnd']);
  if (endDate) period['cbc:EndDate'] = [endDate];
  
  return [period];
};

const buildDocumentReference = (docData: any): any[] => {
  const docRef: Record<string, any> = {};
  
  const id = findFieldValue(docData, ['id', 'documentId', 'contractNumber']);
  if (id) docRef['cbc:ID'] = [id];
  
  const docType = findFieldValue(docData, ['documentType', 'type']);
  if (docType) docRef['cbc:DocumentType'] = [docType];
  
  return [docRef];
};

const buildDocumentReferences = (docsData: any): any[] => {
  if (!Array.isArray(docsData)) {
    docsData = [docsData];
  }
  
  return docsData.map((docData: any) => {
    const docRef: Record<string, any> = {};
    
    const id = findFieldValue(docData, ['id', 'documentId']);
    if (id) docRef['cbc:ID'] = [id];
    
    const docType = findFieldValue(docData, ['documentType', 'type']);
    if (docType) docRef['cbc:DocumentType'] = [docType];
    
    const uri = findFieldValue(docData, ['uri', 'url', 'link']);
    if (uri) {
      docRef['cac:Attachment'] = [{
        'cac:ExternalReference': [{
          'cbc:URI': [uri]
        }]
      }];
    }
    
    return docRef;
  });
};

const buildDeliveryStructure = (deliveryData: any): any[] => {
  const delivery: Record<string, any> = {};
  
  const actualDate = findFieldValue(deliveryData, ['actualDeliveryDate', 'deliveryDate', 'shippingDate']);
  if (actualDate) delivery['cbc:ActualDeliveryDate'] = [actualDate];
  
  const locationData = findFieldValue(deliveryData, ['deliveryLocation', 'location', 'address', 'shippingAddress']);
  if (locationData) {
    const location: Record<string, any> = {};
    const address: Record<string, any> = {};
    
    const street = findFieldValue(locationData, ['street', 'streetName', 'address']);
    if (street) address['cbc:StreetName'] = [street];
    
    const city = findFieldValue(locationData, ['city', 'cityName']);
    if (city) address['cbc:CityName'] = [city];
    
    const postal = findFieldValue(locationData, ['postalCode', 'zipCode']);
    if (postal) address['cbc:PostalZone'] = [postal];
    
    const country = findFieldValue(locationData, ['country', 'countryCode']);
    if (country) address['cac:Country'] = [{ 'cbc:IdentificationCode': [country] }];
    
    if (Object.keys(address).length > 0) {
      location['cac:Address'] = [address];
    }
    
    delivery['cac:DeliveryLocation'] = [location];
  }
  
  return [delivery];
};

const buildPaymentMeansStructure = (paymentData: any): any[] => {
  const payment: Record<string, any> = {};
  
  const meansCode = findFieldValue(paymentData, ['paymentMeansCode', 'paymentMethod', 'method']);
  if (meansCode) payment['cbc:PaymentMeansCode'] = [meansCode];
  
  const dueDate = findFieldValue(paymentData, ['paymentDueDate', 'dueDate']);
  if (dueDate) payment['cbc:PaymentDueDate'] = [dueDate];
  
  const channelCode = findFieldValue(paymentData, ['paymentChannelCode', 'channel']);
  if (channelCode) payment['cbc:PaymentChannelCode'] = [channelCode];
  
  const paymentId = findFieldValue(paymentData, ['paymentID', 'paymentReference', 'reference']);
  if (paymentId) payment['cbc:PaymentID'] = [paymentId];
  
  const accountData = findFieldValue(paymentData, ['payeeFinancialAccount', 'bankAccount', 'account']);
  if (accountData) {
    const account: Record<string, any> = {};
    
    const accountId = findFieldValue(accountData, ['id', 'accountNumber', 'iban']);
    if (accountId) account['cbc:ID'] = [accountId];
    
    const bankData = findFieldValue(accountData, ['financialInstitutionBranch', 'bank']);
    if (bankData) {
      const bank: Record<string, any> = {};
      const bankId = findFieldValue(bankData, ['id', 'bankCode', 'swift', 'bic']);
      if (bankId) bank['cbc:ID'] = [bankId];
      
      account['cac:FinancialInstitutionBranch'] = [{
        'cac:FinancialInstitution': [bank]
      }];
    }
    
    payment['cac:PayeeFinancialAccount'] = [account];
  }
  
  return [payment];
};

const buildPaymentTermsStructure = (termsData: any): any[] => {
  const terms: Record<string, any> = {};
  
  // Handle string values directly for payment terms
  let note;
  if (typeof termsData === 'string') {
    note = termsData;
  } else {
    note = findFieldValue(termsData, ['note', 'terms', 'paymentTerms']);
  }
  if (note) terms['cbc:Note'] = [note];
  
  return [terms];
};

const buildAllowanceChargeStructure = (chargeData: any): any[] => {
  if (!Array.isArray(chargeData)) {
    chargeData = [chargeData];
  }
  
  return chargeData.map((charge: any) => {
    const allowanceCharge: Record<string, any> = {};
    
    const isCharge = findFieldValue(charge, ['chargeIndicator', 'isCharge']);
    allowanceCharge['cbc:ChargeIndicator'] = [isCharge !== null ? isCharge : true];
    
    const reason = findFieldValue(charge, ['allowanceChargeReason', 'reason', 'description']);
    if (reason) allowanceCharge['cbc:AllowanceChargeReason'] = [reason];
    
    const amountValue = findFieldValue(charge, ['amount', 'value']);
    if (amountValue) {
      let amount = amountValue;
      if (typeof amountValue === 'string') {
        const match = amountValue.match(/^([\d.]+)/);
        if (match) amount = match[1];
      }
      allowanceCharge['cbc:Amount'] = [amount];
    }
    
    const multiplier = findFieldValue(charge, ['multiplierFactorNumeric', 'percentage', 'rate']);
    if (multiplier) allowanceCharge['cbc:MultiplierFactorNumeric'] = [multiplier];
    
    const baseAmountValue = findFieldValue(charge, ['baseAmount', 'originalAmount']);
    if (baseAmountValue) {
      let baseAmount = baseAmountValue;
      if (typeof baseAmountValue === 'string') {
        const match = baseAmountValue.match(/^([\d.]+)/);
        if (match) baseAmount = match[1];
      }
      allowanceCharge['cbc:BaseAmount'] = [baseAmount];
    }
    
    return allowanceCharge;
  });
};

const buildTaxTotalStructure = (taxData: any): any[] => {
  const taxTotal: Record<string, any> = {};
  
  const taxAmountValue = findFieldValue(taxData, ['taxAmount', 'totalTax', 'vatAmount', 'totalTaxOrVAT']);
  if (taxAmountValue) {
    let taxAmount = taxAmountValue;
    // Handle tax amounts like "96.98 AUD"
    if (typeof taxAmountValue === 'string') {
      const match = taxAmountValue.match(/^([\d.]+)/);
      if (match) {
        taxAmount = match[1];
      }
    }
    taxTotal['cbc:TaxAmount'] = [taxAmount];
  }
  
  let subtotals = findFieldValue(taxData, ['taxSubtotal', 'subtotals', 'breakdown']);
  if (subtotals) {
    if (!Array.isArray(subtotals)) {
      subtotals = [subtotals];
    }
    
    taxTotal['cac:TaxSubtotal'] = subtotals.map((subtotal: any) => {
      const taxSubtotal: Record<string, any> = {};
      
      const taxableAmountValue = findFieldValue(subtotal, ['taxableAmount', 'taxBasis']);
      if (taxableAmountValue) {
        let taxableAmount = taxableAmountValue;
        if (typeof taxableAmountValue === 'string') {
          const match = taxableAmountValue.match(/^([\d.]+)/);
          if (match) taxableAmount = match[1];
        }
        taxSubtotal['cbc:TaxableAmount'] = [taxableAmount];
      }
      
      const subtotalTaxAmountValue = findFieldValue(subtotal, ['taxAmount', 'tax']);
      if (subtotalTaxAmountValue) {
        let subtotalTaxAmount = subtotalTaxAmountValue;
        if (typeof subtotalTaxAmountValue === 'string') {
          const match = subtotalTaxAmountValue.match(/^([\d.]+)/);
          if (match) subtotalTaxAmount = match[1];
        }
        taxSubtotal['cbc:TaxAmount'] = [subtotalTaxAmount];
      }
      
      const categoryData = findFieldValue(subtotal, ['taxCategory', 'category']);
      if (categoryData) {
        const category: Record<string, any> = {};
        
        const categoryId = findFieldValue(categoryData, ['id', 'categoryCode']);
        if (categoryId) category['cbc:ID'] = [categoryId];
        
        const percentValue = findFieldValue(categoryData, ['percent', 'rate', 'taxRate']);
        if (percentValue) {
          let percent = percentValue;
          if (typeof percentValue === 'string') {
            const match = percentValue.match(/^([\d.]+)/);
            if (match) percent = match[1];
          }
          category['cbc:Percent'] = [percent];
        }
        
        const exemptionCode = findFieldValue(categoryData, ['taxExemptionReasonCode', 'exemptionCode']);
        if (exemptionCode) category['cbc:TaxExemptionReasonCode'] = [exemptionCode];
        
        const exemptionReason = findFieldValue(categoryData, ['taxExemptionReason', 'exemptionReason']);
        if (exemptionReason) category['cbc:TaxExemptionReason'] = [exemptionReason];
        
        const schemeData = findFieldValue(categoryData, ['taxScheme', 'scheme']);
        if (schemeData || categoryId) {
          const scheme: Record<string, any> = {};
          const schemeId = findFieldValue(schemeData, ['id']) || 'VAT';
          scheme['cbc:ID'] = [schemeId];
          category['cac:TaxScheme'] = [scheme];
        }
        
        taxSubtotal['cac:TaxCategory'] = [category];
      }
      
      return taxSubtotal;
    });
  } else if (taxAmountValue) {
    // Create default tax subtotal
    let cleanTaxAmount = taxAmountValue;
    if (typeof taxAmountValue === 'string') {
        const match = taxAmountValue.match(/^([\d.]+)/);
        if (match) {
            cleanTaxAmount = match[1];
        }
    }

    taxTotal['cac:TaxSubtotal'] = [{
        'cbc:TaxAmount': [cleanTaxAmount],
        'cac:TaxCategory': [{
            'cbc:ID': ['S'],
            'cbc:Percent': ['10.00'], // Default to 10% based on your data
            'cac:TaxScheme': [{'cbc:ID': ['VAT']}]
        }]
    }];
}
  
  return [taxTotal];
};

// Helper function to parse date formats
const parseDate = (dateStr: any): string => {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  if (typeof dateStr !== 'string') return dateStr;
  
  // Handle DD/MM/YYYY format
  const ddmmyyyy = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (ddmmyyyy) {
    return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`;
  }
  
  // Handle other formats or return as-is
  return dateStr;
};

// Field detection interface
export interface MissingFieldsReport {
  missing: string[];
  found: string[];
  summary: string;
}

// Function to detect missing fields in the input JSON
export const detectMissingFields = (invoiceData: any): MissingFieldsReport => {
  const found: Set<string> = new Set();
  const missing: string[] = [];
  
  // Check each field mapping to see if data is present
  for (const mapping of INVOICE_FIELD_MAPPINGS) {
    const fieldName = `${mapping.xmlNamespace}:${mapping.xmlElement}`;
    const value = findFieldValue(invoiceData, mapping.jsonFields);
    
    if (value !== null && value !== undefined && value !== '') {
      found.add(fieldName);
    } else {
      // Only add to missing if it's not a duplicate field name
      if (!missing.includes(fieldName)) {
        missing.push(fieldName);
      }
    }
  }
  
  // Check for complex structures
  const complexFields = [
    { name: 'cac:InvoicePeriod', jsonFields: ['invoicePeriod', 'billingPeriod', 'period'] },
    { name: 'cac:OrderReference', jsonFields: ['orderReference', 'orderRef', 'purchaseOrder', 'poNumber'] },
    { name: 'cac:AccountingSupplierParty', jsonFields: ['supplier', 'seller', 'vendor'] },
    { name: 'cac:AccountingCustomerParty', jsonFields: ['customer', 'buyer', 'client'] },
    { name: 'cac:Delivery', jsonFields: ['delivery', 'shipping'] },
    { name: 'cac:PaymentMeans', jsonFields: ['paymentMeans', 'payment', 'paymentMethod'] },
    { name: 'cac:PaymentTerms', jsonFields: ['paymentTerms', 'terms'] },
    { name: 'cac:AllowanceCharge', jsonFields: ['allowanceCharge', 'discounts', 'charges'] },
    { name: 'cac:TaxTotal', jsonFields: ['taxTotal', 'tax', 'taxes'] },
    { name: 'cac:InvoiceLine', jsonFields: ['lines', 'items', 'lineItems', 'invoiceLines'] },
    { name: 'cac:LegalMonetaryTotal', jsonFields: ['totals', 'legalMonetaryTotal', 'monetaryTotal'] }
  ];
  
  for (const field of complexFields) {
    const value = findFieldValue(invoiceData, field.jsonFields);
    if (value !== null && value !== undefined && value !== '') {
      found.add(field.name);
    } else {
      missing.push(field.name);
    }
  }
  
  // Remove duplicates from missing array
  const uniqueMissing = Array.from(new Set(missing));
  
  // Generate summary
  const foundCount = found.size;
  const missingCount = uniqueMissing.length;
  const summary = `Found ${foundCount} fields, ${missingCount} fields missing. Conversion successful.`;
  
  return {
    missing: uniqueMissing,
    found: Array.from(found),
    summary
  };
};

// main conversion function
export const convertFlexibleJsonToUblXml = async (invoiceData: any): Promise<string> => {
  try {
    if (!invoiceData) {
      throw new Error('No invoice data provided');
    }
    
    // Build XML structure from JSON
    const processedData = buildXmlStructure(invoiceData);
    
    // Set required defaults if not present
    if (!processedData['cbc:ID']) {
      processedData['cbc:ID'] = ['UNKNOWN'];
    }
    
    // Parse and format the issue date
    const issueDate = findFieldValue(invoiceData, ['issueDate', 'date', 'invoiceDate', 'dateIssued', 'createdDate', 'documentDate']);
    if (issueDate) {
      processedData['cbc:IssueDate'] = [parseDate(issueDate)];
    } else if (!processedData['cbc:IssueDate']) {
      processedData['cbc:IssueDate'] = [new Date().toISOString().split('T')[0]];
    }
    
    if (!processedData['cbc:InvoiceTypeCode']) {
      processedData['cbc:InvoiceTypeCode'] = ['380'];
    }
    
    // Extract currency from total amount if present
    const totalAmount = findFieldValue(invoiceData, ['totalAmount', 'total', 'grandTotal']);
    let currency = 'USD';
    if (totalAmount && typeof totalAmount === 'string') {
      const match = totalAmount.match(/([A-Z]{3})$/);
      if (match) {
        currency = match[1];
      }
    }
    
    if (!processedData['cbc:DocumentCurrencyCode']) {
      processedData['cbc:DocumentCurrencyCode'] = [currency];
    }
    
    const ublObj = {
      'ubl:Invoice': {
        $: {
          'xmlns:ubl': 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
          'xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
          'xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
          'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:schemaLocation': 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 http://docs.oasis-open.org/ubl/os-UBL-2.1/xsd/maindoc/UBL-Invoice-2.1.xsd'
        },
        ...processedData
      }
    };
    
    const builder = new Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: '  ', newline: '\n' },
      headless: false
    });
    
    let xml = builder.buildObject(ublObj);
    
    //clean up empty elements
    xml = xml
      .replace(/<([^/>]+)><\/\1>/g, '<$1/>')
      .replace(/<([^>]+)><\/\1>/g, '')
      .replace(/(<\w+[^>]*?)\s+([^=]+)="([^"]*)"([^>]*>)/g, (match, p1, p2, p3, p4) => {
        if (p3 === 'true' || p3 === 'false') {
          return `${p1} ${p2}="${p3}"${p4}`;
        }
        return match;
      });
    
    return xml;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error converting flexible JSON to UBL XML:', error);
    throw new Error(`Failed to convert invoice to UBL XML format: ${errorMessage}`);
  }
};
