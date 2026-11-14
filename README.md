# ShareBite 🍱

ShareBite is a food-rescue web app. Restaurants and people with extra food post it, and others can browse and request it, so less food goes to waste.

**Live site:** https://wayasharebite.vercel.app

## Tech stack

- **Frontend:** React + Vite (JavaScript), Tailwind CSS v4, React Router
- **Backend:** Supabase (PostgreSQL database, Authentication, Row Level Security)
- **Hosting:** Vercel

## User roles

| Role | How it is assigned | What they can do |
|---|---|---|
| **Visitor** (no account) | - | Browse available food only |
| **User** | Chosen at sign-up ("I want food") | Browse and request food |
| **Restaurant** | Chosen at sign-up ("I have food to share") | Everything a user can, plus post and manage their own food posts |
| **Admin** | Set manually in the Supabase dashboard (never from the sign-up form) | Oversee the platform |

## Database design

Three tables in Supabase:

- **`profiles`**: extra info for each logged-in user (full name, phone, role). Linked to Supabase's built-in `auth.users` table by `id`.
- **`food_posts`**: food listings (title, description, quantity, price, pickup address, expiry, image URL, status, owner).
- **`requests`**: a user's request for a post. A unique rule on `post_id` allows only one request per post.

Post status flow: `Available` → `Requested` → `Picked Up` → `Completed` (or `Expired`).

## Security

- Row Level Security (RLS) is enabled on the tables. Visitors can only **read** food posts.
- The sign-up form can only create `user` or `restaurant` accounts. A database trigger forces any other value to `user`, so nobody can sign up as admin.
- Only the **publishable** Supabase key is used in the frontend. Never put a `service_role` or secret key in this project.

## Project status

- [x] Supabase connected to React
- [x] Available Food page reads posts from `food_posts`
- [x] Login / Sign up page with role selection (user or restaurant)
- [x] Navbar shows the account button and Log out when logged in
- [ ] `profiles` auto-creation trigger and RLS policies
- [ ] Post food form saves to Supabase (currently browser storage)
- [ ] Request food and status tracking
- [ ] Role-based pages and route protection
- [ ] Admin dashboard

## Run it locally

1. Clone the repo and install packages:

   ```bash
   git clone <your-repo-url>
   cd ShareBite
   npm install
   ```

2. Create a `.env` file in the project root (next to `package.json`):

   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_KEY=your-publishable-key
   ```

   `.env` is listed in `.gitignore`, so it is never uploaded to GitHub.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:5173

## Deploying on Vercel

Vercel does not read your local `.env` file. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` under **Settings → Environment Variables**, then **redeploy**. Without them, the site shows a blank page with the error `supabaseUrl is required`.

## Developer

Developed by **Nipuna Madhuranga**, Wayamba University of Sri Lanka.
