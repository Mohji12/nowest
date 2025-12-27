"""
Script to add missing Nowest_Image URLs to the portfolio database.
This will add all images from Nowest_Image folder that are not already in the database.
"""

import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import sys
from pathlib import Path
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from typing import List, Set
import uuid
from datetime import datetime

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

def get_nowest_image_urls() -> List[dict]:
    """Get all image URLs from Nowest_Image folder with metadata."""
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
                    filename = key.replace(FOLDER_PREFIX, '')
                    images.append({
                        'url': url,
                        'filename': filename,
                        'key': key
                    })
        
        return images
        
    except Exception as e:
        print(f"[ERROR] Failed to get S3 images: {e}")
        return []

def get_existing_portfolio_urls() -> Set[str]:
    """Get all image URLs from portfolio database."""
    try:
        engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,
            echo=False
        )
        
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()
        
        try:
            result = db.execute(text("SELECT image FROM portfolio WHERE image IS NOT NULL AND image != ''"))
            rows = result.fetchall()
            
            db_urls = set()
            for row in rows:
                url = row[0]
                if url:
                    if url.startswith('http'):
                        db_urls.add(url)
                    # Also check for filename matches
                    if '/' in url:
                        filename = url.split('/')[-1]
                        db_urls.add(filename)
            
            return db_urls
            
        finally:
            db.close()
            
    except Exception as e:
        print(f"[ERROR] Failed to query database: {e}")
        import traceback
        traceback.print_exc()
        return set()

def generate_title_from_filename(filename: str) -> str:
    """Generate a portfolio title from filename."""
    # Remove extension
    name = filename.rsplit('.', 1)[0] if '.' in filename else filename
    
    # Replace common patterns
    name = name.replace('-', ' ')
    name = name.replace('_', ' ')
    name = name.replace('.webp', '')
    name = name.replace('.jpg', '')
    name = name.replace('.jpeg', '')
    name = name.replace('.png', '')
    
    # Capitalize words
    words = name.split()
    title = ' '.join(word.capitalize() for word in words if word)
    
    # Limit length
    if len(title) > 100:
        title = title[:97] + '...'
    
    return title or 'Portfolio Project'

def add_images_to_database(missing_images: List[dict]):
    """Add missing images to portfolio database."""
    try:
        engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,
            echo=False
        )
        
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()
        
        try:
            added_count = 0
            skipped_count = 0
            
            print(f"\nAdding {len(missing_images)} images to portfolio database...\n")
            
            for img in missing_images:
                try:
                    # Generate title from filename
                    title = generate_title_from_filename(img['filename'])
                    
                    # Check if already exists (by URL or filename)
                    filename = img['filename']
                    check_result = db.execute(
                        text("SELECT id FROM portfolio WHERE image = :url OR image LIKE :pattern"),
                        {"url": img['url'], "pattern": f"%{filename}%"}
                    )
                    existing = check_result.fetchone()
                    
                    if existing:
                        print(f"[SKIP] Already exists: {filename}")
                        skipped_count += 1
                        continue
                    
                    # Insert new portfolio item
                    portfolio_id = str(uuid.uuid4())
                    now = datetime.now()
                    
                    db.execute(
                        text("""
                            INSERT INTO portfolio (id, title, description, image, category, created_at, updated_at)
                            VALUES (:id, :title, :description, :image, :category, :created_at, :updated_at)
                        """),
                        {
                            "id": portfolio_id,
                            "title": title,
                            "description": f"Portfolio image: {img['filename']}",
                            "image": img['url'],
                            "category": "residential",  # Default category
                            "created_at": now,
                            "updated_at": now
                        }
                    )
                    
                    added_count += 1
                    if added_count % 10 == 0:
                        print(f"[PROGRESS] Added {added_count} images...")
                    
                except Exception as e:
                    print(f"[ERROR] Failed to add {img['filename']}: {e}")
                    skipped_count += 1
                    continue
            
            # Commit all changes
            db.commit()
            
            print(f"\n{'='*80}")
            print("ADDITION COMPLETE")
            print(f"{'='*80}")
            print(f"Successfully added: {added_count} images")
            print(f"Skipped (already exists): {skipped_count} images")
            print(f"Total processed: {len(missing_images)} images")
            print(f"{'='*80}\n")
            
            return added_count, skipped_count
            
        except Exception as e:
            db.rollback()
            print(f"[ERROR] Database transaction failed: {e}")
            import traceback
            traceback.print_exc()
            return 0, 0
            
        finally:
            db.close()
            
    except Exception as e:
        print(f"[ERROR] Failed to connect to database: {e}")
        import traceback
        traceback.print_exc()
        return 0, 0

def main():
    """Main function to add missing images."""
    print("=" * 80)
    print("Adding Missing Nowest_Image URLs to Portfolio Database")
    print("=" * 80)
    print()
    
    # Get S3 image URLs
    print("Step 1: Fetching images from S3 Nowest_Image folder...")
    s3_images = get_nowest_image_urls()
    print(f"Found {len(s3_images)} images in Nowest_Image folder\n")
    
    # Get existing database URLs
    print("Step 2: Checking existing portfolio images...")
    existing_urls = get_existing_portfolio_urls()
    print(f"Found {len(existing_urls)} existing image URLs in database\n")
    
    # Find missing images
    print("Step 3: Identifying missing images...")
    missing_images = []
    
    for img in s3_images:
        url = img['url']
        filename = img['filename']
        
        # Check if URL or filename exists in database
        found = False
        if url in existing_urls:
            found = True
        elif filename in existing_urls:
            found = True
        else:
            # Check if any existing URL contains this filename
            for existing_url in existing_urls:
                if filename in existing_url or existing_url.endswith(filename):
                    found = True
                    break
        
        if not found:
            missing_images.append(img)
    
    print(f"Found {len(missing_images)} images to add\n")
    
    if not missing_images:
        print("No missing images to add. All images are already in the database.")
        return
    
    # Confirm before adding
    print("=" * 80)
    print(f"Ready to add {len(missing_images)} images to portfolio database")
    print("=" * 80)
    print("\nFirst 10 images to be added:")
    for i, img in enumerate(missing_images[:10], 1):
        print(f"  {i}. {img['filename']}")
    if len(missing_images) > 10:
        print(f"  ... and {len(missing_images) - 10} more")
    print()
    
    # Add images to database
    added, skipped = add_images_to_database(missing_images)
    
    print(f"\n{'='*80}")
    print("FINAL SUMMARY")
    print(f"{'='*80}")
    print(f"Total Nowest_Image images: {len(s3_images)}")
    print(f"Already in database: {len(s3_images) - len(missing_images)}")
    print(f"Attempted to add: {len(missing_images)}")
    print(f"Successfully added: {added}")
    print(f"Skipped: {skipped}")
    print(f"{'='*80}\n")

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











