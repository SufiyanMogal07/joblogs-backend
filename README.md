# JobLog - Jobs Application Tracker (Backend)

The backend of JobLog — a full-stack job application tracker.
This repository contains only the backend built with Node.js, Express, PostgreSQL, and Prisma ORM.

---

[Live Demo](https://joblogs.sufiyanmogal.me/)

---

## Problem It Solves

During my own job search, I had no way to track how many jobs I had applied to, which companies hadn't responded, or whether my resume was actually working. JobLog is a personal digital diary for your job search — so you always know where you stand and what to improve.

---

## Features

- JWT Authentication
- REST APIs for job management
- Add, edit, and delete job applications
- Global Search by company name or position
- Mark jobs as favourite
- Notes for each job
- PostgreSQL with Prisma ORM
- Fully typed with TypeScript

---

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Frontend (separate repository)

- Next.js (App Router)
- TypeScript
- React Hook Form
- Zustand
- Tailwind CSS

---

## Getting Started

1. Clone the repository

```bash
   git clone https://github.com/SufiyanMogal07/joblogs-backend.git
```

2. Ensure you have Node.js 20+ installed

   Download from [nodejs.org](https://nodejs.org/) or use a version manager like `nvm`:

```bash
   nvm install 20
   nvm use 20
```

3. Install pnpm package from npm

```bash
   npm install -g pnpm
```

4. Install dependencies

```bash
   pnpm install
```

5. Set up environment variables

```bash
   cp .env.example .env
```

6. Run Prisma migrations

```bash
   npx prisma migrate dev
```

7. Start the development server

```bash
   pnpm run dev
```

8. API runs on [http://localhost:5000/api](http://localhost:5000/api).

---

## Project Structure

- `src/server.ts` – Express app entry point

- `src/controllers/` – Request handlers for auth, jobs, and users

- `src/routers/` – API route definitions

- `src/middleware/` – Auth and request middleware

- `src/validators/` – Request validation schemas

- `src/utils/` – Shared utilities (JWT helpers, etc.)

- `src/types/` – Shared TypeScript types and interfaces

- `src/db/` – Database configuration

- `prisma/` – Prisma schema, migrations, and seed files

---

## Frontend

The frontend is available as a separate Next.js application with TypeScript and Tailwind CSS.
It consumes this backend through REST APIs for authentication and job management.

### [Frontend Repository](https://github.com/SufiyanMogal07/joblogs-frontend)

---

## Roadmap

### Phase 1 — Foundation

- [x] Frontend UI
- [x] Backend API
- [x] Authentication
- [x] Frontend–backend integration
- [x] Frontend improvement
- [ ] Resume upload (single resume, basic)
- [ ] JD vs Resume match — basic keyword comparison
- [ ] Testing
- [ ] Final Deployment

### Phase 2 — Resume Intelligence

- [ ] Multiple resume versions (up to 4, role-based labels)
- [ ] Resume linked to each job application
- [ ] Advanced JD vs Resume analyzer (match score + missing keywords + suggestions)
- [ ] Auto resume suggestion when adding a new job
- [ ] Resume performance score (which resume gets most interviews/offers)
- [ ] Resume update suggestions based on JD keywords
- [ ] Auto-ghosted detection (no response after 30 days)
- [ ] Enhanced interview notes per job

### Phase 3 — Growth & Automation

- [ ] Browser extension for one-click job capture from any job board
- [ ] Notifications and follow-up reminders
- [ ] Resume template recommendations based on role and profile
- [ ] AI-powered cover letter generator from JD + resume
- [ ] Job application analytics dashboard (response rate, offer trends)

---

## What I Learned

- Designing clean REST APIs with Express for auth and job workflows
- Modeling relational data in PostgreSQL with Prisma schema and migrations
- Implementing JWT-based authentication and protected routes
- Structuring a scalable backend with controllers, routers, middleware, and validators
- Handling validation, error responses, and edge cases consistently
- Improving backend architecture through iteration and better project organization

---
