# Complete Lambda Deployment Script
# Builds Docker image, pushes to ECR, and updates Lambda function
# Usage: .\deploy-lambda.ps1

$ErrorActionPreference = "Stop"

# Configuration
$AWS_ACCOUNT_ID = "474833638797"
$ECR_REPO_NAME = "nowest"
$AWS_REGION = "ap-south-1"
$IMAGE_TAG = "latest"
$LAMBDA_FUNCTION_NAME = "nowestInteriorAPI"
$ECR_REPO_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Lambda Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ECR Repository: $ECR_REPO_URI" -ForegroundColor Yellow
Write-Host "Lambda Function: $LAMBDA_FUNCTION_NAME" -ForegroundColor Yellow
Write-Host "Region: $AWS_REGION`n" -ForegroundColor Yellow

# Step 1: Login to ECR
Write-Host "[1/6] Logging into ECR..." -ForegroundColor Yellow
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO_URI
if ($LASTEXITCODE -ne 0) { 
    Write-Host "ERROR: ECR login failed" -ForegroundColor Red
    Write-Host "Make sure AWS CLI is configured: aws configure" -ForegroundColor Yellow
    exit 1 
}
Write-Host "✓ Successfully authenticated with ECR" -ForegroundColor Green
Write-Host ""

# Step 2: Check/Create ECR Repository
Write-Host "[2/6] Checking ECR repository..." -ForegroundColor Yellow
$repoExists = aws ecr describe-repositories --repository-names $ECR_REPO_NAME --region $AWS_REGION 2>$null
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

# Step 3: Build Docker Image
Write-Host "[3/6] Building Docker image..." -ForegroundColor Yellow
docker build -f Dockerfile.lambda -t "${ECR_REPO_NAME}:${IMAGE_TAG}" .
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker build failed" -ForegroundColor Red
    Write-Host "Make sure Docker Desktop is running" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Docker image built successfully" -ForegroundColor Green
Write-Host ""

# Step 4: Tag Image for ECR
Write-Host "[4/6] Tagging image for ECR..." -ForegroundColor Yellow
docker tag "${ECR_REPO_NAME}:${IMAGE_TAG}" "${ECR_REPO_URI}:${IMAGE_TAG}"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Tagging failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Image tagged successfully" -ForegroundColor Green
Write-Host ""

# Step 5: Push to ECR
Write-Host "[5/6] Pushing image to ECR..." -ForegroundColor Yellow
docker push "${ECR_REPO_URI}:${IMAGE_TAG}"
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Push failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Image pushed to ECR successfully" -ForegroundColor Green
Write-Host ""

# Step 6: Update Lambda Function
Write-Host "[6/6] Updating Lambda function..." -ForegroundColor Yellow
$imageUri = "${ECR_REPO_URI}:${IMAGE_TAG}"
aws lambda update-function-code `
    --function-name $LAMBDA_FUNCTION_NAME `
    --image-uri $imageUri `
    --region $AWS_REGION

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to update Lambda function" -ForegroundColor Red
    Write-Host "Make sure the Lambda function exists: $LAMBDA_FUNCTION_NAME" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Lambda function update initiated" -ForegroundColor Green
Write-Host ""

# Wait for update to complete
Write-Host "⏳ Waiting for Lambda update to complete..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0
$success = $false

while ($attempt -lt $maxAttempts -and -not $success) {
    Start-Sleep -Seconds 5
    $status = aws lambda get-function `
        --function-name $LAMBDA_FUNCTION_NAME `
        --region $AWS_REGION `
        --query "Configuration.LastUpdateStatus" `
        --output text 2>$null
    
    if ($status -eq "Successful") {
        Write-Host "✓ Lambda function updated successfully!" -ForegroundColor Green
        $success = $true
    } elseif ($status -eq "Failed") {
        Write-Host "❌ Lambda function update failed" -ForegroundColor Red
        exit 1
    } else {
        $attempt++
        Write-Host "  Status: $status (attempt $attempt/$maxAttempts)" -ForegroundColor Gray
    }
}

if (-not $success) {
    Write-Host "⚠️  Timeout waiting for update. Check AWS Console for status." -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Image URI: $imageUri" -ForegroundColor Cyan
Write-Host "Lambda Function: $LAMBDA_FUNCTION_NAME" -ForegroundColor Cyan
Write-Host "`nYour API should be available at:" -ForegroundColor Yellow
Write-Host "https://oljximoxqf.execute-api.ap-south-1.amazonaws.com" -ForegroundColor Cyan
Write-Host "`n"














