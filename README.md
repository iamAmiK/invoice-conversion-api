# invoice-transformation-api

Developing an API to convert UBL JSON invoices to UBL XML invoices

Task 1: Update json to less strict schema #Done

Task 2: Add error response telling user what fields are missing but should be non-intrusive #semi-complete, logging in backend, need to report to user in output # Done

Task 3: Make route for /Fix (adjustments for missing fields) #Done
  - /api/fix/analyse - analyse invoice and return missing fields
  - /api/fix/apply - apply fixes to invoice and return updated JSON + XML
  - See .md file for testing
Note: I'm not using any storage in temp/cache (bcz of security issues) nor any services (cost issues)

### Status currently DONE 

### For now - check db for AI implementation (RAG / Semantic Search) - Supabase

Later: Scope for different invoice procurements from PDF to JSON

n8n, airtable, supabase, rag, semantic search

Created n8n acccount, fix nodes to properly connect with Supabase table and call data. Message Muhammad when it works.
