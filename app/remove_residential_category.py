"""
Script to remove "residential" category from portfolio items.
"""

import sys
from pathlib import Path
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from config import settings

def remove_residential_category():
    """Remove residential category from all portfolio items."""
    try:
        engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,
            echo=False
        )
        
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()
        
        try:
            # Count items with residential category
            count_result = db.execute(
                text("SELECT COUNT(*) FROM portfolio WHERE category = 'residential'")
            )
            count = count_result.scalar()
            
            print(f"Found {count} portfolio items with 'residential' category\n")
            
            if count == 0:
                print("No items with 'residential' category found.")
                return 0
            
            # Remove residential category (set to NULL)
            db.execute(
                text("UPDATE portfolio SET category = NULL, updated_at = NOW() WHERE category = 'residential'")
            )
            
            # Commit all changes
            db.commit()
            
            print("=" * 80)
            print("UPDATE COMPLETE")
            print("=" * 80)
            print(f"Successfully removed 'residential' category from {count} items")
            print("=" * 80)
            
            return count
            
        except Exception as e:
            db.rollback()
            print(f"[ERROR] Database transaction failed: {e}")
            import traceback
            traceback.print_exc()
            return 0
            
        finally:
            db.close()
            
    except Exception as e:
        print(f"[ERROR] Failed to connect to database: {e}")
        import traceback
        traceback.print_exc()
        return 0

def main():
    """Main function."""
    print("=" * 80)
    print("Removing 'Residential' Category from Portfolio Items")
    print("=" * 80)
    print("\nThis script will remove the 'residential' category from all")
    print("portfolio items that have it set.\n")
    
    updated = remove_residential_category()
    
    print(f"\n{'='*80}")
    print("FINAL SUMMARY")
    print(f"{'='*80}")
    print(f"Removed 'residential' category from: {updated} items")
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











