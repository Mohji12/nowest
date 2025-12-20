# How to Check S3 Bucket Images

## Method 1: Using Python Script (Recommended)

### Prerequisites:
1. Install boto3:
   ```bash
   pip install boto3
   ```

2. Configure AWS credentials (choose one):
   - **AWS CLI**: Run `aws configure` and enter your credentials
   - **Environment variables**: Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
   - **IAM Role**: If running on EC2

### Run the script:
```bash
python app/list_s3_images.py
```

This will:
- Scan both `jgi-menteetracker` and `jgi-menteetrackers` buckets
- Count all images (jpg, jpeg, png, gif, webp, bmp, svg)
- Group images by folder
- Display all image URLs
- Show total count

---

## Method 2: Using AWS CLI

### List all objects in a bucket:
```bash
aws s3 ls s3://jgi-menteetracker/ --recursive
aws s3 ls s3://jgi-menteetrackers/ --recursive
```

### Count images only:
```bash
# For jgi-menteetracker
aws s3 ls s3://jgi-menteetracker/ --recursive | grep -E '\.(jpg|jpeg|png|gif|webp|bmp|svg)$' | wc -l

# For jgi-menteetrackers
aws s3 ls s3://jgi-menteetrackers/ --recursive | grep -E '\.(jpg|jpeg|png|gif|webp|bmp|svg)$' | wc -l
```

### List images in specific folder:
```bash
# List images in Nowest_Image folder
aws s3 ls s3://jgi-menteetrackers/Nowest_Image/ --recursive

# List images in attached_assets folder
aws s3 ls s3://jgi-menteetracker/attached_assets/ --recursive
```

---

## Method 3: Using AWS Console

1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Select the bucket: `jgi-menteetracker` or `jgi-menteetrackers`
3. Browse folders to see images
4. Use the search/filter to find specific files

---

## Method 4: Check Database References

Check what images are currently referenced in your database:

### Products:
```sql
SELECT COUNT(*) as total_products_with_images, 
       COUNT(DISTINCT image) as unique_images
FROM products 
WHERE image IS NOT NULL AND image != '';
```

### Portfolio:
```sql
SELECT COUNT(*) as total_portfolio_with_images,
       COUNT(DISTINCT image) as unique_images
FROM portfolio 
WHERE image IS NOT NULL AND image != '';
```

### List all unique S3 image URLs:
```sql
-- Products
SELECT DISTINCT image 
FROM products 
WHERE image LIKE '%s3%' OR image LIKE '%jgi-menteetracker%'
ORDER BY image;

-- Portfolio
SELECT DISTINCT image 
FROM portfolio 
WHERE image LIKE '%s3%' OR image LIKE '%jgi-menteetracker%'
ORDER BY image;
```

---

## Method 5: Quick Check via Browser

Since your S3 bucket appears to be public, you can try accessing:
- `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/`
- `https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/`

However, S3 doesn't provide directory listing by default, so you'll need to know the exact file path.

---

## Expected Bucket Structure

Based on your codebase, images are likely in:
- `jgi-menteetracker/attached_assets/` - Product and portfolio images
- `jgi-menteetrackers/Nowest_Image/` - Product images
- `jgi-menteetrackers/attached_assets/stock_images/` - Stock images

---

## Troubleshooting

### If you get "Access Denied":
- Check your AWS credentials
- Verify bucket permissions
- Ensure your IAM user/role has `s3:ListBucket` permission

### If you get "NoSuchBucket":
- Verify the bucket name is correct
- Check the AWS region (should be `ap-south-1`)

### If script doesn't find images:
- Check file extensions (script looks for: jpg, jpeg, png, gif, webp, bmp, svg)
- Verify images are actually in the bucket
- Check bucket name spelling



