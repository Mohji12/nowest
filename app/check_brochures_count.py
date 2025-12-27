"""
Check how many brochures are in the database.
"""
import sys
from pathlib import Path

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from database import SessionLocal
from models.brochure import Brochure

def check_brochures():
    db = SessionLocal()
    try:
        brochures = db.query(Brochure).all()
        
        print("\n" + "=" * 80)
        print("BROCHURES IN DATABASE")
        print("=" * 80)
        print(f"\nTotal brochures: {len(brochures)}\n")
        
        for i, brochure in enumerate(brochures, 1):
            print(f"{i}. {brochure.title}")
            print(f"   ID: {brochure.id}")
            print(f"   Image: {brochure.image or 'No image'}")
            print(f"   PDF: {brochure.pdf_path[:60]}..." if len(brochure.pdf_path) > 60 else f"   PDF: {brochure.pdf_path}")
            print()
        
        print("=" * 80)
        
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    check_brochures()

