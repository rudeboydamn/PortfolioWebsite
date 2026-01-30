# Thoughts Platform - Deployment Guide

## 🚀 Vercel Deployment Steps

### 1. Initial Setup (First Time)

Your code has been pushed to GitHub. Vercel will automatically detect the push and start a deployment.

### 2. Set Up Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **portfoliowebsite**
3. Navigate to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose a database name (e.g., `thoughts-db`)
6. Select the region closest to your users
7. Click **Create**

The following environment variables will be automatically added to your project:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

### 3. Add Additional Environment Variables

In your Vercel project settings → **Environment Variables**, add:

**NEXTAUTH_SECRET** (Required)
```bash
# Generate using: openssl rand -base64 32
your-generated-secret-here
```

**NEXTAUTH_URL** (Required)
```
https://dammyhenry.com
```

**Google OAuth (Optional - for "Sign in with Google")**
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> **Note:** To get Google OAuth credentials:
> 1. Go to [Google Cloud Console](https://console.cloud.google.com/)
> 2. Create a new project or select existing
> 3. Enable Google+ API
> 4. Create OAuth 2.0 credentials
> 5. Add authorized redirect URI: `https://dammyhenry.com/api/auth/callback/google`

### 4. Redeploy After Adding Environment Variables

After adding environment variables:
1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**

### 5. Initialize Database Schema

After successful deployment, initialize the database:

```bash
curl -X POST https://dammyhenry.com/api/init-db \
  -H "Content-Type: application/json" \
  -d '{"secret": "YOUR_NEXTAUTH_SECRET"}'
```

Response should be:
```json
{"message": "Database initialized successfully"}
```

### 6. Migrate Existing Blog Posts

Run this locally (requires environment variables):

```bash
# Create .env.local with your Vercel Postgres credentials
npm run migrate
```

This will:
- Create admin user: `dammy@dammyhenry.com` / `valleyvale`
- Migrate all existing blog posts as thoughts
- ⚠️ **IMPORTANT:** Change the password immediately after first login!

### 7. Verify Deployment

1. Visit `https://dammyhenry.com/thoughts`
2. Click **Login / Sign Up**
3. Login with admin credentials
4. Verify you can:
   - Post a new thought
   - Like a thought
   - Comment on a thought
   - Edit/Delete your own thoughts

## 🔒 Security Checklist

- ✅ Environment variables not committed to Git
- ✅ `.env` files in `.gitignore`
- ✅ Passwords hashed with bcrypt
- ✅ JWT-based authentication
- ⚠️ Change default admin password immediately
- ⚠️ Keep NEXTAUTH_SECRET secure
- ⚠️ Set up Google OAuth for production use

## 🎯 Post-Deployment

### Change Admin Password

1. Login as admin
2. Go to account settings (if implemented) or:
   - Create a password change API route, or
   - Manually update in database via Vercel Postgres dashboard

### Monitor Deployment

- Check Vercel deployment logs for any errors
- Monitor database usage in Vercel dashboard
- Set up alerts for high traffic or errors

## 🐛 Troubleshooting

### Build Fails
- Check Vercel deployment logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Errors
- Verify Postgres environment variables are set
- Check database is active in Vercel dashboard
- Ensure database schema is initialized

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- For Google OAuth, verify redirect URIs are correct

### API Routes Return 500
- Check Vercel function logs
- Verify database connection
- Ensure all required environment variables are set

## 📊 Database Management

### Access Database Directly
1. Go to Vercel Dashboard → Your Project → Storage
2. Click on your Postgres database
3. Use the **Query** tab to run SQL directly

### Backup Database
Vercel automatically backs up your database. To create manual backups:
- Use the Vercel CLI: `vercel env pull`
- Export data via SQL queries in dashboard

## 🎉 Success!

Your Thoughts platform is now live at:
- Main site: `https://dammyhenry.com`
- Thoughts: `https://dammyhenry.com/thoughts`

Users can now:
- Sign up with email or Google
- Share thoughts (posts)
- Like and comment on thoughts
- Edit/delete their own content
- Interact in a LinkedIn-style social feed
