# Fix 500 Errors - Deployment Instructions

## Quick Fix: Deploy New Image

The 500 errors are likely due to the Lambda function needing an update. Follow these steps:

### Option 1: Use the Complete Deployment Script (Recommended)

```powershell
cd app
.\deploy-lambda.ps1
```

This script will:
1. ✅ Login to ECR
2. ✅ Create ECR repository if needed
3. ✅ Build Docker image
4. ✅ Tag and push to ECR
5. ✅ Update Lambda function
6. ✅ Wait for deployment to complete

### Option 2: Manual Steps

If you prefer manual control:

```powershell
# 1. Login to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com

# 2. Build image
cd app
docker build -f Dockerfile.lambda -t nowest:latest .

# 3. Tag for ECR
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest

# 4. Push to ECR
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest

# 5. Update Lambda
aws lambda update-function-code `
    --function-name nowestInteriorAPI `
    --image-uri 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest `
    --region ap-south-1
```

---

## Troubleshooting 500 Errors

After deploying, if you still get 500 errors, check:

### 1. Check Lambda Logs

```powershell
aws logs tail /aws/lambda/nowestInteriorAPI --follow --region ap-south-1
```

This will show you the actual error messages.

### 2. Common Issues:

#### Database Connection Issues
- **Problem**: Lambda can't connect to RDS
- **Solution**: Ensure Lambda is in the same VPC as RDS, or RDS allows public access
- **Check**: Lambda function VPC configuration in AWS Console

#### Missing Environment Variables
- **Problem**: `DATABASE_URL` not set in Lambda
- **Solution**: Set environment variables in Lambda:
  ```powershell
  aws lambda update-function-configuration `
      --function-name nowestInteriorAPI `
      --environment Variables="{DATABASE_URL=mysql+pymysql://admin:Krintix#2025@menteetracker.cfiuwyek2vbk.ap-south-1.rds.amazonaws.com:3306/nowest_interior,SECRET_KEY=nowest-interior-secret-key-2024}" `
      --region ap-south-1
  ```

#### Lambda Timeout
- **Problem**: Lambda times out before database connection completes
- **Solution**: Increase Lambda timeout (default is 3 seconds, try 30+ seconds)

### 3. Test Health Endpoint

After deployment, test the health endpoint:
```powershell
curl https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/health
```

This will show database connection status.

---

## Verify Deployment

1. **Check Lambda Function Status:**
   ```powershell
   aws lambda get-function --function-name nowestInteriorAPI --region ap-south-1
   ```

2. **Check ECR Image:**
   ```powershell
   aws ecr describe-images --repository-name nowest --region ap-south-1
   ```

3. **Test API Endpoints:**
   - Health: `https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/health`
   - Products: `https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/api/products`
   - Brochures: `https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/api/brochures`

---

## Configuration Summary

- **Account ID**: 474833638797
- **ECR Repository**: nowest
- **Region**: ap-south-1
- **Lambda Function**: nowestInteriorAPI
- **ECR URI**: 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest











