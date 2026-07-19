# Foc Lock

A student productivity and focus-tracking web app — built as a single HTML file, backed by Supabase for auth, cloud sync, and social features. Also ships as a native Android APK via Capacitor.

## Features

- **Study session timer** with XP/leveling, achievements, and streaks
- **Foc Calc** — built-in scientific calculator
- **Ambient sounds & lo-fi radio** for focus sessions
- **Foco** — AI study chatbot powered by Gemini 2.5 Flash (via a Supabase Edge Function proxy, no client-side API keys)
- **Friends & leaderboard** — instant mutual friendship via 6-character codes, server-side stats
- **Reminders** with background OS-level notifications (works even when the app/tab is closed)
- **Cloud sync** — sessions, notes, chat history, and settings sync across devices via Supabase
- **Progress tracking** — daily/weekly/monthly charts, subject breakdowns, editable session history
- **In-app announcements** — Supabase-controlled popup system, no app update required
- **Password reset via email code** — 2-step flow (verify code → set new password), no redirect links needed
- **Native Android app** — packaged with Capacitor, includes offline image support and local notifications

## Tech Stack

- **Frontend:** Vanilla JS, HTML, CSS — no framework, single-file architecture
- **Backend:** Supabase (Auth, Postgres, Edge Functions, Realtime)
- **AI:** Google Gemini 2.5 Flash (proxied through a Supabase Edge Function)
- **Mobile:** Capacitor 6, built via GitHub Actions (cloud build, since local Android Studio isn't available)
- **Avatars:** DiceBear, gender-based seed pools

## Setup

### 1. Supabase Project
Create a Supabase project and set the following in `live.js`:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

Client is configured with `flowType: 'implicit'` — required for the email-code password reset flow to work correctly with `verifyOtp()`. Do not change this to `pkce` without also reworking the reset-password flow.

### 2. Auth Email Template (Password Reset)
Go to **Supabase Dashboard → Authentication → Email Templates → Reset Password**, switch to the Source/HTML view, and paste in a custom template that includes `{{ .Token }}` (the OTP code the app verifies against). Without this, Supabase's default template only sends a clickable link, and the in-app code-entry flow won't have anything to check.

### 3. Custom SMTP (recommended for production)
Supabase's built-in email sender always shows as "Supabase Auth" and is rate-limited (a few emails/hour on the free tier) — not meant for real usage. To send from your own domain/name:
- **Authentication → Settings → SMTP Settings** → enable Custom SMTP
- Recommended providers: Resend, Brevo, SendGrid (all have free tiers)
- Set sender name to your app name and sender email to an address on a verified domain

### 4. Edge Function (Foco AI Chat)
The Gemini API key lives server-side in a Supabase Edge Function, not in client JS. Deploy the proxy function and set your Gemini API key as a Supabase secret.

### 5. Android Build
Built via GitHub Actions using Capacitor (local machine can't run Android Studio). Key build notes:
- Uses `--legacy-peer-deps` for install (peer dependency conflicts)
- `capacitor-plugin-pip` is dropped — doesn't compile against Capacitor 6
- Workflow copies `dist/live.html` → `dist/index.html` since Capacitor expects `index.html`
- Images are bundled locally (relative paths), not loaded from live CDN URLs, so they work offline

## Known Gotchas / Fixed Bugs

- **Date handling is local-time, not UTC.** `today()`/`yesterday()` build date strings from local `Date` components rather than `toISOString()`, which would otherwise shift the day boundary by your UTC offset (e.g. 6 hours early/late) and cause stats, streaks, and charts to roll over at the wrong time.
- **Editing a session's subject** updates `subj`, `subjs`, and `subjsDetail` together — the charts and breakdowns read the array fields first, so only updating `subj` would leave old subject data behind.
- **Password reset OTP requires `flowType: 'implicit'`** on the Supabase client — under the default `pkce` flow, the emailed token isn't compatible with `verifyOtp()` and will always fail as "expired or invalid."

## License

Private project — not currently licensed for redistribution.
