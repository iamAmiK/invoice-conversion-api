# invoice-transformation-api

Developing an API to convert UBL JSON invoices to UBL XML invoices

Task 1: Update json to less strict schema #Done

Task 2: Add error response telling user what fields are missing but should be non-intrusive #semi-complete, logging in backend, need to report to user in output # Done

Task 3: Make route for /Fix (adjustments for missing fields) #Done
  - /api/fix/analyse - analyse invoice and return missing fields
  - /api/fix/apply - apply fixes to invoice and return updated JSON + XML
  - See .md file for testing

Later: Scope for different invoice procurements from PDF to JSON
