# Troubleshooting Lambda 500 Internal Server Error

## Problem Summary
The frontend is receiving 500 Internal Server Error responses from the AWS Lambda API endpoint:
- URL: `https://oljximoxqf.execute-api.ap-south-1.amazonaws.com`
- Endpoints affected: `/api/portfolio`, `/api/pageview`
- Error message: `{detail: 'Error retrieving portfolio'}`

## Root Cause Analysis

The 500 error indicates a **server-side issue** in the Lambda function, not a client-side problem. The most likely causes are:

### 1. Database Connection Issues (Most Likely)
- **Lambda VPC Configuration**: Lambda function may not be in the same VPC as the RDS database
- **Security Group Rules**: RDS security group may not allow inbound connections from Lambda
- **Network Timeout**: Database connection may be timing out due to cold starts
- **Database Credentials**: Environment variables may not be set correctly in Lambda

### 2. Environment Variables Missing
The Lambda function needs these environment variables:
- `DATABASE_URL`: MySQL connection string
- `SECRET_KEY`: Application secret key
- `SESSION_SECRET`: Session secret key
- `DEBUG`: Debug mode flag

### 3. Connection Pooling Issues
Lambda functions have cold starts, and SQLAlchemy connection pooling may not work well in serverless environments.

## Frontend Improvements Made

1. **Retry Logic with Exponential Backoff**
   - Automatically retries failed requests up to 3 times
   - Uses exponential backoff (1s, 2s, 4s delays)
   - Retries on 500/503 errors and network failures

2. **Better Error Handling**
   - User-friendly error messages
   - Detailed error logging for debugging
   - Timeout handling (30 seconds)

3. **Improved Error Display**
   - Error banners in UI components
   - Fallback data display when API fails
   - Clear messaging about server issues

## Backend Fixes Required

### 1. Check Lambda Configuration

#### Verify Environment Variables
In AWS Lambda Console → Configuration → Environment variables, ensure:
```
DATABASE_URL=mysql+pymysql://admin:PASSWORD@HOST:3306/nowest_interior
SECRET_KEY=nowest-interior-secret-key-2024
SESSION_SECRET=nowest-interior-session-secret-2024
DEBUG=false
```

#### Check VPC Configuration
1. Go to Lambda → Configuration → VPC
2. Ensure Lambda is in the same VPC as RDS
3. Add subnets in different availability zones
4. Add security group that allows outbound connections

#### Update Security Group
1. Go to RDS → Security Groups
2. Add inbound rule:
   - Type: MySQL/Aurora (3306)
   - Source: Lambda security group ID

### 2. Improve Database Connection Handling

Update `app/database.py` to handle Lambda cold starts better:

```python
# Use NullPool for Lambda to avoid connection pool issues
from sqlalchemy.pool import NullPool

engine = create_engine(
    settings.database_url,
    poolclass=NullPool,  # Changed from QueuePool
    pool_pre_ping=True,
    connect_args={
        "connect_timeout": 10,
    },
    echo=settings.debug,
)
```

### 3. Add Better Error Logging

Update `app/api/portfolio.py` to log more details:

```python
@router.get("/portfolio", response_model=List[PortfolioResponse])
async def get_portfolio(
    category: Optional[str] = Query(None, description="Filter by portfolio category"),
    db: Session = Depends(get_db)
):
    try:
        portfolio_service = PortfolioService(db)
        
        if category:
            portfolio_items = portfolio_service.get_portfolio_by_category(category)
        else:
            portfolio_items = portfolio_service.get_all_portfolio()
        
        return portfolio_items
        
    except Exception as e:
        logger.error(f"Error getting portfolio: {e}", exc_info=True)  # Add exc_info=True
        logger.error(f"Database URL: {settings.database_url[:20]}...")  # Log partial URL
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error retrieving portfolio: {str(e)}"  # Include error details
        )
```

### 4. Test Database Connection

Add a test endpoint to verify database connectivity:

```python
@app.get("/test-db")
async def test_database():
    try:
        db_health = check_db_health()
        return {
            "status": "success",
            "database": db_health
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }
```

## Testing Steps

1. **Test Health Endpoint**
   ```bash
   curl https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/health
   ```

2. **Test Database Connection**
   ```bash
   curl https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/test-db
   ```

3. **Check Lambda Logs**
   - Go to CloudWatch → Log Groups
   - Find your Lambda function logs
   - Look for database connection errors

4. **Test Locally**
   ```bash
   cd app
   python -m uvicorn main:app --reload
   curl http://localhost:8000/api/portfolio
   ```

## Quick Fixes to Try

1. **Restart Lambda Function**
   - Update any environment variable to force restart
   - This can resolve connection pool issues

2. **Check RDS Status**
   - Ensure RDS instance is running
   - Check if it's publicly accessible (if Lambda is not in VPC)

3. **Verify Database Credentials**
   - Test connection string locally
   - Ensure password doesn't have special characters that need URL encoding

4. **Increase Lambda Timeout**
   - Go to Lambda → Configuration → General
   - Increase timeout to 30 seconds or more

5. **Check Lambda Memory**
   - Ensure sufficient memory (at least 512 MB)
   - Low memory can cause connection issues

## Monitoring

Set up CloudWatch alarms for:
- Lambda errors (5xx responses)
- Lambda duration (to detect timeouts)
- Database connection errors

## Additional Resources

- [AWS Lambda VPC Configuration](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html)
- [RDS Security Groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.RDSSecurityGroups.html)
- [SQLAlchemy Connection Pooling](https://docs.sqlalchemy.org/en/14/core/pooling.html)












