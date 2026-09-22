# Netreshwori Engineering Consultancy — website

Next.js 15 rebuild of necnepal.com: marketing site with a 3D interactive hero,
an AI chatbot (Gemini → Groq → OpenRouter fallback, same pattern as ERG's
report reviewer), employee attendance system with birthday/anniversary
emails, and a careers + internship application flow.

## What's built so far

- `src/app/page.tsx` — homepage with 3D topographic hero (bridge / water
  supply / road project photos crossfading behind it)
- `src/app/careers/page.tsx` — vacancy-or-CV flow + the 3 internship options
- `src/components/Chatbot.tsx` + `src/app/api/chat/route.ts` — the AI widget
- `src/app/api/birthdays/cron-check` — T-2, T-1 (gendered wish), day-of, and
  work-anniversary emails
- `src/app/api/attendance/cron-check` — flags employees late/early on every
  day in a rolling window, emails the two alert addresses
- `prisma/schema.prisma` — Employee, Attendance, Vacancy, JobApplication,
  InternApplication, ChatMessage models

## Still needed before this is production-ready

- Auth.js wiring for employee/admin login (package is installed, routes
  aren't written yet)
- Admin dashboard UI: create/edit employees, toggle vacancies open/closed,
  view attendance summaries, download a payroll-ready sheet
- Employee-facing check-in/check-out page
- File upload route for CVs/photos (the careers page currently stubs the
  upload — wire it to Cloudflare R2 or Vercel Blob)
- Real vacancy data fetch on the careers page (currently takes a prop)

## Local setup

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL at minimum, plus one AI key and the two hiring emails
npx prisma migrate dev --name init
npm run dev
```

## Deploying

1. Push this repo to GitHub (see below).
2. Import the repo in Vercel.
3. Add all variables from `.env.example` in Vercel's Environment Variables
   settings.
4. Point your domain's DNS through Cloudflare at Vercel, same as ERG.
5. The two cron jobs in `vercel.json` run automatically once deployed —
   no extra setup needed on Vercel's side.

## Pushing to GitHub

Run these from inside this folder, with a repo already created on GitHub:

```bash
git init
git add .
git commit -m "Initial NEC website scaffold"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
