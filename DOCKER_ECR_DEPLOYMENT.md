# Docker & ECR Deployment Guide for Nowest Application

## Configuration Details
- **AWS Account ID:** `474833638797`
- **ECR Repository:** `nowest`
- **Region:** `ap-south-1`
- **ECR URI:** `474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest`

---

## Prerequisites

1. **Install AWS CLI:**
   ```bash
   # Verify installation
   aws --version
   ```

2. **Configure AWS Credentials:**
   ```bash
   aws configure
   # Enter your AWS Access Key ID, Secret Access Key, and region (ap-south-1)
   ```

3. **Install Docker:**
   ```bash
   # Verify installation
   docker --version
   ```

---

## Step-by-Step Deployment Commands

### Step 1: Create ECR Repository (if it doesn't exist)

```bash
aws ecr create-repository \
    --repository-name nowest \
    --region ap-south-1 \
    --image-scanning-configuration scanOnPush=true \
    --image-tag-mutability MUTABLE
```

**Expected Output:** Repository details with URI

---

### Step 2: Authenticate Docker with ECR

**Linux/Mac:**
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

**Windows PowerShell:**
```powershell
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

**Windows CMD:**
```cmd
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

**Expected Output:** `Login Succeeded`

---

### Step 3: Navigate to App Directory

```bash
cd app
```

---

### Step 4: Build Docker Image

```bash
docker build -f Dockerfile.lambda -t nowest:latest .
```

**Expected Output:** Image built successfully with tag `nowest:latest`

---

### Step 5: Tag Image for ECR

**Tag as latest:**
```bash
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

**Tag with timestamp (optional):**
```bash
# Linux/Mac
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:$(date +%Y%m%d-%H%M%S)

# Windows PowerShell
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:$(Get-Date -Format "yyyyMMdd-HHmmss")
```

---

### Step 6: Push Image to ECR

```bash
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

**Expected Output:** Image pushed successfully with layers uploaded

---

## All-in-One Commands

### Linux/Mac (Bash)

```bash
cd app && \
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com && \
docker build -f Dockerfile.lambda -t nowest:latest . && \
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest && \
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

### Windows PowerShell

```powershell
cd app; `
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com; `
docker build -f Dockerfile.lambda -t nowest:latest .; `
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest; `
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Verify Deployment

### List Images in ECR

```bash
aws ecr describe-images --repository-name nowest --region ap-south-1
```

### List All Repositories

```bash
aws ecr describe-repositories --region ap-south-1
```

### View Image Details

```bash
aws ecr describe-images \
    --repository-name nowest \
    --region ap-south-1 \
    --image-ids imageTag=latest
```

---

## Useful Docker Commands

### List Local Images

```bash
docker images | grep nowest
```

### Remove Local Image

```bash
docker rmi nowest:latest
```

### View Image Size

```bash
docker images 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

### Pull Image from ECR

```bash
docker pull 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Troubleshooting

### Error: "no basic auth credentials"
**Solution:** Re-run the authentication command (Step 2)
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

### Error: "repository does not exist"
**Solution:** Create the repository (Step 1)
```bash
aws ecr create-repository --repository-name nowest --region ap-south-1
```

### Error: "denied: Your Authorization Token has expired"
**Solution:** ECR tokens expire after 12 hours. Re-authenticate:
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

### Error: "Cannot connect to the Docker daemon"
**Solution:** Start Docker Desktop or Docker service
- **Windows/Mac:** Start Docker Desktop application
- **Linux:** `sudo systemctl start docker`

### Error: "An error occurred (AccessDeniedException)"
**Solution:** Check your AWS credentials and IAM permissions. Ensure your user has:
- `ecr:GetAuthorizationToken`
- `ecr:BatchCheckLayerAvailability`
- `ecr:GetDownloadUrlForLayer`
- `ecr:BatchGetImage`
- `ecr:PutImage`
- `ecr:InitiateLayerUpload`
- `ecr:UploadLayerPart`
- `ecr:CompleteLayerUpload`

### Build Fails with "No such file or directory"
**Solution:** Ensure you're in the `app` directory when running the build command

---

## Quick Reference

```bash
# Full deployment workflow
cd app
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
docker build -f Dockerfile.lambda -t nowest:latest .
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Next Steps

After pushing the image to ECR, you can:

1. **Deploy to AWS Lambda** using the ECR image URI
2. **Deploy to ECS** (Elastic Container Service)
3. **Deploy to EKS** (Elastic Kubernetes Service)
4. **Use in CodePipeline** for CI/CD

**ECR Image URI for Lambda:**
```
474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

