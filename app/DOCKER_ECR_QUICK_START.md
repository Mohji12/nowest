# Docker & ECR Quick Start Commands

## Prerequisites
- AWS CLI configured: `aws configure`
- Docker Desktop running
- AWS credentials with ECR permissions

---

## Quick Commands (Copy & Paste)

### Step 1: Login to ECR
```powershell
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

### Step 2: Build Docker Image
```powershell
cd app
docker build -f Dockerfile.lambda -t nowest:latest .
```

### Step 3: Tag Image for ECR
```powershell
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

### Step 4: Push to ECR
```powershell
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## All-in-One Command (PowerShell)

```powershell
cd app; aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com; docker build -f Dockerfile.lambda -t nowest:latest .; docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest; docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Create ECR Repository (if needed)

```powershell
aws ecr create-repository --repository-name nowest --region ap-south-1 --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE
```

---

## Verify Image in ECR

```powershell
aws ecr describe-images --repository-name nowest --region ap-south-1
```

---

## Configuration

- **Account ID:** 474833638797
- **Region:** ap-south-1
- **Repository:** nowest
- **ECR URI:** 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest








