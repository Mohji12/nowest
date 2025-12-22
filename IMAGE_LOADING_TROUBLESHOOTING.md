# Image Loading Troubleshooting Guide

## Problem
Images from S3 bucket are not displaying in product/portfolio cards.

## Recent Improvements Made

### 1. Enhanced ProjectCard Component
- Added error handling for failed image loads
- Added fallback image display
- Added detailed console logging for debugging
- Added React import for useEffect hook

### 2. Image URL Conversion
- Backend converts relative paths to full S3 URLs
- Frontend also handles conversion as backup
- Both use: `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/`

## Debugging Steps

### Step 1: Check Browser Console
Open DevTools (F12) and look for:
- `[ProjectCard] Loading image for...` - Shows image URL being loaded
- `[ProjectCard] Image loaded successfully...` - Image loaded OK
- `[ProjectCard] Image failed to load...` - Image failed, check URL
- `[Products]` logs - Shows product image conversion

### Step 2: Check Network Tab
1. Open DevTools → Network tab
2. Filter by "Img"
3. Look for failed requests (red status)
4. Check the actual URL being requested
5. Click on failed request to see error details

### Step 3: Verify S3 Image URLs
Test the image URL directly in browser:
```
https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/YOUR_IMAGE_NAME.jpg
```

### Step 4: Check Database Image Paths
Run this SQL query to see what's stored:
```sql
SELECT id, name, image FROM products WHERE image IS NOT NULL LIMIT 10;
SELECT id, title, image FROM portfolio WHERE image IS NOT NULL LIMIT 10;
```

## Common Issues & Solutions

### Issue 1: Images are NULL in Database
**Symptoms:** Console shows "No image provided"
**Solution:**
1. Upload images to S3 bucket: `jgi-menteetracker/attached_assets/`
2. Update database records with image paths:
   ```sql
   UPDATE products SET image = 'image_name.jpg' WHERE id = 'product_id';
   UPDATE portfolio SET image = 'image_name.jpg' WHERE id = 'portfolio_id';
   ```

### Issue 2: CORS Errors
**Symptoms:** Console shows CORS error when loading images
**Solution:** Configure S3 bucket CORS:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

### Issue 3: 403 Forbidden Errors
**Symptoms:** Network tab shows 403 status
**Solution:** 
1. Check S3 bucket public access settings
2. Ensure bucket policy allows public read:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::jgi-menteetracker/attached_assets/*"
    }
  ]
}
```

### Issue 4: Wrong Image Path Format
**Symptoms:** Images not found (404)
**Solution:** Image paths should be:
- **Relative**: `image.jpg` or `/image.jpg` (without `attached_assets/` prefix)
- **Full URL**: Already converted by backend

### Issue 5: Backend Not Converting URLs
**Symptoms:** Images show relative paths in console
**Solution:** 
1. Check backend logs for conversion errors
2. Verify `convert_image_to_s3_url()` is being called
3. Check `app/services/product_service.py` and `app/services/portfolio_service.py`

### Issue 6: Images Don't Exist in S3
**Symptoms:** 404 errors for image URLs
**Solution:**
1. Verify images exist in S3:
   - Bucket: `jgi-menteetracker`
   - Path: `attached_assets/`
2. Check file names match database exactly (case-sensitive)
3. Upload missing images

## Testing Image URLs

### Test Backend API Response
```bash
curl https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/api/products
```

Check if `image` field contains full S3 URLs.

### Test S3 Image Directly
Replace `YOUR_IMAGE.jpg` with actual image name:
```bash
curl -I https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/YOUR_IMAGE.jpg
```

Should return `200 OK` status.

## Image Path Examples

### Correct Formats:
- Database: `image.jpg` → S3: `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/image.jpg`
- Database: `/image.jpg` → S3: `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/image.jpg`
- Database: `attached_assets/image.jpg` → S3: `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/image.jpg`
- Database: `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/image.jpg` → Used as-is

### Incorrect Formats:
- `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/image.jpg` (missing `attached_assets/`)
- `../image.jpg` (relative paths not supported)
- `C:\path\to\image.jpg` (local paths)

## Quick Fix Checklist

- [ ] Check browser console for error messages
- [ ] Verify images exist in S3 bucket
- [ ] Check S3 bucket CORS configuration
- [ ] Check S3 bucket public access policy
- [ ] Verify database image paths are correct
- [ ] Test image URL directly in browser
- [ ] Check backend API response includes image URLs
- [ ] Verify backend is converting paths to S3 URLs
- [ ] Check network tab for failed requests

## Next Steps

1. **If images are NULL:** Upload images and update database
2. **If CORS errors:** Configure S3 CORS policy
3. **If 403 errors:** Update S3 bucket policy
4. **If 404 errors:** Verify images exist in S3
5. **If wrong URLs:** Check backend conversion logic

## Support

Check these files for image handling:
- `frontend/src/components/ProjectCard.tsx` - Card component with error handling
- `frontend/src/pages/Products.tsx` - Product image conversion
- `frontend/src/pages/Portfolio.tsx` - Portfolio image conversion
- `app/services/product_service.py` - Backend product image conversion
- `app/services/portfolio_service.py` - Backend portfolio image conversion
- `app/utils/s3_utils.py` - S3 URL conversion utilities











