"""
Pydantic schemas for Lead model validation.
"""
from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime


class LeadCreate(BaseModel):
    """Schema for creating a new lead."""
    name: str = Field(..., min_length=1, max_length=255, description="Lead name")
    email: EmailStr = Field(..., description="Lead email address")
    phone: Optional[str] = Field(None, max_length=20, description="Lead phone number")
    project_details: Optional[str] = Field(None, description="Project details")


class LeadUpdate(BaseModel):
    """Schema for updating an existing lead."""
    name: Optional[str] = Field(None, min_length=1, max_length=255, description="Lead name")
    email: Optional[EmailStr] = Field(None, description="Lead email address")
    phone: Optional[str] = Field(None, max_length=20, description="Lead phone number")
    project_details: Optional[str] = Field(None, description="Project details")
    status: Optional[str] = Field(None, description="Lead status (new, contacted, converted, archived)")


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


class LeadResponse(BaseModel):
    """Schema for lead response data."""
    id: str = Field(..., description="Lead ID")
    name: str = Field(..., description="Lead name")
    email: str = Field(..., description="Lead email address")
    phone: Optional[str] = Field(None, description="Lead phone number")
    project_details: Optional[str] = Field(None, description="Project details")
    status: str = Field(..., description="Lead status")
    created_at: Optional[datetime] = Field(None, description="Creation timestamp")
    
    @field_validator('created_at', mode='before')
    @classmethod
    def validate_datetime_fields(cls, v):
        return validate_datetime(v)
    
    class Config:
        from_attributes = True


class LeadStatusUpdate(BaseModel):
    """Schema for updating lead status."""
    status: str = Field(..., description="New lead status (new, contacted, converted, archived)")





