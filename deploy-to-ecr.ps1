# Docker & ECR Deployment Script for Nowest Application
# AWS Account ID: 474833638797
# Repository: nowest
# Region: ap-south-1

# Configuration
$AWS_ACCOUNT_ID = "474833638797"
$ECR_REPO = "nowest"
$REGION = "ap-south-1"
$IMAGE_NAME = "nowest"
$IMAGE_TAG = "latest"
$ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO}"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Docker & ECR Deployment Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Repository: $ECR_REPO"
Write-Host "Region: $REGION"
Write-Host "ECR URI: $ECR_URI"
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Authenticate with ECR
Write-Host "Step 1: Authenticating with AWS ECR..." -ForegroundColor Yellow
$loginCommand = "aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_URI"
Invoke-Expression $loginCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Authentication successful" -ForegroundColor Green
} else {
    Write-Host "✗ Authentication failed" -ForegroundColor Red
    exit 1
}

# Step 2: Check if repository exists, create if not
Write-Host ""
Write-Host "Step 2: Checking ECR repository..." -ForegroundColor Yellow
$repoCheck = aws ecr describe-repositories --repository-names $ECR_REPO --region $REGION 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Repository exists" -ForegroundColor Green
} else {
    Write-Host "Repository not found. Creating..." -ForegroundColor Yellow
    aws ecr create-repository `
        --repository-name $ECR_REPO `
        --region $REGION `
        --image-scanning-configuration scanOnPush=true `
        --image-tag-mutability MUTABLE
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Repository created" -ForegroundColor Green
    } else {
        Write-Host "✗ Repository creation failed" -ForegroundColor Red
        exit 1
    }
}

# Step 3: Navigate to app directory
Write-Host ""
Write-Host "Step 3: Navigating to app directory..." -ForegroundColor Yellow
if (Test-Path "app") {
    Set-Location app
    Write-Host "✓ In app directory" -ForegroundColor Green
} else {
    Write-Host "✗ app directory not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Step 4: Build Docker image
Write-Host ""
Write-Host "Step 4: Building Docker image..." -ForegroundColor Yellow
docker build -f Dockerfile.lambda -t "${IMAGE_NAME}:${IMAGE_TAG}" .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Image built successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Image build failed" -ForegroundColor Red
    exit 1
}

# Step 5: Tag image for ECR
Write-Host ""
Write-Host "Step 5: Tagging image for ECR..." -ForegroundColor Yellow
docker tag "${IMAGE_NAME}:${IMAGE_TAG}" "${ECR_URI}:${IMAGE_TAG}"

# Optional: Tag with timestamp
$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"
docker tag "${IMAGE_NAME}:${IMAGE_TAG}" "${ECR_URI}:${TIMESTAMP}"
Write-Host "✓ Image tagged as: $IMAGE_TAG and $TIMESTAMP" -ForegroundColor Green

# Step 6: Push image to ECR
Write-Host ""
Write-Host "Step 6: Pushing image to ECR..." -ForegroundColor Yellow
docker push "${ECR_URI}:${IMAGE_TAG}"
docker push "${ECR_URI}:${TIMESTAMP}"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Image pushed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Image push failed" -ForegroundColor Red
    exit 1
}

# Step 7: Verify deployment
Write-Host ""
Write-Host "Step 7: Verifying deployment..." -ForegroundColor Yellow
aws ecr describe-images --repository-name $ECR_REPO --region $REGION --image-ids imageTag=$IMAGE_TAG

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Image URI: ${ECR_URI}:${IMAGE_TAG}"
Write-Host "Timestamped URI: ${ECR_URI}:${TIMESTAMP}"
Write-Host "==========================================" -ForegroundColor Cyan

