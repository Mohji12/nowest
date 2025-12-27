# Docker & ECR Deployment Commands

## Configuration
- **AWS Account ID**: 474833638797
- **ECR Repository**: nowest
- **Region**: ap-south-1
- **ECR URI**: `474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest`

---

## Step-by-Step Commands

### Step 1: Login to AWS ECR

**Linux/Mac:**
```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

**Windows PowerShell:**
```powershell
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com
```

---

### Step 2: Create ECR Repository (if it doesn't exist)

```bash
aws ecr create-repository \
    --repository-name nowest \
    --region ap-south-1 \
    --image-scanning-configuration scanOnPush=true \
    --image-tag-mutability MUTABLE
```

---

### Step 3: Build Docker Image

Navigate to the `app` directory first:
```bash
cd app
```

Then build the image:
```bash
docker build -f Dockerfile.lambda -t nowest:latest .
```

---

### Step 4: Tag Image for ECR

```bash
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

**Optional: Tag with timestamp**
```bash
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:$(date +%Y%m%d-%H%M%S)
```

**Windows PowerShell:**
```powershell
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:$(Get-Date -Format "yyyyMMdd-HHmmss")
```

---

### Step 5: Push Image to ECR

```bash
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

**If you tagged with timestamp, also push that:**
```bash
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:$(date +%Y%m%d-%H%M%S)
```

---

## Quick One-Liner Commands (Linux/Mac)

```bash
# Login
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com

# Build
cd app && docker build -f Dockerfile.lambda -t nowest:latest .

# Tag
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest

# Push
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Quick One-Liner Commands (Windows PowerShell)

```powershell
# Login
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 474833638797.dkr.ecr.ap-south-1.amazonaws.com

# Build
cd app; docker build -f Dockerfile.lambda -t nowest:latest .

# Tag
docker tag nowest:latest 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest

# Push
docker push 474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

---

## Using Existing Scripts

You already have automated scripts:

**Linux/Mac:**
```bash
cd app
bash docker-ecr-commands.sh
```

**Windows PowerShell:**
```powershell
cd app
.\docker-ecr-commands.ps1
```

---

## Verify Deployment

Check if the image was pushed successfully:

```bash
aws ecr describe-images --repository-name nowest --region ap-south-1
```

---

## Image URI

After successful push, your image URI will be:
```
474833638797.dkr.ecr.ap-south-1.amazonaws.com/nowest:latest
```

Use this URI when deploying to Lambda or ECS.

