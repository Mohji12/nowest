# Vercel Deployment Guide

This guide explains how to deploy the Nowest Interior frontend to Vercel with proper SPA routing.

## Configuration

The `vercel.json` file in the `frontend` directory is automatically detected by Vercel and handles:

1. **SPA Routing**: All routes are rewritten to `/index.html` to support client-side routing
2. **API Proxy**: API requests are proxied to the backend Lambda function
3. **Security Headers**: Adds security headers to all responses
4. **Asset Caching**: Optimizes caching for static assets

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. **Important**: Set the **Root Directory** to `frontend`
5. Vercel will automatically detect:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# For production deployment
vercel --prod
```

## Environment Variables

If you need to set environment variables in Vercel:

1. Go to your project settings in Vercel Dashboard
2. Navigate to "Environment Variables"
3. Add any required variables (e.g., API endpoints)

## How It Works

The `vercel.json` configuration:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- **First rewrite**: Proxies `/api/*` requests to your backend Lambda function
- **Second rewrite**: Serves `index.html` for all other routes (SPA routing)

This ensures:
- ✅ `/admin/login` works (no 404 errors)
- ✅ All client-side routes work
- ✅ API requests are properly proxied
- ✅ Static assets are cached efficiently

## Testing After Deployment

After deployment, test these URLs:
- `https://your-domain.vercel.app/` ✅
- `https://your-domain.vercel.app/admin/login` ✅
- `https://your-domain.vercel.app/about` ✅
- `https://your-domain.vercel.app/products` ✅

All routes should work without 404 errors!

## Troubleshooting

### Still getting 404 errors?

1. **Check Root Directory**: Make sure Vercel is set to deploy from the `frontend` folder
2. **Verify vercel.json**: Ensure `vercel.json` is in the `frontend` directory
3. **Check Build Output**: Verify that `dist/index.html` exists after build
4. **Redeploy**: Try redeploying the project

### API requests not working?

1. Check that the API URL in `vercel.json` matches your backend endpoint
2. Verify CORS is configured on your backend
3. Check browser console for CORS errors

### Need to update API endpoint?

Edit `frontend/vercel.json` and update the API destination URL:
```json
{
  "source": "/api/(.*)",
  "destination": "YOUR_NEW_API_URL/api/$1"
}
```

Then redeploy.

