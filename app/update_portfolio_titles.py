"""
Script to update portfolio item titles with meaningful, unique names.
This will replace generic titles with descriptive names based on image filenames.
"""

import sys
from pathlib import Path
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from typing import Dict, Set
import re

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from config import settings

def clean_filename(filename: str) -> str:
    """Clean and format filename for title generation."""
    # Remove extension
    name = filename.rsplit('.', 1)[0] if '.' in filename else filename
    
    # Remove common prefixes/suffixes
    name = name.replace('Copy of ', '')
    name = name.replace('Copy of Copy of ', '')
    name = name.replace('unnamed', '')
    name = name.replace('IMG_', '')
    name = name.replace('DSC0', '')
    
    return name.strip()

def generate_meaningful_title(filename: str, existing_titles: Set[str]) -> str:
    """Generate a simple, unique title from filename - just product type with number."""
    # Clean the filename
    clean_name = clean_filename(filename)
    name_lower = clean_name.lower()
    
    # Determine product type
    product_type = None
    
    if 'allusion' in name_lower:
        product_type = 'Allusion Blind'
    elif 'perfect' in name_lower and 'fit' in name_lower:
        if 'next' in name_lower or 'ng' in name_lower:
            product_type = 'Perfect Fit Next Generation'
        else:
            product_type = 'Perfect Fit Blind'
    elif 'roller' in name_lower or 'roll' in name_lower:
        product_type = 'Roller Blind'
    elif 'vertical' in name_lower or 'vert' in name_lower:
        product_type = 'Vertical Blind'
    elif 'roman' in name_lower:
        product_type = 'Roman Blind'
    elif 'motorized' in name_lower or 'automated' in name_lower:
        product_type = 'Motorized Blind'
    elif 'voile' in name_lower:
        product_type = 'Voile Curtain'
    elif 'curtain' in name_lower:
        # Check for specific curtain types
        if 'white' in name_lower:
            product_type = 'Curtain - White'
        elif 'blackout' in name_lower:
            product_type = 'Blackout Curtain'
        elif 'sheer' in name_lower:
            product_type = 'Sheer Curtain'
        elif 'velvet' in name_lower:
            product_type = 'Velvet Curtain'
        elif 'silk' in name_lower:
            product_type = 'Silk Curtain'
        elif 'layered' in name_lower:
            product_type = 'Layered Curtain'
        else:
            product_type = 'Curtain'
    else:
        # For UUID or unnamed files, use generic name
        if re.match(r'^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}', clean_name, re.IGNORECASE):
            product_type = 'Portfolio Image'
        elif 'unnamed' in name_lower:
            # Extract number if present
            number_match = re.search(r'\((\d+)\)', clean_name)
            if number_match:
                product_type = f"Project {number_match.group(1)}"
            else:
                product_type = 'Project'
        elif re.match(r'^\d{4}-\d{2}-\d{2}', clean_name):
            # Date-based files
            if '2020-06' in clean_name:
                product_type = 'June 2020'
            elif '2024-12' in clean_name:
                product_type = 'December 2024'
            else:
                product_type = 'Portfolio Image'
        else:
            product_type = 'Portfolio Image'
    
    # Ensure uniqueness by adding number if needed
    base_title = product_type
    title = base_title
    
    # Check if we need to add a number
    if title in existing_titles:
        counter = 1
        title = f"{base_title} ({counter})"
        while title in existing_titles:
            counter += 1
            title = f"{base_title} ({counter})"
    
    # Limit length
    if len(title) > 100:
        title = title[:97] + '...'
    
    return title.strip() or 'Portfolio Project'

def update_portfolio_titles():
    """Update all portfolio item titles with meaningful names."""
    try:
        engine = create_engine(
            settings.database_url,
            pool_pre_ping=True,
            echo=False
        )
        
        SessionLocal = sessionmaker(bind=engine)
        db = SessionLocal()
        
        try:
            # Get all portfolio items
            result = db.execute(
                text("SELECT id, title, image FROM portfolio ORDER BY created_at")
            )
            portfolio_items = result.fetchall()
            
            print(f"Found {len(portfolio_items)} portfolio items to update\n")
            
            # Get existing titles to ensure uniqueness
            existing_titles = set()
            for item in portfolio_items:
                if item[1]:  # title
                    existing_titles.add(item[1])
            
            updated_count = 0
            skipped_count = 0
            
            print("Updating portfolio titles...\n")
            
            for item in portfolio_items:
                portfolio_id = item[0]
                current_title = item[1]
                image_url = item[2]
                
                if not image_url:
                    print(f"[SKIP] No image URL for ID: {portfolio_id}")
                    skipped_count += 1
                    continue
                
                # Extract filename from URL
                filename = image_url.split('/')[-1]
                
                # Generate new title
                new_title = generate_meaningful_title(filename, existing_titles)
                
                # Check if title needs updating
                if new_title == current_title:
                    print(f"[SKIP] Title already good: {current_title}")
                    skipped_count += 1
                    continue
                
                # Update title
                db.execute(
                    text("UPDATE portfolio SET title = :title, updated_at = NOW() WHERE id = :id"),
                    {"title": new_title, "id": portfolio_id}
                )
                
                existing_titles.add(new_title)
                updated_count += 1
                
                print(f"[UPDATED] {filename}")
                print(f"  Old: {current_title}")
                print(f"  New: {new_title}\n")
                
                if updated_count % 20 == 0:
                    print(f"[PROGRESS] Updated {updated_count} titles...\n")
            
            # Commit all changes
            db.commit()
            
            print("=" * 80)
            print("UPDATE COMPLETE")
            print("=" * 80)
            print(f"Total portfolio items: {len(portfolio_items)}")
            print(f"Successfully updated: {updated_count}")
            print(f"Skipped: {skipped_count}")
            print("=" * 80)
            
            return updated_count, skipped_count
            
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
    """Main function."""
    print("=" * 80)
    print("Updating Portfolio Item Titles")
    print("=" * 80)
    print("\nThis script will update all portfolio item titles with meaningful,")
    print("unique names based on their image filenames.\n")
    
    updated, skipped = update_portfolio_titles()
    
    print(f"\n{'='*80}")
    print("FINAL SUMMARY")
    print(f"{'='*80}")
    print(f"Updated: {updated} titles")
    print(f"Skipped: {skipped} items")
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

