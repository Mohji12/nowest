"""
Script to count images in the Nowest_Image folder of S3 bucket.
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

def count_nowest_images():
    """Count images in the Nowest_Image folder."""
    try:
        s3_client = boto3.client('s3', region_name='ap-south-1')
        
        print("=" * 80)
        print("Counting images in Nowest_Image folder")
        print("=" * 80)
        print(f"\nScanning: s3://{BUCKET}/{FOLDER_PREFIX}\n")
        
        images = []
        total_size = 0
        
        # List all objects in the Nowest_Image folder
        paginator = s3_client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=BUCKET, Prefix=FOLDER_PREFIX)
        
        for page in pages:
            if 'Contents' not in page:
                continue
                
            for obj in page['Contents']:
                key = obj['Key']
                size = obj['Size']
                
                # Skip if it's a folder (ends with /)
                if key.endswith('/'):
                    continue
                
                # Check if it's an image
                if is_image_file(key):
                    images.append({
                        'key': key,
                        'name': key.replace(FOLDER_PREFIX, ''),
                        'size': size,
                        'url': f"https://{BUCKET}.s3.ap-south-1.amazonaws.com/{key}"
                    })
                    total_size += size
        
        # Print results
        print(f"Total images found: {len(images)}\n")
        print(f"Total size: {total_size / (1024 * 1024):.2f} MB\n")
        
        # Print all images
        print("=" * 80)
        print("Image List:")
        print("=" * 80)
        for i, img in enumerate(sorted(images, key=lambda x: x['name']), 1):
            size_kb = img['size'] / 1024
            print(f"{i:3d}. {img['name']}")
            print(f"     Size: {size_kb:.1f} KB")
            print(f"     URL: {img['url']}\n")
        
        print("=" * 80)
        print(f"SUMMARY: {len(images)} images in Nowest_Image folder")
        print("=" * 80)
        
        return images
        
    except NoCredentialsError:
        print("[ERROR] AWS credentials not found!")
        print("\nPlease configure AWS credentials using one of these methods:")
        print("1. AWS CLI: aws configure")
        print("2. Environment variables: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY")
        return []
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'NoSuchBucket':
            print(f"[ERROR] Bucket '{BUCKET}' does not exist or is not accessible")
        elif error_code == 'AccessDenied':
            print(f"[ERROR] Access denied to bucket '{BUCKET}'")
            print("   Please check your AWS credentials and bucket permissions")
        else:
            print(f"[ERROR] Error accessing bucket '{BUCKET}': {e}")
        return []
        
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return []

if __name__ == "__main__":
    try:
        count_nowest_images()
    except KeyboardInterrupt:
        print("\n\nScript interrupted by user")
        sys.exit(0)











