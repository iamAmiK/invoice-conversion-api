"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedFixFields = exports.validateFixes = exports.applyFixesToInvoice = void 0;
/**
 * Maps friendly field names to their potential JSON keys and structures
 * This helps us know where to place the fixed values in the JSON
 */
const FIELD_MAPPING_REVERSE = {
    // Basic invoice fields
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
    // Reference fields
    'orderReference': { jsonKeys: ['orderReference', 'OrderReference'], dataType: 'identifier' },
    // Party fields
    'supplierName': { jsonKeys: ['supplier.name', 'supplier.companyName'], dataType: 'text' },
    'customerName': { jsonKeys: ['customer.name', 'customer.companyName'], dataType: 'text' },
    // Address fields
    'supplierStreet': { jsonKeys: ['supplier.address.street', 'supplier.street'], dataType: 'text' },
    'supplierCity': { jsonKeys: ['supplier.address.city', 'supplier.city'], dataType: 'text' },
    'supplierPostalCode': { jsonKeys: ['supplier.address.postalCode', 'supplier.postalCode'], dataType: 'text' },
    'supplierCountry': { jsonKeys: ['supplier.address.country', 'supplier.country'], dataType: 'text' },
    'customerStreet': { jsonKeys: ['customer.address.street', 'customer.street'], dataType: 'text' },
    'customerCity': { jsonKeys: ['customer.address.city', 'customer.city'], dataType: 'text' },
    'customerPostalCode': { jsonKeys: ['customer.address.postalCode', 'customer.postalCode'], dataType: 'text' },
    'customerCountry': { jsonKeys: ['customer.address.country', 'customer.country'], dataType: 'text' },
    // Contact fields
    'supplierPhone': { jsonKeys: ['supplier.phone', 'supplier.contact.phone'], dataType: 'text' },
    'supplierEmail': { jsonKeys: ['supplier.email', 'supplier.contact.email'], dataType: 'text' },
    'customerPhone': { jsonKeys: ['customer.phone', 'customer.contact.phone'], dataType: 'text' },
    'customerEmail': { jsonKeys: ['customer.email', 'customer.contact.email'], dataType: 'text' },
    // Delivery fields
    'deliveryDate': { jsonKeys: ['delivery.actualDeliveryDate', 'deliveryDate'], dataType: 'date' },
    // Payment fields
    'paymentMethod': { jsonKeys: ['paymentMeans.paymentMeansCode', 'paymentMethod'], dataType: 'code' },
    'paymentTerms': { jsonKeys: ['paymentTerms.note', 'paymentTerms'], dataType: 'text' },
    // Monetary fields
    'taxAmount': { jsonKeys: ['taxTotal.taxAmount', 'taxAmount'], dataType: 'amount' },
    'lineExtensionAmount': { jsonKeys: ['totals.lineExtensionAmount', 'lineExtensionAmount'], dataType: 'amount' },
    'taxExclusiveAmount': { jsonKeys: ['totals.taxExclusiveAmount', 'taxExclusiveAmount'], dataType: 'amount' },
    'taxInclusiveAmount': { jsonKeys: ['totals.taxInclusiveAmount', 'taxInclusiveAmount'], dataType: 'amount' },
    'payableAmount': { jsonKeys: ['totals.payableAmount', 'payableAmount'], dataType: 'amount' }
};
/**
 * Set a nested property in an object using dot notation
 */
const setNestedProperty = (obj, path, value) => {
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
/**
 * Check if a nested property exists in an object
 */
const hasNestedProperty = (obj, path) => {
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
/**
 * Merges fixes into the invoice JSON
 * @param invoiceData - Original invoice JSON
 * @param fixes - Object with friendly field names and their values
 * @returns Updated invoice JSON with fixes applied
 */
const applyFixesToInvoice = (invoiceData, fixes) => {
    // Deep clone the invoice data to avoid mutations
    const updatedInvoice = JSON.parse(JSON.stringify(invoiceData));
    // Iterate through each fix
    for (const [fieldName, value] of Object.entries(fixes)) {
        // Skip if value is null, undefined, or empty string
        if (value === null || value === undefined || value === '') {
            continue;
        }
        // Check if we have a mapping for this field
        const mapping = FIELD_MAPPING_REVERSE[fieldName];
        if (mapping) {
            // Try each possible JSON key until we find where to put it
            let placed = false;
            for (const jsonKey of mapping.jsonKeys) {
                // Check if this path already exists (don't overwrite)
                if (!hasNestedProperty(updatedInvoice, jsonKey)) {
                    setNestedProperty(updatedInvoice, jsonKey, value);
                    placed = true;
                    break;
                }
            }
            // If not placed yet, use the first key as default
            if (!placed) {
                const firstKey = mapping.jsonKeys[0];
                setNestedProperty(updatedInvoice, firstKey, value);
            }
        }
        else {
            // If no mapping found, try to place it at the root level with the exact key name
            // This allows for flexibility in case users provide UBL-style names or custom fields
            if (!updatedInvoice[fieldName]) {
                updatedInvoice[fieldName] = value;
            }
        }
    }
    return updatedInvoice;
};
exports.applyFixesToInvoice = applyFixesToInvoice;
/**
 * Validates that the fixes object is valid
 */
const validateFixes = (fixes) => {
    if (!fixes || typeof fixes !== 'object') {
        return { valid: false, error: 'Fixes must be a valid object' };
    }
    if (Array.isArray(fixes)) {
        return { valid: false, error: 'Fixes must be an object, not an array' };
    }
    // Check if at least one field is provided
    const keys = Object.keys(fixes);
    if (keys.length === 0) {
        return { valid: false, error: 'Fixes object cannot be empty' };
    }
    return { valid: true };
};
exports.validateFixes = validateFixes;
/**
 * Get a list of supported field names that can be fixed
 */
const getSupportedFixFields = () => {
    return Object.keys(FIELD_MAPPING_REVERSE).sort();
};
exports.getSupportedFixFields = getSupportedFixFields;
