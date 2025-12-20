"""
Pydantic schemas for Product model validation.
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional, List, Any
from datetime import datetime


def validate_datetime(v):
    """Convert invalid MySQL datetime values (0000-00-00) to None."""
    if v is None:
        return None
    # Check if it's a string representation of zero date
    if isinstance(v, str) and v.startswith('0000-00-00'):
        return None
    # Check if it's a datetime with zero values
    if isinstance(v, datetime):
        if v.year == 0 or v.month == 0 or v.day == 0:
            return None
    return v


class ProductCreate(BaseModel):
    """Schema for creating a new product."""
    category: str = Field(..., description="Product category (blinds, curtains, commercial)")
    name: str = Field(..., min_length=1, max_length=255, description="Product name")
    description: str = Field(..., min_length=1, description="Product description")
    image: Optional[str] = Field(None, max_length=500, description="Product image URL")
    features: Optional[List[str]] = Field(default=[], description="Product features list")


class ProductUpdate(BaseModel):
    """Schema for updating an existing product."""
    category: Optional[str] = Field(None, description="Product category")
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Product name")
    description: Optional[str] = Field(None, min_length=1, description="Product description")
    image: Optional[str] = Field(None, max_length=500, description="Product image URL")
    features: Optional[List[str]] = Field(None, description="Product features list")


class ProductResponse(BaseModel):
    """Schema for product response data."""
    id: str = Field(..., description="Product ID")
    category: str = Field(..., description="Product category")
    name: str = Field(..., description="Product name")
    description: str = Field(..., description="Product description")
    image: Optional[str] = Field(None, description="Product image URL")
    features: Optional[List[str]] = Field(None, description="Product features list")
    created_at: Optional[datetime] = Field(None, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    
    @field_validator('created_at', 'updated_at', mode='before')
    @classmethod
    def validate_datetime_fields(cls, v):
        return validate_datetime(v)
    
    class Config:
        from_attributes = True





