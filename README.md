# Omni-usage-management-service

Microservice for the SLT Omni-Channel API Modernization project. Redesigns legacy Usage-related APIs (from VAS, BBVAS, ISP SOA, ISP Direct, Voice, and Dashboard) into a TMF635-aligned (TM Forum Usage Management API) microservice.

## Overview
Handles creation and retrieval of subscriber usage records — broadband usage requests, usage summaries, extra GB, weekly usage, bonus data, and related reports — under the `Usage` resource model defined by TMF635.

## Tech Stack
- Node.js + Express
- MongoDB (Mongoose)
- JWT-based authentication (validated against shared IAM secret)

## Base Path
/tmf-api/usageManagement/v4/

## Setup
```bash
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
node server.js
```

## Testing
- Postman collection: manual endpoint testing
- TMF635 v4.0.0 CTK: conformance testing against `/usage` and `/usageSpecification`

## Project Context
Part of a 10-microservice modernization effort (372 legacy APIs → TMF Open API-aligned services). This service maps 44 legacy APIs to TMF635.
