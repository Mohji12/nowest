"""
Configuration settings for the FastAPI application.
"""
import os


class Settings:
    """Application settings with environment variable support."""
    
    # Database settings - use environment variable if available, fallback to hardcoded
    database_url: str = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://admin:Krintix#2025@menteetracker.cfiuwyek2vbk.ap-south-1.rds.amazonaws.com:3306/nowest_interior"
    )
    
    # Security settings
    secret_key: str = "nowest-interior-secret-key-2024"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Session settings
    session_secret: str = "nowest-interior-session-secret-2024"
    session_max_age: int = 604800  # 1 week in seconds
    
    # Server settings
    host: str = "localhost"
    port: int = 8000
    debug: bool = True
    
    # CORS settings
    allowed_origins: list[str] = [
        "http://localhost:5173",  # Local development
        "https://master.d3d3uycjtq0cwh.amplifyapp.com",  # AWS Amplify production
        "https://staging.dbgiskpa6ryhj.amplifyapp.com",  # AWS Amplify staging
    ]
    allowed_methods: list[str] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allowed_headers: list[str] = [
        "Accept",
        "Accept-Language",
        "Content-Language",
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ]
    
    # File upload settings
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    upload_directory: str = "uploads"
    
    # Admin settings
    default_admin_username: str = "admin"
    default_admin_password: str = "admin123"


# Global settings instance
settings = Settings()

# Environment-specific overrides
if os.getenv("NODE_ENV") == "production":
    settings.debug = False
    settings.host = "0.0.0.0"
elif os.getenv("NODE_ENV") == "development":
    settings.debug = True
    settings.host = "localhost"
