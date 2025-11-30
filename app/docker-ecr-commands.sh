#!/bin/bash

# AWS ECR Configuration
AWS_ACCOUNT_ID="474833638797"
ECR_REPO_NAME="nowest"
AWS_REGION="ap-south-1"
IMAGE_TAG="latest"

# ECR Repository URL
ECR_REPO_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

echo "=========================================="
echo "Docker & ECR Deployment Script"
echo "=========================================="
echo "Repository: ${ECR_REPO_URI}"
echo "Region: ${AWS_REGION}"
echo "=========================================="
echo ""

# Step 1: Login to AWS ECR
echo "Step 1: Authenticating with AWS ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO_URI}

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to authenticate with ECR"
    exit 1
fi
echo "✓ Successfully authenticated with ECR"
echo ""

# Step 2: Create ECR repository if it doesn't exist
echo "Step 2: Checking if ECR repository exists..."
aws ecr describe-repositories --repository-names ${ECR_REPO_NAME} --region ${AWS_REGION} 2>/dev/null

if [ $? -ne 0 ]; then
    echo "Repository doesn't exist. Creating it..."
    aws ecr create-repository \
        --repository-name ${ECR_REPO_NAME} \
        --region ${AWS_REGION} \
        --image-scanning-configuration scanOnPush=true \
        --image-tag-mutability MUTABLE
    
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to create ECR repository"
        exit 1
    fi
    echo "✓ Repository created successfully"
else
    echo "✓ Repository already exists"
fi
echo ""

# Step 3: Build Docker image
echo "Step 3: Building Docker image..."
cd "$(dirname "$0")"  # Change to app directory
docker build -f Dockerfile.lambda -t ${ECR_REPO_NAME}:${IMAGE_TAG} .

if [ $? -ne 0 ]; then
    echo "ERROR: Docker build failed"
    exit 1
fi
echo "✓ Docker image built successfully"
echo ""

# Step 4: Tag the image for ECR
echo "Step 4: Tagging image for ECR..."
docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REPO_URI}:${IMAGE_TAG}

# Optional: Tag with version or timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REPO_URI}:${TIMESTAMP}
echo "✓ Image tagged as: ${ECR_REPO_URI}:${IMAGE_TAG}"
echo "✓ Image also tagged as: ${ECR_REPO_URI}:${TIMESTAMP}"
echo ""

# Step 5: Push image to ECR
echo "Step 5: Pushing image to ECR..."
docker push ${ECR_REPO_URI}:${IMAGE_TAG}
docker push ${ECR_REPO_URI}:${TIMESTAMP}

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to push image to ECR"
    exit 1
fi
echo "✓ Image pushed successfully to ECR"
echo ""

echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Image URI: ${ECR_REPO_URI}:${IMAGE_TAG}"
echo "Image URI (timestamped): ${ECR_REPO_URI}:${TIMESTAMP}"
echo "=========================================="

