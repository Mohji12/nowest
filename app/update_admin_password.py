"""
Script to update an admin user's password in the database.
Usage: python update_admin_password.py <username> <new_password>
"""
import sys
import os

# Add the app directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import get_db
from services.admin_service import AdminService

def update_password(username: str, new_password: str):
    """
    Update admin user password in the database.
    
    Args:
        username: Admin username
        new_password: New password
    """
    # Get database session
    db_generator = get_db()
    db = next(db_generator)
    
    try:
        admin_service = AdminService(db)
        
        # Get admin
        admin = admin_service.get_admin_by_username(username)
        if not admin:
            print(f"\n[ERROR] Admin '{username}' not found in database\n")
            return False
        
        # Update password
        success = admin_service.update_admin_password(admin.id, new_password)
        
        if success:
            print(f"\n[SUCCESS] Password updated successfully!")
            print(f"   Username: {username}")
            print(f"   New password: {new_password}")
            print(f"\n[WARNING] Please keep the password secure!\n")
            return True
        else:
            print(f"\n[ERROR] Failed to update password\n")
            return False
        
    except Exception as e:
        print(f"\n[ERROR] Error updating password: {e}\n")
        import traceback
        traceback.print_exc()
        return False
    finally:
        db.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("\nUsage: python update_admin_password.py <username> <new_password>")
        print("\nExample: python update_admin_password.py newadmin2025 SecurePass123!\n")
        sys.exit(1)
    
    username = sys.argv[1]
    new_password = sys.argv[2]
    
    # Validate password length
    if len(new_password) < 6:
        print("\n[ERROR] Password must be at least 6 characters long\n")
        sys.exit(1)
    
    update_password(username, new_password)

