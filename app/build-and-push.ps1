# Simple Docker Build and Push to ECR Script
# Just run: .\build-and-push.ps1

$ErrorActionPreference = "Stop"

# Configuration
$AWS_ACCOUNT_ID = "474833638797"
$ECR_REPO_NAME = "nowest"
$AWS_REGION = "ap-south-1"
$IMAGE_TAG = "latest"
$ECR_REPO_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

Write-Host "`n=== Building and Pushing Docker Image to ECR ===" -ForegroundColor Cyan
Write-Host "Repository: $ECR_REPO_URI`n" -ForegroundColor Yellow

# Step 1: Login
Write-Host "[1/4] Logging into ECR..." -ForegroundColor Yellow
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_URI
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: ECR login failed" -ForegroundColor Red; exit 1 }

# Step 2: Build
Write-Host "[2/4] Building Docker image..." -ForegroundColor Yellow
docker build -f Dockerfile.lambda -t "${ECR_REPO_NAME}:${IMAGE_TAG}" .
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: Docker build failed" -ForegroundColor Red; exit 1 }

# Step 3: Tag
Write-Host "[3/4] Tagging image..." -ForegroundColor Yellow
docker tag "${ECR_REPO_NAME}:${IMAGE_TAG}" "${ECR_REPO_URI}:${IMAGE_TAG}"
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: Tagging failed" -ForegroundColor Red; exit 1 }

# Step 4: Push
Write-Host "[4/4] Pushing to ECR..." -ForegroundColor Yellow
docker push "${ECR_REPO_URI}:${IMAGE_TAG}"
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: Push failed" -ForegroundColor Red; exit 1 }

Write-Host "`n=== SUCCESS! ===" -ForegroundColor Green
Write-Host "Image URI: ${ECR_REPO_URI}:${IMAGE_TAG}" -ForegroundColor Cyan
Write-Host "`n"



