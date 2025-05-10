# Office Tea & Coffee Ledger App

This app was made for utility use in our office.
It is just a side project for office uses
A full-stack web application for tracking daily tea and coffee consumption in an office. Built with Next.js (App Router), Tailwind CSS, and MongoDB.

## Features

- Add, edit, and delete tea/coffee entries by person and date
- View and filter entries by date and user
- Dashboard with daily and monthly stats
- Summary reports (day, week, month)
- Responsive, modern UI with light/dark mode
- Charts for consumption trends

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- MongoDB (via Mongoose)
- Chart.js

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your MongoDB connection string.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Seed the database (optional):**
   - See `scripts/seed.ts` for test data seeding.

## Environment Variables

See `.env.example` for required variables.

## Deployment

- Ready for deployment on Vercel or any Node.js host.

---

© 2024 Office Ledger App
