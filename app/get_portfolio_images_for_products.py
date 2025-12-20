"""
Script to get portfolio images from S3 and assign them to product types.
"""

import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import sys
from pathlib import Path

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

# S3 Configuration
BUCKET = "jgi-menteetrackers"
FOLDER_PREFIX = "Nowest_Image/"

# Image file extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'}

def is_image_file(key: str) -> bool:
    """Check if a file is an image based on its extension."""
    return any(key.lower().endswith(ext) for ext in IMAGE_EXTENSIONS)

def get_portfolio_images():
    """Get all image URLs from Nowest_Image folder."""
    try:
        s3_client = boto3.client('s3', region_name='ap-south-1')
        images = []
        
        paginator = s3_client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=BUCKET, Prefix=FOLDER_PREFIX)
        
        for page in pages:
            if 'Contents' not in page:
                continue
                
            for obj in page['Contents']:
                key = obj['Key']
                
                # Skip if it's a folder
                if key.endswith('/'):
                    continue
                
                # Check if it's an image
                if is_image_file(key):
                    url = f"https://{BUCKET}.s3.ap-south-1.amazonaws.com/{key}"
                    images.append(url)
        
        return sorted(images)
        
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    images = get_portfolio_images()
    print(f"Found {len(images)} portfolio images\n")
    print("Portfolio Images (first 20):")
    for i, img in enumerate(images[:20], 1):
        print(f"{i}. {img}")
    if len(images) > 20:
        print(f"\n... and {len(images) - 20} more images")



