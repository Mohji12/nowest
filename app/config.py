"""
Configuration settings for the FastAPI application.
"""
import os


def _env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


APP_ENV = os.getenv("APP_ENV", os.getenv("NODE_ENV", "development")).lower()
IS_PRODUCTION = APP_ENV == "production"


class Settings:
    """Application settings with environment variable support."""

    app_env: str = APP_ENV

    # Database settings
    database_url: str = os.getenv(
        "DATABASE_URL",
        "mysql+pymysql://adminuser:Mentee123%40@52.90.192.59:3306/nowest_interior",
    )

    # Security settings
    secret_key: str = os.getenv("SECRET_KEY", "nowest-interior-secret-key-2024")
    algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    # Session settings
    session_secret: str = os.getenv("SESSION_SECRET", "nowest-interior-session-secret-2024")
    session_max_age: int = int(os.getenv("SESSION_MAX_AGE", "604800"))

    # Server settings
    host: str = os.getenv("HOST", "0.0.0.0" if IS_PRODUCTION else "localhost")
    port: int = int(os.getenv("PORT", "8000"))
    workers: int = int(os.getenv("WORKERS", "2"))
    debug: bool = _env_bool("DEBUG", not IS_PRODUCTION)

    # Logging settings
    log_level: str = os.getenv("LOG_LEVEL", "INFO" if IS_PRODUCTION else "DEBUG")

    # AWS settings (EC2 can use IAM role instead of access keys)
    aws_region: str = os.getenv("AWS_REGION", "ap-south-1")

    # CORS settings
    allowed_origins: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:5173,"
            "https://master.d3d3uycjtq0cwh.amplifyapp.com,"
            "https://staging.dbgiskpa6ryhj.amplifyapp.com",
        ).split(",")
        if origin.strip()
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
    max_file_size: int = int(os.getenv("MAX_FILE_SIZE", str(10 * 1024 * 1024)))
    upload_directory: str = os.getenv("UPLOAD_DIRECTORY", "uploads")

    # Admin settings
    default_admin_username: str = os.getenv("DEFAULT_ADMIN_USERNAME", "admin")
    default_admin_password: str = os.getenv("DEFAULT_ADMIN_PASSWORD", "admin123")


# Global settings instance
settings = Settings()
