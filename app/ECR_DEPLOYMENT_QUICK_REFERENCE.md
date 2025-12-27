# ECR Deployment Quick Reference

## Configuration
- **AWS Account ID**: `474833638797`
- **ECR Repository**: `nowest`
- **Region**: `ap-south-1`
- **ECR URI**: `474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest`

## Quick Commands

### Option 1: Use the Automated Scripts (Recommended)

**For Windows (PowerShell):**
```powershell
cd app
.\docker-ecr-commands.ps1
```

**For Linux/Mac (Bash):**
```bash
cd app
chmod +x docker-ecr-commands.sh
./docker-ecr-commands.sh
```

### Option 2: Manual Commands

#### Step 1: Login to AWS ECR
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

#### Step 2: Create ECR Repository (if it doesn't exist)
```bash
aws ecr create-repository \
    --repository-name nowest \
    --region ap-south-1 \
    --image-scanning-configuration scanOnPush=true \
    --image-tag-mutability MUTABLE
```

#### Step 3: Build Docker Image
```bash
cd app
docker build -f Dockerfile.lambda -t nowest:latest .
```

#### Step 4: Tag Image for ECR
```bash
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

#### Step 5: Push Image to ECR
```bash
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

## One-Line Commands (PowerShell)

```powershell
# Login
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com

# Build, Tag, and Push
cd app; docker build -f Dockerfile.lambda -t nowest:latest .; docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest; docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

## One-Line Commands (Bash)

```bash
# Login
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com

# Build, Tag, and Push
cd app && docker build -f Dockerfile.lambda -t nowest:latest . && docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest && docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

## Prerequisites

1. **AWS CLI installed and configured**
   ```bash
   aws --version
   aws configure
   ```

2. **Docker installed and running**
   ```bash
   docker --version
   ```

3. **AWS credentials with ECR permissions**
   - `ecr:GetAuthorizationToken`
   - `ecr:BatchCheckLayerAvailability`
   - `ecr:GetDownloadUrlForLayer`
   - `ecr:BatchGetImage`
   - `ecr:PutImage`
   - `ecr:InitiateLayerUpload`
   - `ecr:UploadLayerPart`
   - `ecr:CompleteLayerUpload`
   - `ecr:CreateRepository` (if creating new repo)

## Verify Deployment

```bash
# List images in ECR
aws ecr list-images --repository-name nowest --region ap-south-1

# Get image details
aws ecr describe-images --repository-name nowest --region ap-south-1
```

## Update Lambda Function

After pushing to ECR, update your Lambda function to use the new image:

```bash
aws lambda update-function-code \
    --function-name your-lambda-function-name \
    --image-uri 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest \
    --region ap-south-1
```

Or use the AWS Console:
1. Go to Lambda → Your Function
2. Click "Deploy new image"
3. Enter: `474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest`
4. Click "Save"

## Troubleshooting

### Authentication Error
```bash
# Re-authenticate
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

### Repository Not Found
```bash
# Create repository
aws ecr create-repository --repository-name nowest --region ap-south-1
```

### Build Fails
- Check Dockerfile.lambda exists
- Verify requirements.txt is present
- Check Docker is running

### Push Fails
- Verify ECR login
- Check AWS credentials
- Ensure repository exists
















