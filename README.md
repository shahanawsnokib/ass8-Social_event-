# Goodturn

Goodturn helps neighbors discover and organize local community-service events, from cleanups and planting days to donation drives.

## Features

- Browse upcoming community events and view event details.
- Create, edit, and delete community events.
- Sign in and register with email and password using Better Auth.
- Join events and view joined events on the **My Plan** page.
- Sort events by date and prevent joining events that have already passed.
- Responsive navigation with light and dark theme support.

## Technology

| Area | Technology |
| --- | --- |
| Framework and routing | Next.js 16 App Router and Proxy |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Components | Base UI, class-variance-authority, `cn` |
| Icons | Lucide React |
| Authentication | Better Auth |
| Authentication database | MongoDB with the Better Auth MongoDB adapter |
| Event data | External community-events API |
| Email provider | Resend, optional for password-reset emails |
| Build and styling | Turbopack, React Compiler |
| Code quality | ESLint |

The event API is a separate service and is not included in this repository.

## Requirements

- Node.js
- MongoDB
- The community-events API server

## Local setup

1. Install dependencies:

   ```powershell
   npm.cmd install
   ```

2. Create a root `.env` file and configure:

   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   MONGODB_URI=your-mongodb-connection-string
   BETTER_AUTH_SECRET=your-long-random-secret
   RESEND_API_KEY=
   RESEND_FROM_EMAIL=
   ```

   Keep database credentials and auth secrets private. The Resend values are optional unless password-reset email is enabled.

3. Start the development server:

   ```powershell
   npm.cmd run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Home page and event preview | Public |
| `/events` | Browse upcoming events | Public |
| `/events/[id]` | View an event and join | Public; sign-in required to join |
| `/events/create` | Create an event | Sign-in required |
| `/my-plan` | View joined events | Sign-in required |
| `/profile` | View your account profile | Sign-in required |
| `/impact` | Learn about community impact | Public |
| `/login` and `/sign-up` | Authentication | Public |

`src/proxy.ts` checks for the Better Auth session cookie before protected pages. The protected page also validates the full session. The backend API must independently authenticate and authorize create, update, delete, and join requests; a frontend redirect is not a substitute for backend checks.

## Commands

```powershell
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd start
```

No live deployment URL has been configured yet.
