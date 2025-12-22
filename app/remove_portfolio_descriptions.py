"""
Script to remove "Portfolio image: filename" descriptions from portfolio items.
"""

import sys
from pathlib import Path
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from config import settings

def remove_descriptions():
    """Remove or clean up portfolio item descriptions."""
    try:
        engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,
            echo=False
        )
        
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()
        
        try:
            # Get all portfolio items with descriptions
            result = db.execute(
                text("SELECT id, description FROM portfolio WHERE description IS NOT NULL AND description != ''")
            )
            portfolio_items = result.fetchall()
            
            print(f"Found {len(portfolio_items)} portfolio items with descriptions\n")
            
            updated_count = 0
            
            print("Removing descriptions...\n")
            
            for item in portfolio_items:
                portfolio_id = item[0]
                description = item[1]
                
                # Check if description starts with "Portfolio image:"
                if description and description.startswith("Portfolio image:"):
                    # Clear the description
                    db.execute(
                        text("UPDATE portfolio SET description = NULL, updated_at = NOW() WHERE id = :id"),
                        {"id": portfolio_id}
                    )
                    updated_count += 1
                    print(f"[UPDATED] Removed description from ID: {portfolio_id}")
            
            # Commit all changes
            db.commit()
            
            print("\n" + "=" * 80)
            print("UPDATE COMPLETE")
            print("=" * 80)
            print(f"Total items with descriptions: {len(portfolio_items)}")
            print(f"Successfully removed: {updated_count} descriptions")
            print("=" * 80)
            
            return updated_count
            
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
    print("Removing Portfolio Item Descriptions")
    print("=" * 80)
    print("\nThis script will remove 'Portfolio image: filename' descriptions")
    print("from all portfolio items.\n")
    
    updated = remove_descriptions()
    
    print(f"\n{'='*80}")
    print("FINAL SUMMARY")
    print(f"{'='*80}")
    print(f"Removed descriptions from: {updated} items")
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







