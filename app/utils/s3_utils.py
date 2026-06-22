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

NOWEST_S3_BUCKET_NAME = "nowest"
NOWEST_S3_BASE_URL = f"https://{NOWEST_S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com"
PORTFOLIO_S3_FOLDER = "collection"

LEGACY_BUCKET_HOSTS = (
    f"{S3_BUCKET_NAME}.s3.{S3_REGION}.amazonaws.com",
    f"{S3_BUCKET_NAME}s.s3.{S3_REGION}.amazonaws.com",
)


def _extract_filename(path: str) -> str:
    return path.split("?")[0].rstrip("/").split("/")[-1]


_collection_file_map: dict[str, str] | None = None


def get_collection_file_map() -> dict[str, str]:
    """Load filename -> S3 key map for the nowest collection folder."""
    global _collection_file_map
    if _collection_file_map is not None:
        return _collection_file_map

    file_map: dict[str, str] = {}
    try:
        import boto3

        s3_client = boto3.client("s3", region_name=S3_REGION)
        paginator = s3_client.get_paginator("list_objects_v2")
        prefix = f"{PORTFOLIO_S3_FOLDER}/"

        for page in paginator.paginate(Bucket=NOWEST_S3_BUCKET_NAME, Prefix=prefix):
            for obj in page.get("Contents", []):
                key = obj["Key"]
                if key.endswith("/"):
                    continue
                file_map[key.split("/")[-1]] = key

        logger.info("Loaded %s portfolio images from nowest/%s", len(file_map), PORTFOLIO_S3_FOLDER)
    except Exception as exc:
        logger.warning("Could not load nowest collection file map: %s", exc)

    _collection_file_map = file_map
    return file_map


def resolve_portfolio_image_url(image_path: Optional[str]) -> Optional[str]:
    """Resolve any portfolio image path/URL to the correct nowest S3 URL."""
    if not image_path:
        return None

    filename = _extract_filename(image_path)
    file_map = get_collection_file_map()

    if filename in file_map:
        return f"{NOWEST_S3_BASE_URL}/{file_map[filename]}"

    if image_path.startswith("http"):
        return image_path

    clean_path = image_path[1:] if image_path.startswith("/") else image_path
    if clean_path.startswith(f"{PORTFOLIO_S3_FOLDER}/"):
        clean_path = clean_path[len(f"{PORTFOLIO_S3_FOLDER}/") :]

    return f"{NOWEST_S3_BASE_URL}/{PORTFOLIO_S3_FOLDER}/{clean_path}"


def rewrite_legacy_portfolio_url(url: str) -> str:
    """Rewrite portfolio image URLs to the correct nowest/collection path."""
    resolved = resolve_portfolio_image_url(url)
    return resolved or url

def convert_to_full_s3_url(
    image_path: Optional[str],
    asset_type: str = "attached_assets",
    *,
    bucket_base_url: Optional[str] = None,
) -> Optional[str]:
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
    
    base_url = bucket_base_url or S3_BASE_URL
    full_url = f"{base_url}/{asset_type}/{clean_path}"
    logger.debug(f"Converted relative path to S3 URL: {image_path} -> {full_url}")
    
    return full_url

def convert_portfolio_image_to_s3_url(image_path: Optional[str]) -> Optional[str]:
    """
    Convert portfolio image path to full S3 URL in the nowest/collection bucket.
    """
    return resolve_portfolio_image_url(image_path)

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
