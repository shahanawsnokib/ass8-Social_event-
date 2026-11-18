# Goodturn

Goodturn helps neighbors discover and organize local community-service events.

Live site: **Not deployed yet. Add the public URL here before submission.**

## Features

- Browse upcoming community events and view event details.
- Create events and manage only the events you organized.
- Sign in and register with email and password using Better Auth.
- Join upcoming events and manage your registrations on **My Plan**.
- Discover the six nearest upcoming events on the home page.
- Browse community-service features, a photo gallery, and a newsletter design.
- Update your profile and switch between light and dark themes.
- Protect event changes and registrations with JWT authentication and ownership checks.

## Technology

| Area | Technology |
| --- | --- |
| Framework and routing | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Components | Base UI, class-variance-authority, `cn` |
| Authentication | Better Auth email/password and JWT |
| Authentication database | MongoDB with the Better Auth MongoDB adapter |
| Event API | Express, MongoDB, and JOSE JWT verification |
| Build and styling | Turbopack, React Compiler |
| Code quality | ESLint |

The Express API is maintained separately in the `sarver` folder.

## Local setup

1. Install client dependencies with `npm.cmd install`.
2. Create the client `.env` file:

   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:5000
   MONGODB_URI=your-mongodb-connection-string
   BETTER_AUTH_SECRET=your-long-random-secret
   ```

3. Configure the API's `.env` file as described in
   [the server README](../sarver/README.md). Its `CLIENT_URL` must match
   `NEXT_PUBLIC_BASE_URL`.
4. Start the client with `npm.cmd run dev` and the API with `node index.js`
   from the server folder. Open [http://localhost:3000](http://localhost:3000).

Keep database credentials and auth secrets private.

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Home page and six-event preview | Public |
| `/events` | Browse upcoming events | Public |
| `/events/[id]` | View an event and join | Public; sign-in required to join |
| `/events/create` | Create an event | Sign-in required |
| `/my-plan` | View joined events | Sign-in required |
| `/manage-events` | Manage your own events | Sign-in required |
| `/profile` | View and update your profile | Sign-in required |
| `/impact` | Learn about community impact | Public |
| `/login` and `/sign-up` | Email/password authentication | Public |

Protected pages verify the Better Auth session. The API independently validates
JWTs and checks event ownership for changes.

## Commands

```powershell
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd start
```
