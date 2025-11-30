"""
S3 URL utilities for handling image and file URLs.
"""
import logging
from typing import Optional

logger = logging.getLogger(__name__)

# S3 Configuration
S3_BUCKET_NAME = "jgi-menteetracker"
S3_REGION = "ap-south-1"
S3_BASE_URL = f"https://{S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com"

def convert_to_full_s3_url(image_path: Optional[str], asset_type: str = "attached_assets") -> Optional[str]:
    """
    Convert relative image paths to full S3 URLs.
    
    Args:
        image_path: The image path (can be relative or already full URL)
        asset_type: The type of asset (attached_assets, brochures, etc.)
        
    Returns:
        Full S3 URL or None if no path provided
    """
    if not image_path:
        return None
    
    # If it's already a full URL (S3 or any other), return as is
    if image_path.startswith('http'):
        logger.debug(f"Using existing full URL: {image_path}")
        return image_path
    
    # If it's a relative path, convert to S3 URL
    if image_path.startswith('/'):
        # Remove leading slash
        clean_path = image_path[1:]
    else:
        clean_path = image_path
    
    # Remove asset_type prefix if it's already in the path
    if clean_path.startswith(f"{asset_type}/"):
        clean_path = clean_path[len(f"{asset_type}/"):]
    
    # Construct full S3 URL
    full_url = f"{S3_BASE_URL}/{asset_type}/{clean_path}"
    logger.debug(f"Converted relative path to S3 URL: {image_path} -> {full_url}")
    
    return full_url

def convert_image_to_s3_url(image_path: Optional[str]) -> Optional[str]:
    """
    Convert image path to full S3 URL for attached assets.
    
    Args:
        image_path: The image path
        
    Returns:
        Full S3 URL for the image
    """
    return convert_to_full_s3_url(image_path, "attached_assets")

def convert_pdf_to_s3_url(pdf_path: Optional[str]) -> Optional[str]:
    """
    Convert PDF path to full S3 URL for brochures.
    
    Args:
        pdf_path: The PDF path
        
    Returns:
        Full S3 URL for the PDF
    """
    return convert_to_full_s3_url(pdf_path, "brochures")

def is_s3_url(url: Optional[str]) -> bool:
    """
    Check if a URL is an S3 URL.
    
    Args:
        url: The URL to check
        
    Returns:
        True if it's an S3 URL, False otherwise
    """
    if not url:
        return False
    
    return url.startswith(f"https://{S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com")

def get_relative_path_from_s3_url(s3_url: Optional[str]) -> Optional[str]:
    """
    Extract relative path from S3 URL.
    
    Args:
        s3_url: The S3 URL
        
    Returns:
        Relative path or None if not an S3 URL
    """
    if not s3_url or not is_s3_url(s3_url):
        return None
    
    # Remove the base S3 URL to get the relative path
    base_url = f"{S3_BASE_URL}/"
    if s3_url.startswith(base_url):
        return s3_url[len(base_url):]
    
    return None
