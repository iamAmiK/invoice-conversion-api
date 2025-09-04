# How to test V1 of transformation API

Deployment link: https://invoice-conversion-api.onrender.com/api/convert

This is deployed on Render, so it has a cold start of around 1 minute. If you click the API link and don't see "Cannot GET /api/convert" then just wait for a little.

Go to Postman to test API.
POST https://invoice-conversion-api.onrender.com/api/convert
In Body select Raw JSON and put in this schema for input:
{
  "invoiceType": "json",
  "outputFormat": "UBL XML",
  "invoiceData": {
  ... pasted invoice json...
}
You can use the UBL example 1 and 2 json to see it successfully transforming from JSON to UBL XML in the output.
The other two jsons, fail and errors for the missing params are provided in the output.
