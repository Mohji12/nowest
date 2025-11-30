# Docker-based Lambda Deployment Guide

This guide explains how to deploy your Nowest Interior API to AWS Lambda using Docker containers.

## Prerequisites

1. **Docker Desktop** - Install and start Docker Desktop
2. **AWS CLI** - Configured with appropriate permissions
3. **AWS Account** - With Lambda and ECR access

## Quick Deployment

### Option 1: PowerShell Script (Windows)
```powershell
.\docker-deploy.ps1
```

### Option 2: Python Script (Cross-platform)
```bash
python deploy_docker_lambda.py
```

### Option 3: Manual Steps

1. **Start Docker Desktop** (if not already running)

2. **Get AWS Account ID**
   ```bash
   aws sts get-caller-identity --query Account --output text
   ```

3. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name nowest-interior-api --region ap-south-1 --image-scanning-configuration scanOnPush=true
   ```

4. **Login to ECR**
   ```bash
   aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com
   ```

5. **Build Docker Image**
   ```bash
   docker build -f Dockerfile.lambda -t nowest-interior-api:latest .
   ```

6. **Tag for ECR**
   ```bash
   docker tag nowest-interior-api:latest <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/nowest-interior-api:latest
   ```

7. **Push to ECR**
   ```bash
   docker push <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/nowest-interior-api:latest
   ```

8. **Update Lambda Function**
   ```bash
   aws lambda update-function-code --function-name nowestInteriorAPI --image-uri <ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com/nowest-interior-api:latest --region ap-south-1
   ```

## Local Testing

### Test Docker Build Locally
```bash
# Build the image
docker build -f Dockerfile.lambda -t nowest-interior-api:test .

# Test the image locally (simulates Lambda environment)
docker run -p 9000:8080 -e AWS_LAMBDA_FUNCTION_NAME=test nowest-interior-api:test

# Test the health endpoint
curl http://localhost:9000/health
```

### Using Docker Compose
```bash
# Start the service
docker-compose up

# Test the API
curl http://localhost:9000/health
```

## Configuration

### Environment Variables
The following environment variables are configured in the Docker image:

- `AWS_LAMBDA_FUNCTION_NAME` - Set automatically by Lambda
- `DATABASE_URL` - MySQL connection string
- `SECRET_KEY` - Application secret key
- `SESSION_SECRET` - Session secret key
- `DEBUG` - Debug mode (true/false)

### Dockerfile Optimizations

The `Dockerfile.lambda` includes several optimizations:

1. **Layer Caching** - Requirements are copied first for better caching
2. **Security** - Non-root user and proper permissions
3. **Performance** - Optimized pip installation
4. **Size** - Minimal base image and cleanup

## Troubleshooting

### Common Issues

1. **Docker not running**
   ```
   ERROR: error during connect: Head "http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/_ping"
   ```
   **Solution**: Start Docker Desktop

2. **AWS credentials not configured**
   ```
   ERROR: Unable to locate credentials
   ```
   **Solution**: Run `aws configure`

3. **ECR repository doesn't exist**
   ```
   ERROR: Repository does not exist
   ```
   **Solution**: Create repository first or use the deployment script

4. **Lambda function not found**
   ```
   ERROR: Function not found
   ```
   **Solution**: Ensure the function name is correct

### Debugging

1. **Check Docker build logs**
   ```bash
   docker build -f Dockerfile.lambda -t nowest-interior-api:debug . --no-cache
   ```

2. **Test image locally**
   ```bash
   docker run -it --rm nowest-interior-api:debug /bin/bash
   ```

3. **Check Lambda logs**
   ```bash
   aws logs describe-log-groups --log-group-name-prefix /aws/lambda/nowestInteriorAPI
   ```

## Benefits of Docker Deployment

1. **Consistency** - Same environment locally and in production
2. **Dependencies** - All dependencies are bundled
3. **Size Limits** - Docker images can be up to 10GB (vs 250MB for zip)
4. **Performance** - Better cold start performance
5. **Debugging** - Easier to debug locally

## File Structure

```
app/
├── Dockerfile.lambda          # Optimized Dockerfile for Lambda
├── docker-compose.yml         # Local testing setup
├── deploy_docker_lambda.py    # Python deployment script
├── docker-deploy.ps1          # PowerShell deployment script
├── docker-deploy.sh           # Bash deployment script
└── DOCKER_LAMBDA_DEPLOYMENT.md # This guide
```

## Next Steps

After successful deployment:

1. **Test the API** - Verify all endpoints work
2. **Monitor logs** - Check CloudWatch logs for any issues
3. **Set up CI/CD** - Automate deployments
4. **Configure monitoring** - Set up alerts and dashboards

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review AWS CloudWatch logs
3. Test locally with Docker Compose
4. Verify AWS permissions and configuration
