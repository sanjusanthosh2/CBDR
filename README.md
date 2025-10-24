# Cloud Backup and Disaster Recovery (CBDR) Assessment Tool

This is an early-stage academic prototype designed to assess an organization's readiness in cloud backup and disaster recovery (CBDR) practices. It presents a simple form-based interface to collect responses on key cloud recovery principles.

## Project Status

This is a **work-in-progress academic version** at the initial implementation milestone. The goal is to evolve this into a more comprehensive risk-scoring tool over time.

## Current Features

- Basic React frontend with sample cloud-related assessment questions
- Simple Express backend with placeholder logic
- Static JSON data (no database connection yet)
- Questions reflect core CBDR principles such as backup frequency, retention policy, and recovery objectives

## Setup Instructions

1. Install dependencies  
npm install


2. Run the app locally  
npm run dev


3. Visit [http://localhost:5173](http://localhost:5173) to access the form

## Note

- No backend scoring logic is implemented yet.
- Azure CosmosDB and deployment pipelines will be added in later phases.
- All code is kept minimal to demonstrate academic intent and allow future development.

## Planned Enhancements (Next Phase)

- Add database support (Azure CosmosDB)
- Implement dynamic risk scoring
- Introduce report generation and admin dashboard
- Enable Azure App Service deployment

## Disclaimer

This prototype is intended for academic evaluation only and does not represent a production-ready security 