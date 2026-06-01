# CVai — AI CV Builder

Paste a job description, get a tailored CV, preview it, and download as PDF.

## Stack

- React + Vite (JavaScript)
- React Router
- Tailwind CSS
- Supabase (auth)
- Google Gemini API
- Framer Motion

## Setup

1. Copy `.env.example` to `.env` and fill in your keys.
2. `npm install`
3. `npm run dev`

## Supabase

1. Enable **Email** auth in Authentication → Providers.
2. For **Google sign in**: enable Google provider, add OAuth client ID/secret from Google Cloud Console, and add redirect URL:
   - `https://<your-project>.supabase.co/auth/v1/callback`
3. In Supabase → Authentication → URL Configuration, set **Site URL** to `http://localhost:5173` (dev) and add `http://localhost:5173/builder` to **Redirect URLs**.
