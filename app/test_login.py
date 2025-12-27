"""
Test script to verify admin login functionality.
"""
import sys
import os

# Add the app directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import get_db
from services.admin_service import AdminService
from utils.auth import verify_password, hash_password

def test_login(username: str, password: str):
    """Test login with given credentials."""
    db_generator = get_db()
    db = next(db_generator)
    
    try:
        admin_service = AdminService(db)
        
        print(f"\nTesting login for username: {username}")
        print("=" * 50)
        
        # Get admin
        admin = admin_service.get_admin_by_username(username)
        if not admin:
            print(f"[ERROR] Admin '{username}' not found in database")
            return False
        
        print(f"[OK] Admin found: {admin.username}")
        print(f"[OK] Admin ID: {admin.id}")
        print(f"[OK] Password hash: {admin.password[:30]}...")
        print(f"[OK] Hash length: {len(admin.password)}")
        
        # Test password verification
        print(f"\nTesting password verification...")
        result = verify_password(password, admin.password)
        
        if result:
            print(f"[SUCCESS] Password verification: PASSED")
            
            # Test full authentication
            print(f"\nTesting full authentication...")
            authenticated_admin = admin_service.authenticate_admin(username, password)
            
            if authenticated_admin:
                print(f"[SUCCESS] Full authentication: PASSED")
                print(f"[OK] Authenticated admin: {authenticated_admin.username}")
                return True
            else:
                print(f"[ERROR] Full authentication: FAILED")
                return False
        else:
            print(f"[ERROR] Password verification: FAILED")
            print(f"[INFO] Testing if password needs to be rehashed...")
            
            # Try creating a new hash and comparing
            new_hash = hash_password(password)
            print(f"[INFO] New hash: {new_hash[:30]}...")
            print(f"[INFO] Old hash: {admin.password[:30]}...")
            print(f"[INFO] Hashes match: {new_hash == admin.password}")
            
            return False
            
    except Exception as e:
        print(f"\n[ERROR] Exception during test: {e}")
        import traceback
        traceback.print_exc()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    username = "newadmin2025"
    password = "SecurePass123!"
    
    success = test_login(username, password)
    
    if success:
        print("\n" + "=" * 50)
        print("[SUCCESS] Login test PASSED - credentials are working!")
        print("=" * 50 + "\n")
    else:
        print("\n" + "=" * 50)
        print("[FAILURE] Login test FAILED - check the errors above")
        print("=" * 50 + "\n")
        sys.exit(1)

