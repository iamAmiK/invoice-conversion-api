# Flexible Invoice Conversion System

## Overview

The invoice conversion API has been enhanced to handle various JSON invoice structures with a flexible, header-based content extraction system. The API can now process invoices with different field names, nesting levels, and structures while still generating valid UBL XML output.

## Key Improvements

### 1. Flexible Field Mapping
- **Comprehensive field recognition**: The system recognizes over 30 different common field names for each invoice element
- **Case-insensitive matching**: Field names are matched regardless of case (e.g., `invoiceID`, `invoiceId`, `INVOICEID`)
- **Multiple naming conventions**: Supports various naming patterns like `invoiceNumber`, `invoiceId`, `id`, `number`, `documentId`

### 2. Recursive Content Extraction
- **Deep nesting support**: Can find relevant data at any nesting level
- **Multiple content formats**: Handles different value structures:
  - Simple values: `"invoiceId": "INV-001"`
  - Object values: `"invoiceId": {"value": "INV-001"}`
  - Array values: `"invoiceId": [{"content": "INV-001"}]`
  - Legacy UBL format: `"ID": [{"IdentifierContent": "INV-001"}]`

### 3. Permissive Validation
- **No strict requirements**: Only requires basic JSON object structure
- **Graceful missing fields**: Provides sensible defaults for required UBL fields
- **Backward compatibility**: Still supports the original strict format via `useFlexibleMapping: false`

## Supported JSON Structures

### Simple Structure
```json
{
  "id": "INV-001",
  "date": "2024-09-18",
  "supplierName": "ABC Corp",
  "customerName": "XYZ Ltd",
  "total": 1000.00,
  "currency": "USD"
}
```

### Standard Structure
```json
{
  "invoiceId": "INV-001",
  "issueDate": "2024-09-18",
  "supplier": {
    "name": "ABC Corp",
    "address": "123 Main St",
    "city": "New York",
    "email": "billing@abc.com"
  },
  "customer": {
    "name": "XYZ Ltd",
    "email": "ap@xyz.com"
  },
  "items": [
    {
      "description": "Product A",
      "quantity": 2,
      "price": 500.00,
      "amount": 1000.00
    }
  ],
  "subtotal": 1000.00,
  "tax": 100.00,
  "total": 1100.00
}
```

### Deeply Nested Structure
```json
{
  "document": {
    "header": {
      "invoiceNumber": "INV-001",
      "dateIssued": "2024-09-18"
    },
    "parties": {
      "seller": {
        "company": {
          "legalName": "ABC Corp",
          "contactDetails": {
            "address": {
              "street": "123 Main St",
              "city": "New York"
            },
            "communication": {
              "emailAddress": "billing@abc.com"
            }
          }
        }
      }
    }
  }
}
```

## API Usage

### Request Format
```json
{
  "invoiceType": "json",
  "outputFormat": "ubl xml",
  "invoiceData": { /* your invoice data in any supported format */ },
  "useFlexibleMapping": true  // optional, defaults to true
}
```

### Response
Returns valid UBL 2.1 XML format that complies with international standards.

## Field Mapping Examples

The system automatically maps common field names to UBL elements:

| JSON Field Names | UBL Element | Purpose |
|-----------------|-------------|---------|
| `id`, `invoiceId`, `invoiceNumber`, `number` | `cbc:ID` | Invoice identifier |
| `date`, `issueDate`, `invoiceDate`, `dateIssued` | `cbc:IssueDate` | Issue date |
| `currency`, `currencyCode`, `documentCurrencyCode` | `cbc:DocumentCurrencyCode` | Currency |
| `supplierName`, `sellerName`, `vendorName` | Supplier name | Supplier identification |
| `customerName`, `buyerName`, `clientName` | Customer name | Customer identification |
| `total`, `totalAmount`, `grandTotal` | `cbc:TaxInclusiveAmount` | Total amount |
| `subtotal`, `netAmount`, `taxExclusiveAmount` | `cbc:TaxExclusiveAmount` | Amount before tax |

## Benefits

1. **Broader Compatibility**: Works with invoices from various systems and formats
2. **Reduced Integration Effort**: No need to transform your data to match strict schemas
3. **Fault Tolerance**: Continues processing even when some fields are missing
4. **Backward Compatibility**: Existing integrations continue to work unchanged
5. **Standards Compliant**: Still generates valid UBL 2.1 XML output

## Migration Guide

### For New Integrations
Simply send your invoice data in any reasonable JSON structure. The system will automatically extract relevant information.

### For Existing Integrations
Your existing code will continue to work without changes. To opt into flexible mapping, add `"useFlexibleMapping": true` to your requests, or simply omit this field as it defaults to true.

To maintain strict validation (legacy behavior), set `"useFlexibleMapping": false` in your requests.
