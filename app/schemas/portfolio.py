"""
Pydantic schemas for Portfolio model validation.
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


class PortfolioCreate(BaseModel):
    """Schema for creating a new portfolio item."""
    title: str = Field(..., min_length=1, max_length=255, description="Portfolio item title")
    description: Optional[str] = Field(None, description="Portfolio item description")
    image: Optional[str] = Field(None, max_length=500, description="Portfolio item image URL")
    client: Optional[str] = Field(None, max_length=255, description="Client name")
    location: Optional[str] = Field(None, max_length=255, description="Project location")
    category: Optional[str] = Field(None, max_length=100, description="Project category")


class PortfolioUpdate(BaseModel):
    """Schema for updating an existing portfolio item."""
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="Portfolio item title")
    description: Optional[str] = Field(None, description="Portfolio item description")
    image: Optional[str] = Field(None, max_length=500, description="Portfolio item image URL")
    client: Optional[str] = Field(None, max_length=255, description="Client name")
    location: Optional[str] = Field(None, max_length=255, description="Project location")
    category: Optional[str] = Field(None, max_length=100, description="Project category")


class PortfolioResponse(BaseModel):
    """Schema for portfolio response data."""
    id: str = Field(..., description="Portfolio item ID")
    title: str = Field(..., description="Portfolio item title")
    description: Optional[str] = Field(None, description="Portfolio item description")
    image: Optional[str] = Field(None, description="Portfolio item image URL")
    client: Optional[str] = Field(None, description="Client name")
    location: Optional[str] = Field(None, description="Project location")
    category: Optional[str] = Field(None, description="Project category")
    created_at: Optional[datetime] = Field(None, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    
    @field_validator('created_at', 'updated_at', mode='before')
    @classmethod
    def validate_datetime_fields(cls, v):
        return validate_datetime(v)
    
    class Config:
        from_attributes = True





