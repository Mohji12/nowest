"""
Script to list all images in the S3 bucket.
This script will count and list all image files in the S3 buckets.

Requirements:
- boto3 library: pip install boto3
- AWS credentials configured (via AWS CLI, environment variables, or IAM role)

Usage:
    python app/list_s3_images.py
"""

import boto3
from botocore.exceptions import ClientError, NoCredentialsError
import sys
from pathlib import Path

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

# S3 Configuration
BUCKETS = [
    "jgi-menteetracker",
    "jgi-menteetrackers"
]

# Image file extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'}

def is_image_file(key: str) -> bool:
    """Check if a file is an image based on its extension."""
    return any(key.lower().endswith(ext) for ext in IMAGE_EXTENSIONS)

def list_s3_images(bucket_name: str):
    """List all images in an S3 bucket."""
    try:
        s3_client = boto3.client('s3', region_name='ap-south-1')
        
        print(f"\n{'='*80}")
        print(f"Scanning bucket: {bucket_name}")
        print(f"{'='*80}\n")
        
        images = []
        folders = {}
        
        # List all objects in the bucket
        paginator = s3_client.get_paginator('list_objects_v2')
        pages = paginator.paginate(Bucket=bucket_name)
        
        for page in pages:
            if 'Contents' not in page:
                continue
                
            for obj in page['Contents']:
                key = obj['Key']
                size = obj['Size']
                
                # Check if it's an image
                if is_image_file(key):
                    images.append({
                        'key': key,
                        'size': size,
                        'url': f"https://{bucket_name}.s3.ap-south-1.amazonaws.com/{key}"
                    })
                    
                    # Group by folder
                    folder = '/'.join(key.split('/')[:-1]) if '/' in key else 'root'
                    if folder not in folders:
                        folders[folder] = []
                    folders[folder].append(key)
        
        # Print summary
        print(f"Total images found: {len(images)}\n")
        
        # Print by folder
        print("Images by folder:")
        print("-" * 80)
        for folder, files in sorted(folders.items()):
            print(f"\n[{folder if folder != 'root' else 'Root'}]: {len(files)} images")
            for file in sorted(files):
                file_size_kb = next((img['size'] for img in images if img['key'] == file), 0) / 1024
                print(f"   - {file.split('/')[-1]} ({file_size_kb:.1f} KB)")
                print(f"     URL: https://{bucket_name}.s3.ap-south-1.amazonaws.com/{file}")
        
        # Print all image URLs
        print(f"\n\n{'='*80}")
        print("All Image URLs:")
        print(f"{'='*80}\n")
        for img in sorted(images, key=lambda x: x['key']):
            print(f"{img['url']}")
        
        return images, folders
        
    except NoCredentialsError:
        print("[ERROR] AWS credentials not found!")
        print("\nPlease configure AWS credentials using one of these methods:")
        print("1. AWS CLI: aws configure")
        print("2. Environment variables: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY")
        print("3. IAM role (if running on EC2)")
        return [], {}
        
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'NoSuchBucket':
            print(f"[ERROR] Bucket '{bucket_name}' does not exist or is not accessible")
        elif error_code == 'AccessDenied':
            print(f"[ERROR] Access denied to bucket '{bucket_name}'")
            print("   Please check your AWS credentials and bucket permissions")
            print("   Note: You may need s3:ListBucket permission for this bucket")
        else:
            print(f"[ERROR] Error accessing bucket '{bucket_name}': {e}")
        return [], {}
        
    except Exception as e:
        print(f"[ERROR] Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return [], {}

def main():
    """Main function to list images from all buckets."""
    print("=" * 80)
    print("S3 Bucket Image Scanner")
    print("=" * 80)
    
    all_images = []
    all_folders = {}
    
    for bucket in BUCKETS:
        images, folders = list_s3_images(bucket)
        all_images.extend(images)
        all_folders[bucket] = folders
    
    # Final summary
    print(f"\n\n{'='*80}")
    print("SUMMARY")
    print(f"{'='*80}")
    print(f"Total images across all buckets: {len(all_images)}")
    print(f"Buckets scanned: {len(BUCKETS)}")
    
    for bucket in BUCKETS:
        if bucket in all_folders:
            total = sum(len(files) for files in all_folders[bucket].values())
            print(f"  • {bucket}: {total} images")
    
    print(f"\n{'='*80}\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nScript interrupted by user")
        sys.exit(0)

