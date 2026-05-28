# Daniel Gallego — Full-stack portfolio

Dark, futuristic glassmorphism UI (purple neon glow, grain, rounded cards) with a React + Vite frontend and an Express + MongoDB backend.

## Repository layout

- `frontend/` — React, Vite, Tailwind CSS, Framer Motion, React Router, Axios, react-hot-toast, react-helmet-async
- `backend/` — Express, Mongoose, JWT admin auth, Multer image uploads

**Deploying to Vercel (frontend) + a Node host for the API:** see **[vercel.md](./vercel.md)** in the repo root.

## Prerequisites

- Node.js 18+
- A MongoDB deployment you can connect to — **local MongoDB**, **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**, etc.

Using **MongoDB Compass** is fine: Compass is only a desktop UI to browse your data. This app does not talk to Compass directly; it uses the same **`MONGODB_URI`** string you would paste into Compass (from Atlas: **Database → Connect → Drivers**).

## 1. Backend setup

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

- `MONGODB_URI` — connection string (e.g. Atlas `mongodb+srv://...`). If Compass connects with this URI and your IP is allowed in Atlas **Network Access**, the API will work too
- `JWT_SECRET` — long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — admin login (plain password is fine for local dev)
- `CLIENT_URL` — `http://localhost:5173` for local Vite
- Optional: `ADMIN_PASSWORD_HASH` — bcrypt hash from `node scripts/hashPassword.js "your-password"` (takes precedence over plain `ADMIN_PASSWORD` when set)

Install and run:

```bash
npm install
npm run dev
```

API base: `http://localhost:5000`  
Health check: `GET /api/health`

### REST endpoints

**Projects**

- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects` (admin, `multipart/form-data`, optional `image` file)
- `PUT /api/projects/:id` (admin, multipart)
- `DELETE /api/projects/:id` (admin)

**Testimonials**

- `GET /api/testimonials`
- `POST /api/testimonials` (admin, multipart, optional `image`)
- `PUT /api/testimonials/:id` (admin, multipart)
- `DELETE /api/testimonials/:id` (admin)

**Contact**

- `POST /api/contact` — JSON `{ name, email, subject?, message }` — each submission is saved in **MongoDB** (collection `contactmessages`). If **SMTP** is configured in `.env`, a notification email is also sent (see below). If mail fails, the submission is still stored.
- `GET /api/contact` — admin, list stored messages (same list appears under **Contact form messages** on `/admin`).

**Contact form → email (optional)** — set in `backend/.env`:

- `SMTP_HOST`, `SMTP_PORT` (often `587`), `SMTP_SECURE` (`false` for 587, `true` for 465)
- `SMTP_USER`, `SMTP_PASS` (e.g. Gmail [App password](https://support.google.com/accounts/answer/185833))
- `CONTACT_NOTIFY_EMAIL` — inbox that receives copies (defaults to `SMTP_USER` if unset)
- `MAIL_FROM` — optional full `From` header

If any SMTP variable is missing, the API still returns **201** and only skips sending mail (check server logs).

**Auth / admin**

- `POST /api/auth/login` — JSON `{ email, password }` → `{ token }`
- `GET /api/admin/stats` — admin, counts for dashboard

Admin requests: header `Authorization: Bearer <token>`.

Uploaded files are served at `/uploads/<filename>`.

## 2. Frontend setup

```bash
cd frontend
cp .env.example .env
```

For local development, leave `VITE_API_URL` empty so the Vite dev server proxies `/api` and `/uploads` to the backend.

```bash
npm install
npm run dev
```

Open the **Local** URL Vite prints (usually `http://localhost:5173`). If that port is busy, Vite will use **5174, 5175, …** — use that exact URL in the browser, and set **`CLIENT_URL`** in `backend/.env` to the same origin (or CORS will block API calls).

The **API** (`npm run dev` in `backend/`) is not the website: `http://localhost:5000` only serves JSON. The React UI is always the Vite dev URL above.

### Production build

Point `VITE_API_URL` to your deployed API origin (no trailing slash), then:

```bash
npm run build
npm run preview
```

## 3. Default routes (frontend)

| Path             | Description                    |
| ---------------- | ------------------------------ |
| `/`              | Single-page bento homepage     |
| `/about`         | About                          |
| `/projects`      | Projects from API              |
| `/services`      | Services                       |
| `/contact`       | Contact + form → API           |
| `/testimonials`  | Testimonials carousel from API |
| `/admin/login`   | Admin login                    |
| `/admin`         | Admin dashboard (protected)    |

## 4. Adding projects and testimonials

1. Run **both** servers: `npm run dev` in `backend/` and `npm run dev` in `frontend/`.
2. In the browser, open **`/admin/login`** (or **Admin** in the floating menu).
3. Sign in with **`ADMIN_EMAIL`** and **`ADMIN_PASSWORD`** from `backend/.env`.
4. On **`/admin`**:
   - **Projects** — click **Add**, then fill **title**, **excerpt** (short text for the grid), **full description** (modal), **start / end dates**, **category**, **GitHub** / **live site** links, optional **video URL** (YouTube, Vimeo, or direct `.mp4`/`.webm` — embedded in the project modal), **cover image**, multiple **gallery** images, optional **featured**, then **Save**. On **`/projects`**, click a card to open the detail modal. Use the pencil icon to edit or trash to delete.
   - **Testimonials** — click **Add**, fill name, designation, company, message, rating (1–5), optional **image**, then **Save**.

After saving, they show up on **`/projects`**, **`/testimonials`**, and the homepage (projects preview + testimonials) on refresh.

## 5. Tech notes

- Dark mode is always on (`html` / `body` styling).
- SEO meta tags use `react-helmet-async` per page.
- Smooth scrolling and custom scrollbar are defined in `frontend/src/index.css`.
- Toasts use `react-hot-toast`.

## 6. Security reminders for production

- Use a strong `JWT_SECRET` and HTTPS.
- Prefer `ADMIN_PASSWORD_HASH` instead of plain `ADMIN_PASSWORD`.
- Tighten `CLIENT_URL` / CORS to your real frontend origin.
- Put the API behind a reverse proxy and rate limits as needed.
