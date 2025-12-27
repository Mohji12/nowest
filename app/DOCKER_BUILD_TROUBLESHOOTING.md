# Docker Build Troubleshooting Guide

## Common Issues and Solutions

### Issue: Libraries Not Installing

**Solution 1: Ensure you're building from the correct directory**
```bash
cd app
docker build -f Dockerfile.lambda -t nowest:latest .
```

**Solution 2: Check if requirements.txt is accessible**
```bash
cd app
ls -la requirements.txt
cat requirements.txt
```

**Solution 3: Build with verbose output to see errors**
```bash
cd app
docker build -f Dockerfile.lambda -t nowest:latest . --progress=plain --no-cache
```

**Solution 4: Test installation in interactive container**
```bash
docker run -it --rm public.ecr.aws/lambda/python:3.11 bash
# Inside container:
pip install --upgrade pip
pip install fastapi sqlalchemy pymysql cryptography
```

### Issue: Cryptography Installation Fails

**Solution:** The updated Dockerfile now includes `openssl-devel` and `libffi-devel` which are required for cryptography.

### Issue: PyMySQL Installation Fails

**Solution:** The updated Dockerfile now includes `mariadb-devel` which provides MySQL client libraries.

### Issue: Build Context Problems

**Make sure you're in the app directory:**
```bash
# Correct way:
cd app
docker build -f Dockerfile.lambda -t nowest:latest .

# Wrong way (from root):
docker build -f app/Dockerfile.lambda -t nowest:latest app/
```

### Issue: Network/Proxy Issues

If you're behind a proxy or have network issues:
```bash
docker build \
  --build-arg HTTP_PROXY=http://proxy:port \
  --build-arg HTTPS_PROXY=http://proxy:port \
  -f Dockerfile.lambda \
  -t nowest:latest .
```

### Issue: Out of Memory

If the build fails due to memory:
```bash
# Increase Docker memory limit in Docker Desktop settings
# Or use buildkit:
DOCKER_BUILDKIT=1 docker build -f Dockerfile.lambda -t nowest:latest .
```

## Step-by-Step Debug Process

1. **Verify Docker is running:**
   ```bash
   docker --version
   docker ps
   ```

2. **Check the base image:**
   ```bash
   docker pull public.ecr.aws/lambda/python:3.11
   ```

3. **Test requirements.txt locally:**
   ```bash
   cd app
   python -m pip install -r requirements.txt
   ```

4. **Build with no cache to see full output:**
   ```bash
   cd app
   docker build --no-cache --progress=plain -f Dockerfile.lambda -t nowest:latest . 2>&1 | tee build.log
   ```

5. **Check the build log:**
   ```bash
   cat build.log | grep -i error
   cat build.log | grep -i "failed"
   ```

## Updated Dockerfile Features

The updated Dockerfile includes:
- ✅ Additional system dependencies (openssl-devel, libffi-devel, python3-devel, mariadb-devel)
- ✅ pip, setuptools, wheel upgrade before installation
- ✅ Verbose output for debugging
- ✅ Package verification after installation
- ✅ Better error handling

## Quick Test Build

```bash
cd app
docker build -f Dockerfile.lambda -t nowest:test . --progress=plain
```

If successful, test the image:
```bash
docker run --rm nowest:test python -c "import fastapi; print('FastAPI installed:', fastapi.__version__)"
```

