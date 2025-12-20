"""
Pydantic schemas for Admin model validation.
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime


def validate_datetime(v):
    """Convert invalid MySQL datetime values (0000-00-00) to None."""
    if v is None:
        return None
    if isinstance(v, str) and v.startswith('0000-00-00'):
        return None
    if isinstance(v, datetime):
        if v.year == 0 or v.month == 0 or v.day == 0:
            return None
    return v


class AdminCreate(BaseModel):
    """Schema for creating a new admin user."""
    username: str = Field(..., min_length=3, max_length=255, description="Admin username")
    password: str = Field(..., min_length=6, max_length=255, description="Admin password")


class AdminLogin(BaseModel):
    """Schema for admin login request."""
    username: str = Field(..., description="Admin username")
    password: str = Field(..., description="Admin password")


class AdminResponse(BaseModel):
    """Schema for admin response data."""
    id: str = Field(..., description="Admin ID")
    username: str = Field(..., description="Admin username")
    created_at: Optional[datetime] = Field(None, description="Creation timestamp")
    
    @field_validator('created_at', mode='before')
    @classmethod
    def validate_datetime_fields(cls, v):
        return validate_datetime(v)
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """Schema for authentication token response."""
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(..., description="Token expiration time in seconds")
    admin: AdminResponse = Field(..., description="Admin user data")





