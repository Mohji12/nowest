#!/usr/bin/env python3
"""
Docker-based AWS Lambda deployment script for Nowest Interior API.
"""
import os
import sys
import subprocess
import json
import time
from pathlib import Path

# Configuration
AWS_REGION = "ap-south-1"
FUNCTION_NAME = "nowestInteriorAPI"
ECR_REPOSITORY = "nowest-interior-api"
DOCKER_IMAGE_TAG = "latest"
DOCKERFILE_PATH = "Dockerfile.lambda"

class DockerLambdaDeployer:
    def __init__(self):
        self.aws_account_id = self.get_aws_account_id()
        self.ecr_uri = f"{self.aws_account_id}.dkr.ecr.{AWS_REGION}.amazonaws.com/{ECR_REPOSITORY}"
        
    def get_aws_account_id(self):
        """Get AWS account ID."""
        try:
            result = subprocess.run(
                ["aws", "sts", "get-caller-identity", "--query", "Account", "--output", "text"],
                capture_output=True,
                text=True,
                check=True
            )
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            print(f"❌ Error getting AWS account ID: {e}")
            sys.exit(1)
    
    def check_prerequisites(self):
        """Check if required tools are installed."""
        print("🔍 Checking prerequisites...")
        
        # Check Docker
        try:
            subprocess.run(["docker", "--version"], capture_output=True, check=True)
            print("✅ Docker is installed")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ Docker is not installed or not in PATH")
            return False
        
        # Check AWS CLI
        try:
            subprocess.run(["aws", "--version"], capture_output=True, check=True)
            print("✅ AWS CLI is installed")
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("❌ AWS CLI is not installed or not in PATH")
            return False
        
        # Check if logged into AWS
        try:
            subprocess.run(["aws", "sts", "get-caller-identity"], capture_output=True, check=True)
            print("✅ AWS credentials are configured")
        except subprocess.CalledProcessError:
            print("❌ AWS credentials not configured. Run 'aws configure' first")
            return False
        
        return True
    
    def create_ecr_repository(self):
        """Create ECR repository if it doesn't exist."""
        print(f"🏗️  Creating ECR repository: {ECR_REPOSITORY}")
        
        try:
            # Check if repository exists
            subprocess.run([
                "aws", "ecr", "describe-repositories",
                "--repository-names", ECR_REPOSITORY,
                "--region", AWS_REGION
            ], capture_output=True, check=True)
            print(f"✅ ECR repository {ECR_REPOSITORY} already exists")
        except subprocess.CalledProcessError:
            # Repository doesn't exist, create it
            try:
                subprocess.run([
                    "aws", "ecr", "create-repository",
                    "--repository-name", ECR_REPOSITORY,
                    "--region", AWS_REGION,
                    "--image-scanning-configuration", "scanOnPush=true"
                ], check=True)
                print(f"✅ Created ECR repository: {ECR_REPOSITORY}")
            except subprocess.CalledProcessError as e:
                print(f"❌ Error creating ECR repository: {e}")
                return False
        
        return True
    
    def login_to_ecr(self):
        """Login to ECR."""
        print("🔐 Logging into ECR...")
        
        try:
            subprocess.run([
                "aws", "ecr", "get-login-password",
                "--region", AWS_REGION
            ], stdout=subprocess.PIPE, check=True)
            
            # Get login token and login to Docker
            result = subprocess.run([
                "aws", "ecr", "get-login-password",
                "--region", AWS_REGION
            ], capture_output=True, text=True, check=True)
            
            login_process = subprocess.run([
                "docker", "login",
                "--username", "AWS",
                "--password-stdin",
                self.ecr_uri
            ], input=result.stdout, text=True, check=True)
            
            print("✅ Successfully logged into ECR")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error logging into ECR: {e}")
            return False
    
    def build_docker_image(self):
        """Build Docker image."""
        print(f"🔨 Building Docker image: {ECR_REPOSITORY}:{DOCKER_IMAGE_TAG}")
        
        try:
            subprocess.run([
                "docker", "build",
                "-f", DOCKERFILE_PATH,
                "-t", f"{ECR_REPOSITORY}:{DOCKER_IMAGE_TAG}",
                "-t", f"{self.ecr_uri}:{DOCKER_IMAGE_TAG}",
                "."
            ], check=True)
            print("✅ Docker image built successfully")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error building Docker image: {e}")
            return False
    
    def push_to_ecr(self):
        """Push Docker image to ECR."""
        print(f"📤 Pushing image to ECR: {self.ecr_uri}:{DOCKER_IMAGE_TAG}")
        
        try:
            subprocess.run([
                "docker", "push", f"{self.ecr_uri}:{DOCKER_IMAGE_TAG}"
            ], check=True)
            print("✅ Image pushed to ECR successfully")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error pushing to ECR: {e}")
            return False
    
    def update_lambda_function(self):
        """Update Lambda function with new Docker image."""
        print(f"🚀 Updating Lambda function: {FUNCTION_NAME}")
        
        try:
            subprocess.run([
                "aws", "lambda", "update-function-code",
                "--function-name", FUNCTION_NAME,
                "--image-uri", f"{self.ecr_uri}:{DOCKER_IMAGE_TAG}",
                "--region", AWS_REGION
            ], check=True)
            print("✅ Lambda function updated successfully")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error updating Lambda function: {e}")
            return False
    
    def wait_for_update(self):
        """Wait for Lambda function update to complete."""
        print("⏳ Waiting for Lambda function update to complete...")
        
        max_attempts = 30
        for attempt in range(max_attempts):
            try:
                result = subprocess.run([
                    "aws", "lambda", "get-function",
                    "--function-name", FUNCTION_NAME,
                    "--region", AWS_REGION,
                    "--query", "Configuration.LastUpdateStatus",
                    "--output", "text"
                ], capture_output=True, text=True, check=True)
                
                status = result.stdout.strip()
                if status == "Successful":
                    print("✅ Lambda function update completed successfully")
                    return True
                elif status == "Failed":
                    print("❌ Lambda function update failed")
                    return False
                else:
                    print(f"⏳ Update status: {status} (attempt {attempt + 1}/{max_attempts})")
                    time.sleep(10)
            except subprocess.CalledProcessError as e:
                print(f"❌ Error checking update status: {e}")
                return False
        
        print("❌ Timeout waiting for Lambda function update")
        return False
    
    def test_lambda_function(self):
        """Test the updated Lambda function."""
        print("🧪 Testing Lambda function...")
        
        try:
            # Test with a simple invocation
            result = subprocess.run([
                "aws", "lambda", "invoke",
                "--function-name", FUNCTION_NAME,
                "--region", AWS_REGION,
                "--payload", '{"httpMethod": "GET", "path": "/health"}',
                "/tmp/lambda_response.json"
            ], check=True)
            
            # Read the response
            with open("/tmp/lambda_response.json", "r") as f:
                response = json.load(f)
            
            if "statusCode" in response and response["statusCode"] == 200:
                print("✅ Lambda function test successful")
                return True
            else:
                print(f"❌ Lambda function test failed: {response}")
                return False
        except subprocess.CalledProcessError as e:
            print(f"❌ Error testing Lambda function: {e}")
            return False
    
    def deploy(self):
        """Main deployment process."""
        print("🚀 Starting Docker-based Lambda deployment...")
        print(f"📋 Configuration:")
        print(f"   - Function Name: {FUNCTION_NAME}")
        print(f"   - ECR Repository: {ECR_REPOSITORY}")
        print(f"   - AWS Region: {AWS_REGION}")
        print(f"   - ECR URI: {self.ecr_uri}")
        print("-" * 50)
        
        # Check prerequisites
        if not self.check_prerequisites():
            return False
        
        # Create ECR repository
        if not self.create_ecr_repository():
            return False
        
        # Login to ECR
        if not self.login_to_ecr():
            return False
        
        # Build Docker image
        if not self.build_docker_image():
            return False
        
        # Push to ECR
        if not self.push_to_ecr():
            return False
        
        # Update Lambda function
        if not self.update_lambda_function():
            return False
        
        # Wait for update to complete
        if not self.wait_for_update():
            return False
        
        # Test the function
        if not self.test_lambda_function():
            return False
        
        print("🎉 Deployment completed successfully!")
        print(f"🌐 Your Lambda function is available at:")
        print(f"   https://nd5yby5xpbnf6lfh7742ajtkzm0uyuaq.lambda-url.ap-south-1.on.aws")
        
        return True

def main():
    """Main function."""
    deployer = DockerLambdaDeployer()
    
    if len(sys.argv) > 1 and sys.argv[1] == "--help":
        print("Docker-based AWS Lambda Deployment Script")
        print("Usage: python deploy_docker_lambda.py")
        print("\nThis script will:")
        print("1. Check prerequisites (Docker, AWS CLI)")
        print("2. Create ECR repository if needed")
        print("3. Build Docker image")
        print("4. Push image to ECR")
        print("5. Update Lambda function")
        print("6. Test the deployment")
        return
    
    success = deployer.deploy()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
