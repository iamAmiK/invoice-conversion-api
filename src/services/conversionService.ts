import { Builder } from 'xml2js';

const processUblJson = (data: any): any => {
  if (Array.isArray(data)) {
    const result = data.map(processUblJson).filter(Boolean);
    return result.length > 0 ? result : undefined;
  } 
  
  if (data !== null && typeof data === 'object') {
    const attributes: Record<string, any> = {};
    const result: Record<string, any> = {};
    let hasContent = false;

    for (let [key, value] of Object.entries(data)) {
      if (value === null || value === '') continue;

      // Handle attributes (keys starting with _)
      if (key.startsWith('_')) {
        const attrName = key.substring(1);
        attributes[attrName] = value;
        hasContent = true;
        continue;
      }

      if (key === 'TextContent' || key === 'IdentifierContent' || key === 'CodeContent' || 
          key === 'AmountContent' || key === 'NumericContent' || key === 'QuantityContent' ||
          key === 'IndicatorContent' || key === 'DateContent') {
        return value;
      }

      const processedValue = processUblJson(value);
      if (processedValue === undefined) continue;

      if (key === 'Invoice' && Array.isArray(processedValue) && processedValue.length === 1) {
        return processedValue[0];
      }

      result[key] = processedValue;
      hasContent = true;
    }

    if (Object.keys(attributes).length > 0) {
      result['$'] = attributes;
    }

    return hasContent ? result : undefined;
  }
  
  return data;
};

export const convertJsonToUblXml = async (invoiceData: any): Promise<string> => {
  try {
    if (!invoiceData) {
      throw new Error('No invoice data provided');
    }

    // Process the UBL JSON data
    const processedData = processUblJson(invoiceData);
    
    if (!processedData) {
      throw new Error('Failed to process invoice data');
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
    console.error('Error converting JSON to UBL XML:', error);
    throw new Error(`Failed to convert invoice to UBL XML format: ${errorMessage}`);
  }
};
