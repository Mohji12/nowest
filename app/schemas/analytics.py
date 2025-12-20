"""
Pydantic schemas for Analytics model validation.
"""
from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime


class PageViewCreate(BaseModel):
    """Schema for creating a new page view record."""
    page: str = Field(..., min_length=1, max_length=255, description="Page URL or identifier")
    user_agent: Optional[str] = Field(None, description="User agent string")
    referrer: Optional[str] = Field(None, max_length=500, description="Referrer URL")


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


class PageViewResponse(BaseModel):
    """Schema for page view response data."""
    id: str = Field(..., description="Page view ID")
    page: str = Field(..., description="Page URL or identifier")
    user_agent: Optional[str] = Field(None, description="User agent string")
    referrer: Optional[str] = Field(None, description="Referrer URL")
    timestamp: Optional[datetime] = Field(None, description="View timestamp")
    
    @field_validator('timestamp', mode='before')
    @classmethod
    def validate_datetime_fields(cls, v):
        return validate_datetime(v)
    
    class Config:
        from_attributes = True


class TopPagesResponse(BaseModel):
    """Schema for top pages analytics response."""
    page: str = Field(..., description="Page URL or identifier")
    count: int = Field(..., description="Number of views")


class AnalyticsStats(BaseModel):
    """Schema for analytics statistics response."""
    total_products: int = Field(..., description="Total number of products")
    total_portfolio: int = Field(..., description="Total number of portfolio items")
    new_leads: int = Field(..., description="Number of new leads")
    total_page_views: int = Field(..., description="Total page views (all time)")
    page_views_30_days: int = Field(..., description="Page views in last 30 days")
    unique_visitors: int = Field(..., description="Unique visitors in last 30 days")
    top_pages: List[TopPagesResponse] = Field(default=[], description="Top pages by views")
    recent_activity: List[PageViewResponse] = Field(default=[], description="Recent page views")


class AnalyticsOverview(BaseModel):
    """Schema for analytics overview response."""
    total_views: int = Field(..., description="Total page views")
    top_pages: list[TopPagesResponse] = Field(..., description="Top pages by views")
    total_leads: int = Field(..., description="Total number of leads")



