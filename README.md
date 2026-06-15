# Pipeline — Job Application Tracker

A focused web app for tracking job applications through the hiring pipeline.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Database / API | Supabase (PostgreSQL + Auth) |

---

## Project Structure

```
pipeline-app/
├── supabase/
│   └── schema.sql              # Run this in the Supabase SQL Editor
├── src/
│   ├── types/
│   │   └── index.ts            # All TypeScript types + UI helper constants
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client (reads from .env)
│   │   └── api/
│   │       ├── jobs.ts         # CRUD + dashboard stats
│   │       ├── contacts.ts     # Contact CRUD (scoped to a job)
│   │       └── activities.ts   # Activity timeline CRUD (scoped to a job)
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.tsx      # Root layout (Sidebar + <Outlet />)
│   │       └── Sidebar.tsx     # Left nav with route links
│   ├── pages/
│   │   ├── Dashboard.tsx       # Stats + recent applications
│   │   ├── Jobs.tsx            # Filterable/searchable applications list
│   │   ├── JobNew.tsx          # Add-application form
│   │   ├── JobDetail.tsx       # Job detail, contacts, activity timeline
│   │   ├── JobEdit.tsx         # Edit-application form
│   │   └── NotFound.tsx        # 404 page
│   ├── router/
│   │   └── index.tsx           # createBrowserRouter config
│   ├── App.tsx                 # RouterProvider root
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind directives + base styles
├── .env.example                # Copy to .env and fill in Supabase credentials
└── tailwind.config.js          # Status-color theme tokens
```

---

## Setup

### 1 — Install dependencies

```bash
npm install
```

### 2 — Configure environment

```bash
cp .env.example .env
```

Open `.env` and fill in your Supabase project URL and anon key.
Find these at **Supabase Dashboard → Project Settings → API**.

### 3 — Create the database schema

Open the **SQL Editor** in your Supabase project and run the contents of
`supabase/schema.sql`. This creates:

- `jobs` table — core application record
- `contacts` table — people associated with a job
- `activities` table — timeline of events (emails, interviews, etc.)
- Row-Level Security policies — each user only sees their own data
- Auto-update trigger — `jobs.updated_at` is kept current automatically

> **Auth note:** Supabase Auth is enabled by default. You'll need to implement
> sign-up/login flows and protect routes so the RLS policies take effect.
> Until then, you can disable RLS on the tables temporarily via the Supabase
> dashboard for local testing.

### 4 — Start the dev server

```bash
npm run dev
```

---

## What You Need to Implement

Each page file contains `// TODO:` comments that mark exactly what to add.
Below is a summary organized by area.

### State & Data Fetching

Each page needs `useEffect` calls that invoke the API utilities and populate local state with `useState`.

| Page | API functions to call |
|---|---|
| `Dashboard` | `getDashboardStats()`, `getJobs()` |
| `Jobs` | `getJobs({ status, search })` — re-fetch when filters change |
| `JobNew` | `createJob(data)` then navigate to `/jobs/:id` |
| `JobDetail` | `getJob(id)`, `getContactsByJob(id)`, `getActivitiesByJob(id)` |
| `JobEdit` | `getJob(id)` to populate form, `updateJob(id, data)` on submit |

### API Functions Reference

All functions are in `src/lib/api/`. They throw on error, so wrap calls in `try/catch`.

#### `src/lib/api/jobs.ts`
```ts
getJobs(filters?: { status?: JobStatus; search?: string }): Promise<Job[]>
getJob(id: string): Promise<Job | null>
createJob(data: JobInsert): Promise<Job>
updateJob(id: string, data: JobUpdate): Promise<Job>
deleteJob(id: string): Promise<void>
getDashboardStats(): Promise<DashboardStats>
```

#### `src/lib/api/contacts.ts`
```ts
getContactsByJob(jobId: string): Promise<Contact[]>
createContact(data: ContactInsert): Promise<Contact>
updateContact(id: string, data: ContactUpdate): Promise<Contact>
deleteContact(id: string): Promise<void>
```

#### `src/lib/api/activities.ts`
```ts
getActivitiesByJob(jobId: string): Promise<Activity[]>
createActivity(data: ActivityInsert): Promise<Activity>
updateActivity(id: string, data: ActivityUpdate): Promise<Activity>
deleteActivity(id: string): Promise<void>
```

### Types Reference (`src/types/index.ts`)

Key types you'll use when building components:

```ts
JobStatus       // 'wishlist' | 'applied' | 'phone_screen' | 'interview' | 'offer' | 'rejected' | 'withdrawn'
ActivityType    // 'applied' | 'email' | 'phone_call' | 'interview' | 'offer' | 'rejection' | 'note'

Job             // Full row from the database
Contact         // Full row from the database
Activity        // Full row from the database

JobInsert       // Omits id, user_id, created_at, updated_at — use for createJob()
JobUpdate       // Partial<JobInsert> — use for updateJob()
ContactInsert   // Omits id, user_id, created_at
ActivityInsert  // Omits id, user_id, created_at

DashboardStats  // { total, wishlist, applied, interviewing, offers, rejected }
```

UI helper constants (import from `src/types`):
```ts
JOB_STATUS_LABELS   // Record<JobStatus, string>  — human-readable labels
JOB_STATUS_COLORS   // Record<JobStatus, string>  — Tailwind badge classes
ACTIVITY_TYPE_LABELS // Record<ActivityType, string>
```

### Forms

Both `JobNew` and `JobEdit` share the same field set. Build controlled inputs for:

| Field | Input type | Notes |
|---|---|---|
| `company` | `text` | Required |
| `title` | `text` | Required |
| `status` | `select` | Default `'wishlist'`; use `JOB_STATUS_LABELS` for option labels |
| `applied_date` | `date` | Optional |
| `job_url` | `url` | Optional |
| `location` | `text` | Optional |
| `remote` | `checkbox` | Default `false` |
| `salary_min` | `number` | Optional |
| `salary_max` | `number` | Optional |
| `notes` | `textarea` | Optional |

### Dashboard Stats Cards

Render five stat cards in a responsive grid using `DashboardStats`:

```
Total  |  Applied  |  Interviewing  |  Offers  |  Rejected
```

### Job Detail — Contacts

Each contact card should show `name`, `title`, `email`, `linkedin_url`.
Use an inline form or slide-over panel to add/edit contacts.
The `job_id` is `id` from `useParams()`.

### Job Detail — Activity Timeline

Render activities newest-first (already sorted by the API).
Show the activity `type` (via `ACTIVITY_TYPE_LABELS`), `title`, `description`, and formatted `date`.
Provide a form to log new activities.

### Authentication

The API layer uses the Supabase anon key and relies on Row-Level Security.
You'll need to:

1. Implement sign-up and login pages using `supabase.auth.signUp()` / `supabase.auth.signInWithPassword()`
2. Protect routes — redirect unauthenticated users to `/login`
3. Listen for auth state changes via `supabase.auth.onAuthStateChange()`

The `supabase` client is exported from `src/lib/supabase.ts`.

---

## Routing

| Path | Page | Purpose |
|---|---|---|
| `/` | Dashboard | Stats + recent applications |
| `/jobs` | Jobs | Full list with filter/search |
| `/jobs/new` | JobNew | Add application form |
| `/jobs/:id` | JobDetail | Detail, contacts, timeline |
| `/jobs/:id/edit` | JobEdit | Edit application form |
| `*` | NotFound | 404 |

---

## Styling Notes

- Tailwind utility classes are used throughout — no custom CSS needed for components.
- Status badge classes live in `JOB_STATUS_COLORS` (e.g. `bg-blue-100 text-blue-700`).
- The sidebar uses `slate-900` background; the main content area is `gray-50`.
- Custom status color tokens are available in `tailwind.config.js` under `theme.extend.colors.status` for advanced use.
