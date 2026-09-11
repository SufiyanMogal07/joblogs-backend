# JobLog - Job Application Tracker (Backend)

JobLog is a full-stack job application tracker that helps job seekers organize applications, track interview progress, and manage their job search in one place.

This repository contains the backend built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**. The frontend is maintained in a separate repository.

---

## Live Demo

🌐 https://joblogs.sufiyanmogal.me/

---

## Overview

The backend provides the REST APIs that power JobLog, including authentication, job management, search, user metrics, and data persistence.

---

## Features

### Authentication

- JWT authentication
- Protected API routes

### Job APIs

- Create, update, and delete job applications
- Search applications
- Manage favourites
- Store application notes
- Track application status

### Email Notifications

- Send automated reminders for draft jobs not updated for 3 days
- Notify users about applications inactive for 30 days
- Send reminders for applications with no response for 60 days
- Allow users to enable or disable email notifications
- Scheduled email notifications using cron jobs


### Data Layer

- PostgreSQL
- Prisma ORM
- Database migrations

### Backend Architecture

- Controller-Service pattern
- Request validation
- Centralized error handling
- Typed API responses
- TypeScript throughout the project

---

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Frontend

- Next.js
- React
- TypeScript

### Deployment

- Render
- Vercel

---

## Architecture

```text
Next.js Frontend
       │
   REST API
       │
 Express.js Backend
       │
   Prisma ORM
       │
  PostgreSQL
```

---

## Project Structure

```text
src/
├── controllers/
├── middleware/
├── routers/
├── validators/
├── services/
├── db/
├── utils/
└── types/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts
```

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/SufiyanMogal07/joblogs-backend.git
```

Install dependencies

```bash
pnpm install
```

Configure environment variables

```bash
cp .env.example .env
```

Run database migrations

```bash
npx prisma migrate dev
```

Start the development server

```bash
pnpm dev
```

API

```
http://localhost:5000/api
```

---

## What I Learned

Building JobLog's backend helped me improve at:

- Designing REST APIs
- Organizing backend architecture
- Working with Prisma and PostgreSQL
- Implementing JWT authentication
- Structuring controllers, middleware, and validation
- Building maintainable TypeScript backends

---

## Future Development

Upcoming features and project decisions will be documented separately.

- `docs/FEATURES.md`
- `docs/DECISIONS.md`

---

## Frontend Repository

https://github.com/SufiyanMogal07/joblogs-frontend