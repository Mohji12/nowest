"""
Python script to update product image URLs in the database.
This script replaces old S3 URLs with new S3 URLs in the products table.
"""
import sys
import os

# Add the app directory to Python path
app_dir = os.path.dirname(os.path.abspath(__file__))
if app_dir not in sys.path:
    sys.path.insert(0, app_dir)

from database import SessionLocal, engine
from sqlalchemy import text
from models.product import Product
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mapping of old URLs to new URLs
URL_MAPPINGS = [
    {
        'old': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/pencil-pleat-curtains.jpg',
        'new': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp'
    },
    {
        'old': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/wave-curtains.jpg',
        'new': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp'
    },
    {
        'old': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/eyelet-curtains-150x150.jpg',
        'new': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp'
    },
    {
        'old': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/5-panel-curtains-1536x1536.jpg',
        'new': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp'
    },
    {
        'old': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/pelmets_window_trea_eebc04a4.jpg',
        'new': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp'
    },
    {
        'old': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/fire-retardant-curtains.jpg',
        'new': 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg'
    }
]


def update_product_images():
    """Update product image URLs in the database."""
    db = SessionLocal()
    try:
        total_updated = 0
        
        for mapping in URL_MAPPINGS:
            old_url = mapping['old']
            new_url = mapping['new']
            
            # Find products with the old URL
            products = db.query(Product).filter(Product.image == old_url).all()
            
            if products:
                logger.info(f"Found {len(products)} product(s) with URL: {old_url}")
                
                for product in products:
                    logger.info(f"Updating product '{product.name}' (ID: {product.id})")
                    logger.info(f"  Old URL: {product.image}")
                    product.image = new_url
                    logger.info(f"  New URL: {product.image}")
                    total_updated += 1
            else:
                logger.info(f"No products found with URL: {old_url}")
        
        # Commit all changes
        if total_updated > 0:
            db.commit()
            logger.info(f"\n✅ Successfully updated {total_updated} product(s)")
        else:
            logger.info("\n⚠️  No products were updated. All URLs may have already been updated or don't exist in the database.")
        
        # Verify updates
        logger.info("\n📋 Verifying updates...")
        for mapping in URL_MAPPINGS:
            new_url = mapping['new']
            products = db.query(Product).filter(Product.image == new_url).all()
            if products:
                logger.info(f"✅ Found {len(products)} product(s) with new URL: {new_url}")
                for product in products:
                    logger.info(f"   - {product.name} (ID: {product.id})")
        
        return total_updated
        
    except Exception as e:
        logger.error(f"❌ Error updating product images: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("=" * 60)
    print("Product Image URL Update Script")
    print("=" * 60)
    print("\nThis script will update the following URLs in the products table:\n")
    
    for i, mapping in enumerate(URL_MAPPINGS, 1):
        print(f"{i}. {mapping['old']}")
        print(f"   → {mapping['new']}\n")
    
    response = input("Do you want to proceed with the update? (yes/no): ")
    
    if response.lower() in ['yes', 'y']:
        try:
            updated_count = update_product_images()
            print(f"\n{'=' * 60}")
            print(f"Update completed! {updated_count} product(s) updated.")
            print(f"{'=' * 60}")
        except Exception as e:
            print(f"\n❌ Error: {e}")
            sys.exit(1)
    else:
        print("\nUpdate cancelled.")













