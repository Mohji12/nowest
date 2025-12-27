"""
Check password hash formats in the database.
"""
import sys
from pathlib import Path

# Add the app directory to Python path
app_dir = Path(__file__).parent
sys.path.insert(0, str(app_dir))

from database import SessionLocal
from sqlalchemy import text

def check_password_formats():
    db = SessionLocal()
    try:
        # Get all admins with their password hashes
        result = db.execute(text("SELECT id, username, password, created_at FROM admins ORDER BY created_at DESC"))
        admins = result.fetchall()
        
        print("\n" + "=" * 80)
        print("PASSWORD HASH FORMATS IN DATABASE")
        print("=" * 80)
        
        for admin in admins:
            admin_id, username, password_hash, created_at = admin
            print(f"\nUsername: {username}")
            print(f"ID: {admin_id}")
            print(f"Created At: {created_at}")
            
            if password_hash is None:
                print("Password Hash: NULL")
                print("Format: None")
            else:
                print(f"Password Hash: {password_hash[:60]}...")
                print(f"Full Hash Length: {len(password_hash)}")
                
                # Determine format
                if password_hash.startswith('$2a$') or password_hash.startswith('$2b$') or password_hash.startswith('$2y$'):
                    print("Format: BCRYPT")
                    # Extract cost factor
                    parts = password_hash.split('$')
                    if len(parts) >= 3:
                        print(f"  Cost Factor: {parts[2]}")
                elif password_hash.startswith('$scrypt$'):
                    print("Format: SCRYPT")
                elif '.' in password_hash and len(password_hash) > 60:
                    print("Format: SCRYPT (legacy format: hash.salt)")
                elif len(password_hash) == 64 and all(c in '0123456789abcdef' for c in password_hash.lower()):
                    print("Format: SHA-256 (hexadecimal)")
                elif len(password_hash) == 40 and all(c in '0123456789abcdef' for c in password_hash.lower()):
                    print("Format: SHA-1 (hexadecimal)")
                elif len(password_hash) == 32 and all(c in '0123456789abcdef' for c in password_hash.lower()):
                    print("Format: MD5 (hexadecimal)")
                else:
                    print("Format: UNKNOWN")
                    print(f"  First 20 chars: {password_hash[:20]}")
        
        print("\n" + "=" * 80)
        print(f"Total admins: {len(admins)}")
        print("=" * 80)
        
        # Specifically check newadmin2025
        print("\n" + "=" * 80)
        print("CHECKING newadmin2025 SPECIFICALLY")
        print("=" * 80)
        result = db.execute(text("SELECT username, password FROM admins WHERE username = 'newadmin2025'"))
        admin = result.fetchone()
        
        if admin:
            username, password_hash = admin
            print(f"\nUsername: {username}")
            print(f"Password Hash: {password_hash}")
            print(f"Hash Length: {len(password_hash)}")
            print(f"Starts with: {password_hash[:10]}")
            
            if password_hash.startswith('$2b$'):
                print("✓ Format: BCRYPT ($2b$)")
            else:
                print(f"✗ Format: {password_hash[:10]} (NOT BCRYPT)")
        else:
            print("\n✗ Admin 'newadmin2025' not found!")
            
    except Exception as e:
        print(f"\n[ERROR] {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    check_password_formats()

