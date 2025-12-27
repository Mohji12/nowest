"""
Script to check which Nowest_Image URLs are already in the portfolio database.
"""

import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import sys
from pathlib import Path
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from typing import List, Set

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from config import settings

# S3 Configuration
BUCKET = "jgi-menteetrackers"
FOLDER_PREFIX = "Nowest_Image/"

# Image file extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'}

def is_image_file(key: str) -> bool:
    """Check if a file is an image based on its extension."""
    return any(key.lower().endswith(ext) for ext in IMAGE_EXTENSIONS)

def get_nowest_image_urls() -> List[str]:
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
        print(f"[ERROR] Failed to get S3 images: {e}")
        return []

def get_portfolio_image_urls() -> Set[str]:
    """Get all image URLs from portfolio database."""
    try:
        # Create database engine
        engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,
            echo=False
        )
        
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()
        
        try:
            # Query portfolio table for all image URLs
            result = db.execute(text("SELECT image FROM portfolio WHERE image IS NOT NULL AND image != ''"))
            rows = result.fetchall()
            
            # Extract URLs and normalize them
            db_urls = set()
            for row in rows:
                url = row[0]
                if url:
                    # Normalize URL (handle both full URLs and relative paths)
                    if url.startswith('http'):
                        db_urls.add(url)
                    elif url.startswith('/'):
                        # Convert relative path to full URL
                        clean_path = url[1:] if url.startswith('/') else url
                        full_url = f"https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/{clean_path}"
                        db_urls.add(full_url)
                        # Also try with jgi-menteetrackers
                        full_url2 = f"https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/{clean_path}"
                        db_urls.add(full_url2)
                    else:
                        # Try both bucket names
                        db_urls.add(f"https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/{url}")
                        db_urls.add(f"https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/{url}")
                        # Also try Nowest_Image folder
                        db_urls.add(f"https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/{url}")
            
            return db_urls
            
        finally:
            db.close()
            
    except Exception as e:
        print(f"[ERROR] Failed to query database: {e}")
        import traceback
        traceback.print_exc()
        return set()

def main():
    """Main function to compare S3 images with database."""
    print("=" * 80)
    print("Checking Portfolio Database for Nowest_Image URLs")
    print("=" * 80)
    print()
    
    # Get S3 image URLs
    print("Step 1: Fetching images from S3 Nowest_Image folder...")
    s3_images = get_nowest_image_urls()
    print(f"Found {len(s3_images)} images in Nowest_Image folder\n")
    
    # Get database image URLs
    print("Step 2: Fetching image URLs from portfolio database...")
    db_urls = get_portfolio_image_urls()
    print(f"Found {len(db_urls)} image URLs in portfolio database\n")
    
    # Find matches
    print("Step 3: Comparing...")
    print("=" * 80)
    
    present_in_db = []
    missing_from_db = []
    
    for s3_url in s3_images:
        # Check if URL is in database (exact match or partial match)
        found = False
        
        # Exact match
        if s3_url in db_urls:
            found = True
        else:
            # Check if filename matches (in case URL format differs)
            filename = s3_url.split('/')[-1]
            for db_url in db_urls:
                if filename in db_url or db_url.endswith(filename):
                    found = True
                    break
        
        if found:
            present_in_db.append(s3_url)
        else:
            missing_from_db.append(s3_url)
    
    # Print results
    print("\n" + "=" * 80)
    print("RESULTS")
    print("=" * 80)
    print(f"\nTotal Nowest_Image URLs: {len(s3_images)}")
    print(f"Already in database: {len(present_in_db)}")
    print(f"Missing from database: {len(missing_from_db)}")
    print()
    
    # Show images already in database
    if present_in_db:
        print("=" * 80)
        print(f"IMAGES ALREADY IN DATABASE ({len(present_in_db)}):")
        print("=" * 80)
        for i, url in enumerate(present_in_db, 1):
            filename = url.split('/')[-1]
            print(f"{i:3d}. {filename}")
            print(f"     {url}\n")
    
    # Show images missing from database
    if missing_from_db:
        print("=" * 80)
        print(f"IMAGES MISSING FROM DATABASE ({len(missing_from_db)}):")
        print("=" * 80)
        for i, url in enumerate(missing_from_db, 1):
            filename = url.split('/')[-1]
            print(f"{i:3d}. {filename}")
            print(f"     {url}\n")
    
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total Nowest_Image images: {len(s3_images)}")
    print(f"Already in portfolio DB: {len(present_in_db)} ({len(present_in_db)/len(s3_images)*100:.1f}%)")
    print(f"Not in portfolio DB: {len(missing_from_db)} ({len(missing_from_db)/len(s3_images)*100:.1f}%)")
    print("=" * 80)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nScript interrupted by user")
        sys.exit(0)
    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)











