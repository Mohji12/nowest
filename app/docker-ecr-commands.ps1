# AWS ECR Configuration
$AWS_ACCOUNT_ID = "474833638797"
$ECR_REPO_NAME = "nowest"
$AWS_REGION = "ap-south-1"
$IMAGE_TAG = "latest"

# ECR Repository URL
$ECR_REPO_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Docker & ECR Deployment Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Repository: $ECR_REPO_URI"
Write-Host "Region: $AWS_REGION"
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Login to AWS ECR
Write-Host "Step 1: Authenticating with AWS ECR..." -ForegroundColor Yellow
$loginCommand = aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_URI

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to authenticate with ECR" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Successfully authenticated with ECR" -ForegroundColor Green
Write-Host ""

# Step 2: Create ECR repository if it doesn't exist
Write-Host "Step 2: Checking if ECR repository exists..." -ForegroundColor Yellow
$repoCheck = aws ecr describe-repositories --repository-names $ECR_REPO_NAME --region $AWS_REGION 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Repository doesn't exist. Creating it..." -ForegroundColor Yellow
    aws ecr create-repository `
        --repository-name $ECR_REPO_NAME `
        --region $AWS_REGION `
        --image-scanning-configuration scanOnPush=true `
        --image-tag-mutability MUTABLE
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to create ECR repository" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Repository created successfully" -ForegroundColor Green
} else {
    Write-Host "✓ Repository already exists" -ForegroundColor Green
}
Write-Host ""

# Step 3: Build Docker image
Write-Host "Step 3: Building Docker image..." -ForegroundColor Yellow
Set-Location $PSScriptRoot  # Change to app directory
docker build -f Dockerfile.lambda -t "${ECR_REPO_NAME}:${IMAGE_TAG}" .

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Docker image built successfully" -ForegroundColor Green
Write-Host ""

# Step 4: Tag the image for ECR
Write-Host "Step 4: Tagging image for ECR..." -ForegroundColor Yellow
docker tag "${ECR_REPO_NAME}:${IMAGE_TAG}" "${ECR_REPO_URI}:${IMAGE_TAG}"

# Optional: Tag with version or timestamp
$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"
docker tag "${ECR_REPO_NAME}:${IMAGE_TAG}" "${ECR_REPO_URI}:${TIMESTAMP}"
Write-Host "✓ Image tagged as: ${ECR_REPO_URI}:${IMAGE_TAG}" -ForegroundColor Green
Write-Host "✓ Image also tagged as: ${ECR_REPO_URI}:${TIMESTAMP}" -ForegroundColor Green
Write-Host ""

# Step 5: Push image to ECR
Write-Host "Step 5: Pushing image to ECR..." -ForegroundColor Yellow
docker push "${ECR_REPO_URI}:${IMAGE_TAG}"
docker push "${ECR_REPO_URI}:${TIMESTAMP}"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to push image to ECR" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Image pushed successfully to ECR" -ForegroundColor Green
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Image URI: ${ECR_REPO_URI}:${IMAGE_TAG}"
Write-Host "Image URI (timestamped): ${ECR_REPO_URI}:${TIMESTAMP}"
Write-Host "==========================================" -ForegroundColor Cyan

