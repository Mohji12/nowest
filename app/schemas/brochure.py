"""
Pydantic schemas for Brochure model validation.
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


class BrochureCreate(BaseModel):
    """Schema for creating a new brochure."""
    title: str = Field(..., min_length=1, max_length=255, description="Brochure title")
    description: str = Field(..., min_length=1, description="Brochure description")
    pdf_path: str = Field(..., min_length=1, max_length=500, description="PDF file path")


class BrochureUpdate(BaseModel):
    """Schema for updating an existing brochure."""
    title: Optional[str] = Field(None, min_length=1, max_length=255, description="Brochure title")
    description: Optional[str] = Field(None, min_length=1, description="Brochure description")
    pdf_path: Optional[str] = Field(None, min_length=1, max_length=500, description="PDF file path")


class BrochureResponse(BaseModel):
    """Schema for brochure response data."""
    id: str = Field(..., description="Brochure ID")
    title: str = Field(..., description="Brochure title")
    description: str = Field(..., description="Brochure description")
    pdf_path: str = Field(..., description="PDF file path")
    created_at: Optional[datetime] = Field(None, description="Creation timestamp")
    updated_at: Optional[datetime] = Field(None, description="Last update timestamp")
    
    @field_validator('created_at', 'updated_at', mode='before')
    @classmethod
    def validate_datetime_fields(cls, v):
        return validate_datetime(v)
    
    class Config:
        from_attributes = True





