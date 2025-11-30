"""
Middleware for the FastAPI application.
"""
from .auth import get_current_admin, require_admin

__all__ = [
    "get_current_admin",
    "require_admin"
]

