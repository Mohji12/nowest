# SPA Routing Configuration Guide

This guide explains how to configure your server to handle client-side routing for the Nowest Interior React application.

## Problem

When users directly access routes like `/admin/login`, the server tries to find that file and returns a 404 error. This is because React Router (wouter) handles routing on the client side, but the server needs to be configured to serve `index.html` for all routes.

## Solution

Configuration files have been created for different hosting scenarios:

### 1. Apache Server (.htaccess)
**File:** `frontend/public/.htaccess`

This file should be copied to your web server's root directory (where `index.html` is located) after building.

**After building:**
```bash
cd frontend
npm run build
# Copy .htaccess from public/ to dist/
cp public/.htaccess dist/
```

### 2. Nginx Server (nginx.conf)
**File:** `frontend/nginx.conf`

If you're using Nginx, update your server configuration with the provided `nginx.conf` settings. The key part is:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 3. Netlify (_redirects)
**File:** `frontend/public/_redirects`

This file is automatically used by Netlify. It should be in the `public` folder and will be copied to `dist` during build.

### 4. Vercel (vercel.json)
**File:** `frontend/vercel.json`

This file is automatically used by Vercel for routing configuration.

## Deployment Steps

### For Apache Servers:
1. Build the frontend: `npm run build` (in `frontend` directory)
2. Copy the `dist` folder contents to your web server
3. Ensure `.htaccess` is in the root directory (same level as `index.html`)
4. Make sure `mod_rewrite` is enabled on your Apache server

### For Nginx Servers:
1. Build the frontend: `npm run build`
2. Copy the `dist` folder contents to `/var/www/html` (or your web root)
3. Update your Nginx configuration with the provided `nginx.conf` settings
4. Reload Nginx: `sudo nginx -s reload`

### For Netlify/Vercel:
- The configuration files are automatically detected
- Just deploy your build folder

## Testing

After deployment, test these URLs:
- `https://www.nowestinterior.co.uk/` (should work)
- `https://www.nowestinterior.co.uk/admin/login` (should work, not 404)
- `https://www.nowestinterior.co.uk/about` (should work)
- `https://www.nowestinterior.co.uk/products` (should work)

All routes should serve the React app and let client-side routing handle the navigation.

## Troubleshooting

### Still getting 404 errors?
1. Check that `.htaccess` (for Apache) is in the correct location
2. Verify `mod_rewrite` is enabled (Apache)
3. Check Nginx configuration syntax (Nginx)
4. Ensure the file permissions are correct
5. Check server error logs

### Routes work but assets don't load?
- Make sure asset paths are relative (they should be with Vite)
- Check that the `base` in `vite.config.ts` is correct for your deployment path

