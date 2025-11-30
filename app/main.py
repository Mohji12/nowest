"""
FastAPI application entry point for Nowest Interior API.
"""
import os
import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
import time

# Lambda-specific imports
from mangum import Mangum

from config import settings
from database import create_tables, test_connection, check_db_health
from services.admin_service import AdminService
from database import get_db

# Import API routers
from api.auth import router as auth_router
from api.products import router as products_router
from api.portfolio import router as portfolio_router
from api.leads import router as leads_router
from api.seo import router as seo_router
from api.analytics import router as analytics_router
from api.brochures import router as brochures_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Create FastAPI application
app = FastAPI(
    title="Nowest Interior API",
    description="FastAPI backend for Nowest Interior website",
    version="1.0.0",
    contact={
        "name": "Nowest Interior Support",
        "email": "support@nowestinterior.com",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# CORS middleware - Enabled for local development
# Note: For Lambda deployment, you may want to configure CORS at the Lambda Function URL level instead
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins including all ports
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods including OPTIONS
    allow_headers=["*"],  # Allow all headers
)

# Include API routers
app.include_router(auth_router, tags=["Authentication"])
app.include_router(products_router, tags=["Products"])
app.include_router(portfolio_router, tags=["Portfolio"])
app.include_router(leads_router, tags=["Leads"])
app.include_router(seo_router, tags=["SEO"])
app.include_router(analytics_router, tags=["Analytics"])
app.include_router(brochures_router, tags=["Brochures"])


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    logger.info("Starting Nowest Interior API...")
    
    # Check database connection
    try:
        if test_connection():
            # Initialize database tables
            try:
                create_tables()
                logger.info("Database initialization completed successfully!")
                
                # Initialize default admin user
                try:
                    db = next(get_db())
                    admin_service = AdminService(db)
                    admin_service.create_default_admin()
                    logger.info("Default admin user initialized")
                except Exception as e:
                    logger.error(f"Error initializing default admin: {e}")
                finally:
                    db.close()
            except Exception as e:
                logger.error(f"Database initialization failed: {e}")
        else:
            logger.error("Cannot connect to database!")
    except Exception as e:
        logger.error(f"Database connection test failed: {e}")
        logger.info("API will start but database operations may fail")

@app.get("/")
async def root():
    return {"message": "Welcome to Nowest Interior API - Your Interior Design Solution"}

@app.get("/health")
async def health_check():
    """Health check endpoint to verify database and API status"""
    try:
        db_health = check_db_health()
        
        return {
            "status": "healthy" if db_health["status"] == "healthy" else "unhealthy",
            "database": db_health,
            "message": "API and database are running"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "message": "API or database has issues"
        }


# Lambda handler for AWS Lambda
handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    