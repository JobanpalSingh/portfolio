# Easy Deploy Guide (GitHub + Render + Vercel)

This project has 2 parts:

- `frontend/` -> React site (deploy on **Vercel**)
- `backend/` -> Express API (deploy on **Render**)

Do backend first, then frontend.

---

## Final result you want

- Website: `https://your-app.vercel.app`
- API: `https://your-api.onrender.com`
- Frontend talks to backend using `VITE_API_URL`

---

## Step 0: Add project to GitHub (easy git steps)

Run commands from project root (`my-portfolio`).

### Case A: First time (repo not connected to GitHub yet)

1. Create empty repo on GitHub (do not add README there).
2. Then run:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

After this, Render and Vercel can import your repo.

### Case B: Already connected, pushing new changes

```bash
git status
git add .
git commit -m "prepare deploy updates"
git push
```

If `git status` says "nothing to commit", just run:

```bash
git push
```

### Helpful quick checks

```bash
git remote -v
git branch
```

- `git remote -v` shows if GitHub link is connected.
- `git branch` shows your current branch (`main` is preferred).

---

## Step 1: Deploy backend on Render

1. Go to [Render](https://render.com) and login with GitHub.
2. Click **New +** -> **Web Service**.
3. Select your repo.
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`)
   - `CLIENT_URL` (temporary: `https://example.com`, update later after Vercel deploy)
   - Optional mail vars: `SMTP_*`, `CONTACT_NOTIFY_EMAIL`
6. Click **Create Web Service**.
7. After deploy, copy backend URL, for example:
   - `https://portfolio-api.onrender.com`
8. Test health endpoint:
   - Open `https://portfolio-api.onrender.com/api/health`
   - You should see JSON with `ok: true`.

---

## Step 2: Deploy frontend on Vercel

1. Go to [Vercel New Project](https://vercel.com/new).
2. Import same GitHub repo.
3. Important settings:
   - **Root Directory**: `frontend` (very important)
   - Framework: Vite (auto)
   - Build: `npm run build`
   - Output: `dist`
4. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: your Render backend URL (no trailing slash), example:
     - `https://portfolio-api.onrender.com`
5. Click **Deploy**.

---

## Step 3: Fix CORS (very important)

After frontend deploy, you get URL like:

- `https://your-app.vercel.app`

Now go back to Render backend environment variables and set:

- `CLIENT_URL=https://your-app.vercel.app`

Save and redeploy backend.

If CORS error still comes, check there is no extra slash or path.

---

## Step 4: Verify everything

Open your Vercel site and test:

- Projects list loads
- Contact form submits
- Admin login works

If data does not load, most likely `VITE_API_URL` is wrong.

---

## Most common mistakes

1. Vercel Root Directory not set to `frontend`
2. `VITE_API_URL` missing in Vercel
3. `CLIENT_URL` missing or wrong in Render
4. Changed env vars but forgot to redeploy
5. Using HTTP backend URL instead of HTTPS

---

## React Router support (already in your repo)

Keep this file: `frontend/vercel.json`

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Without this, refresh on routes like `/projects` can show 404.

---

## Quick one-line memory

Render hosts API, Vercel hosts frontend, and both are connected by `VITE_API_URL` + `CLIENT_URL`.
