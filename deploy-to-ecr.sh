#!/bin/bash

# Docker & ECR Deployment Script for Nowest Application
# AWS Account ID: 474833638797
# Repository: nowest
# Region: ap-south-1

set -e  # Exit on error

# Configuration
AWS_ACCOUNT_ID="474833638797"
ECR_REPO="nowest"
REGION="ap-south-1"
IMAGE_NAME="nowest"
IMAGE_TAG="latest"
ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO}"

echo "=========================================="
echo "Docker & ECR Deployment Script"
echo "=========================================="
echo "Repository: ${ECR_REPO}"
echo "Region: ${REGION}"
echo "ECR URI: ${ECR_URI}"
echo "=========================================="
echo ""

# Step 1: Authenticate with ECR
echo "Step 1: Authenticating with AWS ECR..."
aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ECR_URI}

if [ $? -eq 0 ]; then
    echo "✓ Authentication successful"
else
    echo "✗ Authentication failed"
    exit 1
fi

# Step 2: Check if repository exists, create if not
echo ""
echo "Step 2: Checking ECR repository..."
if aws ecr describe-repositories --repository-names ${ECR_REPO} --region ${REGION} 2>/dev/null; then
    echo "✓ Repository exists"
else
    echo "Repository not found. Creating..."
    aws ecr create-repository \
        --repository-name ${ECR_REPO} \
        --region ${REGION} \
        --image-scanning-configuration scanOnPush=true \
        --image-tag-mutability MUTABLE
    echo "✓ Repository created"
fi

# Step 3: Navigate to app directory
echo ""
echo "Step 3: Navigating to app directory..."
if [ -d "app" ]; then
    cd app
    echo "✓ In app directory"
else
    echo "✗ app directory not found. Please run this script from the project root."
    exit 1
fi

# Step 4: Build Docker image
echo ""
echo "Step 4: Building Docker image..."
docker build -f Dockerfile.lambda -t ${IMAGE_NAME}:${IMAGE_TAG} .

if [ $? -eq 0 ]; then
    echo "✓ Image built successfully"
else
    echo "✗ Image build failed"
    exit 1
fi

# Step 5: Tag image for ECR
echo ""
echo "Step 5: Tagging image for ECR..."
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_URI}:${IMAGE_TAG}

# Optional: Tag with timestamp
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_URI}:${TIMESTAMP}
echo "✓ Image tagged as: ${IMAGE_TAG} and ${TIMESTAMP}"

# Step 6: Push image to ECR
echo ""
echo "Step 6: Pushing image to ECR..."
docker push ${ECR_URI}:${IMAGE_TAG}
docker push ${ECR_URI}:${TIMESTAMP}

if [ $? -eq 0 ]; then
    echo "✓ Image pushed successfully"
else
    echo "✗ Image push failed"
    exit 1
fi

# Step 7: Verify deployment
echo ""
echo "Step 7: Verifying deployment..."
aws ecr describe-images --repository-name ${ECR_REPO} --region ${REGION} --image-ids imageTag=${IMAGE_TAG}

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Image URI: ${ECR_URI}:${IMAGE_TAG}"
echo "Timestamped URI: ${ECR_URI}:${TIMESTAMP}"
echo "=========================================="

