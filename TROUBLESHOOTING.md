# Vercel Deployment Troubleshooting

## How to Check Deployment Status

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find Your Project**: Look for "portfolio-website" or "portfoliowebsite"
3. **Click on Latest Deployment** to see logs and status

## Common Deployment Failures & Solutions

### 1. Missing Environment Variables

**Symptom**: Build succeeds but runtime errors occur

**Solution**: Add these required environment variables in Vercel:
- Go to: Project Settings → Environment Variables
- Add:
  ```
  NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
  NEXTAUTH_URL=https://dammyhenry.com
  ```
- Database variables (auto-added when you create Postgres):
  - POSTGRES_URL
  - POSTGRES_PRISMA_URL
  - POSTGRES_URL_NON_POOLING
  - POSTGRES_USER
  - POSTGRES_HOST
  - POSTGRES_PASSWORD
  - POSTGRES_DATABASE

**After adding variables**: Redeploy from Deployments tab

### 2. Database Not Set Up

**Symptom**: 
- "Cannot connect to database"
- "POSTGRES_URL is not defined"

**Solution**:
1. Go to: Storage tab → Create Database → Postgres
2. Name it (e.g., "thoughts-db")
3. Environment variables auto-populate
4. Redeploy

### 3. Node Version Mismatch

**Symptom**: "Node version X.X.X is not supported"

**Solution**: Already specified in package.json:
```json
"engines": {
  "node": ">=18.0.0"
}
```

Vercel should use Node 18+. Check in Project Settings → General → Node.js Version

### 4. Build Timeout

**Symptom**: "Build exceeded maximum time limit"

**Solution**: This shouldn't happen with our project, but if it does:
- Check for infinite loops in API routes
- Ensure no large files are being processed during build

### 5. Import/Module Errors

**Symptom**: 
- "Cannot find module 'next-auth'"
- "Module not found: Can't resolve '@vercel/postgres'"

**Solution**: Dependencies are in package.json. Try:
1. Check package.json is committed to Git
2. Delete node_modules and package-lock.json
3. Run `npm install`
4. Push to GitHub again

### 6. Middleware Deprecation Warning

**Symptom**: Warning about middleware being deprecated

**Current Status**: Warning only, doesn't block deployment

**Fix (Optional)**:
Rename `middleware.ts` to `proxy.ts` in future Next.js versions

## Step-by-Step Deployment Verification

### Step 1: Check Deployment Logs
1. Vercel Dashboard → Your Project
2. Click latest deployment
3. Look at "Build Logs" tab
4. Scroll to find error messages (usually in red)

### Step 2: Verify GitHub Integration
1. Vercel Dashboard → Project Settings → Git
2. Ensure connected to: `rudeboydamn/PortfolioWebsite`
3. Branch should be: `main`
4. Auto-deploy should be enabled

### Step 3: Manual Redeploy
If auto-deploy didn't trigger:
1. Deployments tab
2. Click "..." on latest deployment
3. Select "Redeploy"
4. Or click "Create Deployment" button

### Step 4: Test Build Locally
```bash
# Clean build
rm -rf .next
npm install
npm run build

# Should succeed without errors
```

### Step 5: Check for .env Files
Ensure `.env` is NOT committed to Git:
```bash
git status
# Should NOT show .env or .env.local
```

## Most Likely Issues for New Deployment

Based on the changes made, the most common issue will be:

### ❗ Missing NEXTAUTH_SECRET

**Error in logs**: 
- "NEXTAUTH_SECRET is not defined"
- Auth endpoints failing

**Fix**:
```bash
# Generate secret
openssl rand -base64 32

# Add to Vercel:
# Project Settings → Environment Variables → Add
# Name: NEXTAUTH_SECRET
# Value: <paste generated secret>
# Apply to: Production, Preview, Development

# Then: Redeploy
```

## Getting Help

If deployment still fails:

1. **Copy the exact error** from Vercel build logs
2. **Check which phase failed**:
   - Build phase: Code/dependency issue
   - Deploy phase: Configuration issue
   - Runtime: Environment variable or database issue

3. **Common commands to try locally**:
   ```bash
   # Test build
   npm run build
   
   # Check for TypeScript errors
   npm run lint
   
   # Check git status
   git status
   git log -1
   ```

## Quick Checklist

- [ ] Code pushed to GitHub main branch ✓ (Already done)
- [ ] Vercel project exists and is linked to GitHub ✓ (Already verified)
- [ ] Environment variables added to Vercel (⚠️ Needs verification)
- [ ] Postgres database created in Vercel (⚠️ Needs to be done)
- [ ] Deployment succeeded (❓ Checking)
- [ ] Database initialized via /api/init-db (❓ After deployment)

## Next Steps

1. Go to Vercel Dashboard right now
2. Check the deployment status
3. If failed, read the error logs
4. Most likely: Add NEXTAUTH_SECRET and create Postgres database
5. Redeploy after adding environment variables
