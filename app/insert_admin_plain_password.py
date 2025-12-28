"""
Script to insert admin user with plain text password (NOT hashed).
Usage: python insert_admin_plain_password.py <username> <password>
"""
import sys
import os
import uuid
from datetime import datetime

# Add the app directory to the path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models.admin import Admin


def insert_admin_plain_password(username: str, password: str):
    """
    Insert a new admin user with plain text password (NOT hashed).
    
    Args:
        username: Admin username
        password: Admin password (will be stored as plain text)
    """
    db = SessionLocal()
    
    try:
        # Check if username already exists
        existing_admin = db.query(Admin).filter(Admin.username == username).first()
        if existing_admin:
            print(f"\n[ERROR] Username '{username}' already exists!")
            print(f"   Existing admin ID: {existing_admin.id}")
            return None
        
        # Create new admin with plain text password
        admin = Admin(
            id=str(uuid.uuid4()),
            username=username,
            password=password,  # Plain text password - NOT hashed
            created_at=datetime.now()
        )
        
        # Add to database
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        print(f"\n[SUCCESS] Admin user inserted successfully with plain text password!")
        print(f"   Username: {admin.username}")
        print(f"   Password: {admin.password} (stored as plain text)")
        print(f"   ID: {admin.id}")
        print(f"   Created at: {admin.created_at}")
        print(f"\n[WARNING] Password is stored in plain text - NOT SECURE!")
        print(f"[WARNING] This should only be used for testing purposes!\n")
        
        return admin
        
    except Exception as e:
        db.rollback()
        print(f"\n[ERROR] Error inserting admin user: {e}\n")
        import traceback
        traceback.print_exc()
        return None
    finally:
        db.close()


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("\nUsage: python insert_admin_plain_password.py <username> <password>")
        print("\nExample: python insert_admin_plain_password.py admin mypassword123")
        print("\n[WARNING] This script stores passwords in plain text - NOT SECURE!\n")
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    
    # Validate username length
    if len(username) < 3:
        print("\n[ERROR] Username must be at least 3 characters long\n")
        sys.exit(1)
    
    # Validate password length
    if len(password) < 1:
        print("\n[ERROR] Password cannot be empty\n")
        sys.exit(1)
    
    insert_admin_plain_password(username, password)

