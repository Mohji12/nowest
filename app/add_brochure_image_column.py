"""
Script to add image column to brochures table.
Run this script to add the image column if it doesn't exist.
"""
import sys
from pathlib import Path

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from database import SessionLocal, engine
from sqlalchemy import text
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def add_image_column():
    """Add image column to brochures table if it doesn't exist."""
    db = SessionLocal()
    try:
        # Check if column exists
        result = db.execute(text("""
            SELECT COUNT(*) 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'brochures' 
            AND COLUMN_NAME = 'image'
        """))
        
        column_exists = result.scalar() > 0
        
        if column_exists:
            print("[SUCCESS] Image column already exists in brochures table")
            return True
        
        # Add the column
        print("Adding image column to brochures table...")
        db.execute(text("""
            ALTER TABLE brochures 
            ADD COLUMN image VARCHAR(500) NULL 
            AFTER pdf_path
        """))
        db.commit()
        
        print("[SUCCESS] Image column added successfully!")
        return True
        
    except Exception as e:
        print(f"[ERROR] Error adding image column: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    print("=" * 80)
    print("Adding image column to brochures table")
    print("=" * 80)
    print()
    
    success = add_image_column()
    
    print()
    print("=" * 80)
    if success:
        print("SUCCESS: Image column added to brochures table")
    else:
        print("FAILED: Could not add image column")
    print("=" * 80)

