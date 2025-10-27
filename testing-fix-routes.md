# Testing /fix routes

Tested with UBL-Invoice-2.2-Example1.json


/fix/analyse route
POST http://localhost:3000/api/fix/analyse
Content-Type: application/json
Body: json
put invoice data just like /convert route

/fix/apply route
POST http://localhost:3000/api/fix/apply
Content-Type: application/json
Body:json

{
  "invoiceData": {
    ...},
  "fixes": {
    "buyerReference": "PO-CONVENTION-2009",
    "note": "Additional note: Invoice processed with updated buyer reference"
  }
}
