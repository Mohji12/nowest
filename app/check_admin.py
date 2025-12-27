"""
Check admin user in database.
"""
import sys
from pathlib import Path

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from database import SessionLocal
from services.admin_service import AdminService
from utils.auth import verify_password

def check_admin():
    db = SessionLocal()
    try:
        service = AdminService(db)
        admin = service.get_admin_by_username('newadmin2025')
        
        if admin:
            print(f"\n[SUCCESS] Admin found!")
            print(f"Username: {admin.username}")
            print(f"ID: {admin.id}")
            print(f"Password hash: {admin.password[:60]}...")
            print(f"Hash length: {len(admin.password)}")
            print(f"Created at: {admin.created_at}")
            
            # Test password verification
            print("\n[TESTING] Password verification...")
            test_password = "SecurePass123!"
            result = verify_password(test_password, admin.password)
            print(f"Password verification result: {result}")
            
            if result:
                print("[SUCCESS] Password verification passed!")
            else:
                print("[ERROR] Password verification failed!")
                print(f"Testing with different password formats...")
                
        else:
            print("\n[ERROR] Admin user 'newadmin2025' not found in database!")
            print("You may need to create the admin user first.")
            
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    check_admin()

