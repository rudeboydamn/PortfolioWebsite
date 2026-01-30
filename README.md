# Dammy Henry Portfolio - Thoughts Platform

A modern portfolio website with an integrated social platform called "Thoughts" - featuring authentication, real-time posting, likes, and comments.

## Features

- **Thoughts Social Platform**: LinkedIn-style social feed with authentication
- **User Authentication**: Email/password and Google OAuth via NextAuth.js
- **Real-time Interactions**: Like, comment, and share thoughts
- **Database**: Vercel Postgres for persistent storage
- **Role-based Access**: Admin capabilities for dammy@dammyhenry.com

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Authentication**: NextAuth.js v5
- **Database**: Vercel Postgres
- **Styling**: Custom CSS with glassmorphism design
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database (Vercel Postgres) - Get these from Vercel Dashboard
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 3. Initialize Database

After deploying to Vercel and setting up Postgres:

```bash
# Initialize the database schema
curl -X POST https://your-domain.vercel.app/api/init-db \
  -H "Content-Type: application/json" \
  -d '{"secret": "your-nextauth-secret"}'
```

### 4. Migrate Blog Posts to Thoughts

Run the migration script to transfer existing blog posts:

```bash
npx tsx scripts/migrate-blog-to-thoughts.ts
```

This will create the admin user with credentials:
- Email: dammy@dammyhenry.com
- Password: valleyvale (⚠️ Change this immediately after first login!)

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site.

## Deployment to Vercel

### First Time Setup

1. **Connect to Vercel**:
   ```bash
   vercel
   ```
   - Project name: `portfoliowebsite`
   - Link to existing project if prompted

2. **Add Vercel Postgres**:
   - Go to Vercel Dashboard → Your Project → Storage
   - Create new Postgres database
   - The environment variables will be automatically added

3. **Add Additional Environment Variables**:
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your production URL (e.g., https://dammyhenry.com)
   - Optionally add Google OAuth credentials

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Transform blog to Thoughts social platform"
   git push origin main
   ```

5. **Initialize Database**:
   After deployment, run the init-db endpoint and migration script.

### Subsequent Deployments

Just push to main branch:
```bash
git push origin main
```

Vercel will automatically deploy.

## Admin Features

The admin user (dammy@dammyhenry.com) has special privileges:
- Can delete any user's thought
- Can delete any comment
- Full moderation capabilities

## Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ Authentication tokens are JWT-based
- ✅ Environment variables are never committed to Git
- ✅ SQL injection protection via Vercel's SQL library
- ⚠️ Change default admin password immediately
- ⚠️ Keep NEXTAUTH_SECRET secure and never expose it

## API Routes

- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `GET /api/thoughts` - Fetch all thoughts
- `POST /api/thoughts` - Create new thought (auth required)
- `PUT /api/thoughts/[id]` - Update thought (auth required)
- `DELETE /api/thoughts/[id]` - Delete thought (auth required)
- `POST /api/thoughts/[id]/like` - Toggle like (auth required)
- `GET /api/thoughts/[id]/comments` - Get comments
- `POST /api/thoughts/[id]/comments` - Add comment (auth required)

## Project Structure

```
├── app/
│   ├── api/               # API routes
│   ├── thoughts/          # Thoughts page
│   ├── providers.tsx      # Session provider
│   └── layout.tsx         # Root layout
├── lib/
│   └── db.ts              # Database helpers
├── auth.ts                # NextAuth configuration
├── auth.config.ts         # NextAuth config
├── middleware.ts          # Auth middleware
└── scripts/               # Migration scripts
```

## License

© 2026 Dammy Henry. All rights reserved.
