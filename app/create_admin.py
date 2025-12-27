"""
Script to create a new admin user in the database.
Usage: python create_admin.py <username> <password>
"""
import sys
import os

# Add the app directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import get_db, engine
from services.admin_service import AdminService
from schemas.admin import AdminCreate
from sqlalchemy.orm import Session


def create_admin_user(username: str, password: str):
    """
    Create a new admin user in the database.
    
    Args:
        username: Admin username
        password: Admin password
    """
    # Get database session
    db_generator = get_db()
    db: Session = next(db_generator)
    
    try:
        admin_service = AdminService(db)
        
        # Create admin data
        admin_data = AdminCreate(
            username=username,
            password=password
        )
        
        # Create admin
        admin = admin_service.create_admin(admin_data)
        
        print(f"\n[SUCCESS] Admin user created successfully!")
        print(f"   Username: {admin.username}")
        print(f"   ID: {admin.id}")
        print(f"   Created at: {admin.created_at}")
        print(f"\n[WARNING] Please keep the password secure!\n")
        
        return admin
        
    except Exception as e:
        print(f"\n[ERROR] Error creating admin user: {e}\n")
        return None
    finally:
        db.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("\nUsage: python create_admin.py <username> <password>")
        print("\nExample: python create_admin.py newadmin mypassword123\n")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    
    # Validate username length
    if len(username) < 3:
        print("\n[ERROR] Username must be at least 3 characters long\n")
        sys.exit(1)
    
    # Validate password length
    if len(password) < 6:
        print("\n[ERROR] Password must be at least 6 characters long\n")
        sys.exit(1)
    
    create_admin_user(username, password)

