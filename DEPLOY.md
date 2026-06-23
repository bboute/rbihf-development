# Netlify Deployment Guide

## Overview
This is a Next.js 15 application using:
- **Sanity CMS** for content management
- **Clerk** for authentication (optional)
- **Turborepo** monorepo structure
- **pnpm** package manager

## Prerequisites

Before deploying, you need:

1. **Sanity Project** with content
   - Project ID
   - Dataset (usually "production")
   - API token (if using private datasets)

2. **Clerk Account** (if using authentication)
   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   - CLERK_SECRET_KEY

## Deployment Options

### Option 1: Server-Side Rendering (Recommended)

This maintains full functionality including API routes and dynamic data fetching.

**Steps:**

1. **Connect to Netlify:**
   - Push code to GitHub
   - Connect repo in Netlify dashboard
   - Set build command: `pnpm install && pnpm build`
   - Set publish directory: `apps/web/.next`

2. **Environment Variables:**
   Add these in Netlify dashboard → Site settings → Environment variables:
   
   ```
   SANITY_PROJECT_ID=your_sanity_project_id
   SANITY_DATASET=production
   SANITY_API_VERSION=2024-05-21
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key (optional)
   CLERK_SECRET_KEY=your_clerk_secret (optional)
   ```

3. **Update next.config.mjs:**
   Remove the `output: 'export'` line to enable SSR mode.

### Option 2: Static Export (Limited)

For static export to work, we need to:
- Remove API routes or convert them to serverless functions
- Add generateStaticParams to all dynamic routes
- All Sanity data must be fetched at build time

**Current Limitations with Static Export:**
- ❌ API routes won't work (webhooks, import-users)
- ❌ Real-time Sanity data updates won't reflect until rebuild
- ❌ Authentication flows may not work properly
- ❌ Dynamic routes need generateStaticParams

**To enable static export:**

The `next.config.mjs` is already configured with `output: 'export'` and `distDir: 'dist'`.

You would need to:
1. Comment out or remove API routes in `app/api/`
2. Add `generateStaticParams` to all dynamic route pages
3. Ensure all Sanity data is fetched at build time

## Current Configuration

I've created:
- `netlify.toml` - Netlify build configuration
- Updated `next.config.mjs` for static export

## Build Commands

```bash
# Install dependencies
pnpm install

# Build for production
pnpm build

# Build just the web app
cd apps/web && pnpm build
```

## Important Notes

1. **Sanity Data**: The site fetches content from Sanity at build time. If you add new content in Sanity, you'll need to redeploy to see changes.

2. **Images**: Images from Sanity CDN are configured in next.config.mjs. For static export, images are automatically unoptimized.

3. **Monorepo**: Netlify needs to run commands from the root, not the apps/web directory.

4. **Node Version**: The project requires Node.js 20+ (specified in .nvmrc and netlify.toml)

## Quick Deploy to Netlify

### Method 1: Git-based Deploy (Recommended)

1. Push this repo to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repo
5. Configure:
   - Build command: `pnpm install && pnpm build`
   - Publish directory: `apps/web/dist` (for static) or `apps/web/.next` (for SSR)
6. Add environment variables (SANITY_PROJECT_ID, etc.)
7. Deploy!

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to site or create new
netlify link

# Set environment variables
netlify env:set SANITY_PROJECT_ID your_project_id
netlify env:set SANITY_DATASET production

# Deploy
netlify deploy --prod
```

## Troubleshooting

### Build fails with "Cannot find module"
- Make sure pnpm is installing all workspace dependencies
- Check that `transpilePackages: ["@workspace/ui"]` is in next.config.mjs

### Images not loading
- Check that Sanity image domain is configured
- For static export, images must be unoptimized: `unoptimized: true`

### Dynamic routes 404
- Static export requires generateStaticParams
- Either add generateStaticParams to all dynamic routes, or use SSR mode

## Recommendation

For this project with Sanity CMS, I recommend **Option 1 (Server-Side Rendering)** because:
- API routes work (webhooks, etc.)
- Dynamic data fetching works
- Better for content-managed sites
- No need to regenerate static pages when content changes

To use SSR instead of static export, simply remove this line from `apps/web/next.config.mjs`:
```javascript
output: 'export',
```

And update netlify.toml:
```toml
[build]
  command = "pnpm install && pnpm build"
  publish = "apps/web/.next"  # Changed from apps/web/dist
```
