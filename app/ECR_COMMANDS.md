# Docker & ECR Commands for Nowest Application

## Quick Reference

**ECR Repository URI:** `474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest`

**Region:** `ap-south-1`

**Account ID:** `474833638797`

---

## Manual Commands (Step by Step)

### 1. Authenticate with AWS ECR

**Linux/Mac:**
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

**Windows PowerShell:**
```powershell
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

### 2. Create ECR Repository (if it doesn't exist)

```bash
aws ecr create-repository \
    --repository-name nowest \
    --region ap-south-1 \
    --image-scanning-configuration scanOnPush=true \
    --image-tag-mutability MUTABLE
```

### 3. Build Docker Image

Navigate to the `app` directory first:
```bash
cd app
docker build -f Dockerfile.lambda -t nowest:latest .
```

### 4. Tag Image for ECR

```bash
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

Optional: Tag with timestamp
```bash
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:$(date +%Y%m%d-%H%M%S)
```

### 5. Push Image to ECR

```bash
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Using the Automated Scripts

### For Linux/Mac:
```bash
cd app
chmod +x docker-ecr-commands.sh
./docker-ecr-commands.sh
```

### For Windows PowerShell:
```powershell
cd app
.\docker-ecr-commands.ps1
```

---

## All-in-One Command (Linux/Mac)

```bash
cd app && \
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com && \
docker build -f Dockerfile.lambda -t nowest:latest . && \
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest && \
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Prerequisites

1. **AWS CLI installed and configured:**
   ```bash
   aws configure
   ```

2. **Docker installed and running:**
   ```bash
   docker --version
   ```

3. **AWS credentials with ECR permissions:**
   - `ecr:GetAuthorizationToken`
   - `ecr:BatchCheckLayerAvailability`
   - `ecr:GetDownloadUrlForLayer`
   - `ecr:BatchGetImage`
   - `ecr:PutImage`
   - `ecr:InitiateLayerUpload`
   - `ecr:UploadLayerPart`
   - `ecr:CompleteLayerUpload`
   - `ecr:CreateRepository` (if creating new repo)

---

## Verify Image in ECR

```bash
aws ecr describe-images --repository-name nowest --region ap-south-1
```

---

## Troubleshooting

### Error: "no basic auth credentials"
- Make sure you've authenticated with ECR (Step 1)

### Error: "repository does not exist"
- Run the create repository command (Step 2)

### Error: "denied: Your Authorization Token has expired"
- Re-authenticate with ECR (Step 1)

### Error: "Cannot connect to the Docker daemon"
- Make sure Docker Desktop is running

