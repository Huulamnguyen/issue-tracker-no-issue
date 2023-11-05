# Issue Tracker

![Issue Tracker](public/issue-tracker-demo.png)

## Description:

- A mordern Full-stack NextJS Application **Issue Tracker** that allow users to manage, maintain, create, update their issues during development.
- App Production Demo: https://issue-tracker-no-issue.vercel.app/

## Business Perspective:

- This is a side project (Shopify Application with NextJS) for a medium-size beauty company (based in New York City) who wants to manage customer support in one place.
- Intergration with Shopify to manage orders and customers, improve the customer experience when they need support.

## Main Tech-stack:

- NextJS, TailwindCSS, Prisma, MySQL

- Other tools:
  - Zod: form and request validation (both Frontend and backend)
  - Axios: fetching API
  - SimpleMDE: basic markdown interface
  - ReChart: chart, sumnmary dashboard
  - Radix UI and Next UI: front end development
  - Shopify / Shopify APIs: to manage customers and orders
  - Vercel: deployment
  - Planet Scale: database deployment
  - Google Cloud Console: Next Auth integration
  - React Email: writing emails

## Core Features:

- [DONE] ISSUE: View Create, update, delete issues
- [DONE] QUESTION: Vew, create, update, delete questions
- [DONE] Dashboard: Chart, Summary
- SETTING: Conffigure and connect to Shopify by Shopify APIs

## Advanced Features:

- [DONE] Authentication And Authorization with Next Auth (OAuth 2.0)
- [DONE] Assign users, admin pannel
- [DONE] When an issue is assigned to a user, automatically set the status to IN_PROGRESS.
- [DONE] On the Issue Detail page, add a drop-down list for changing the status of an issue
- [DONE] Implement a support page that allow customers submit an issue, then show them on the Issue List
- [IN_PROGRESS] Implement sending email when customers submit an issue or any update from their issues
- Implement a descending sort on the Issue List page.
- Add a drop-down list to select the page size.
- Implement the ability to filter issues by assignee.
- Introduce a feature to add comments below an issue.
- Integration with Shopify Admin API to handle orders, customers

## Development Progress:

- [DONE] Create, update, delete issues
- [DONE] Authentication with Next Auth:
  - Installation: `npm i next-auth@4.23.1`
  - Configured Google Provider
  - Adding Prisma Adapter: `npm i @next-auth/prisma-adapter@1.0.7`
  - Adding the Login and Logout Links
  - Change the Layout of the NavBar
  - Add a Dropdown Menu
  - Troubleshooting: Avatar Not Loading
  - Refactor the NavBar
  - Add a loading skeleton
  - Secure the application
- [DONE] Assigning issues to Users
  - Building the Assignee Select Component
  - Populating the Assignee Select Component
  - Setting Up React Query: TanStack Query: `npm i @tanstack/react-query@4.35.3`, fetch data from backend and store data in cache
  - Add Assigned Issues to Prisma Schema
  - Implementing the API
  - Assigning an issue to a user
  - Showing Toast Notification: `npm i react-hot-toast@2.4.1`
  - Refactor the Assignee Select Component
- [DONE] Filtering, Sorting, and Pagination
  - Building Filter Component
  - Filtering Issues
  - Make columns sortable
  - Sorting Issues
  - Fix Filtering Bugs
  - Generating Dummy Data
  - Building the Pagination Component
  - Implementing Pagination
  - Paginating Issues
  - Refactor: Extract IssueTable
- [DONE] Dashboard
  - Build the LatestIssues Component
  - Building the IssueSummary Component
  - Building the BarChart Component: using Recharts `npm i recharts@2.8.0`
  - Laying out the Dashboard
- [DONE] Going to Production
  - Adding Metadata
  - Optimizing Performacne Using React Cache
  - Removing .env file
  - Setting up Error Tracking: Error Tracking Tools by sentry.io
  - Setting up the Production Database: using PLanetScale
  - Deploying to Vercel

## Refactor:

- DeleteIssueButton and DeleteQuestionButton toreusable DeleteButton components

## Development Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
