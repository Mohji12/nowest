"""
Test the admin login endpoint.
Usage: python test_admin_login.py <username> <password> [--url URL]
"""
import sys
import requests
import json

# Default URLs
LOCAL_URL = "http://127.0.0.1:8000"
PRODUCTION_URL = "https://oljximoxqf.execute-api.ap-south-1.amazonaws.com"


def test_login(username: str, password: str, base_url: str = LOCAL_URL):
    """
    Test the admin login endpoint.
    
    Args:
        username: Admin username
        password: Admin password
        base_url: Base URL for the API
    """
    url = f"{base_url}/api/admin/login"
    
    data = {
        "username": username,
        "password": password
    }
    
    print("=" * 60)
    print("Testing Admin Login Endpoint")
    print("=" * 60)
    print(f"URL: {url}")
    print(f"Username: {username}")
    print(f"Password: {'*' * len(password)}")
    print("=" * 60)
    print()
    
    try:
        print("Sending POST request...")
        response = requests.post(url, json=data, timeout=10)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        print()
        
        # Try to parse JSON response
        try:
            result = response.json()
            print("Response JSON:")
            print(json.dumps(result, indent=2, default=str))
            print()
            
            if response.status_code == 200:
                print("[SUCCESS] Login successful!")
                print(f"✓ Token received: {result.get('access_token', 'N/A')[:50]}...")
                print(f"✓ Token type: {result.get('token_type', 'N/A')}")
                print(f"✓ Expires in: {result.get('expires_in', 'N/A')} seconds")
                if result.get('admin'):
                    admin = result['admin']
                    print(f"✓ Admin ID: {admin.get('id', 'N/A')}")
                    print(f"✓ Admin Username: {admin.get('username', 'N/A')}")
                return True
            else:
                print(f"[ERROR] Login failed with status {response.status_code}")
                print(f"Error detail: {result.get('detail', 'No detail provided')}")
                return False
                
        except json.JSONDecodeError:
            print("[ERROR] Response is not valid JSON")
            print(f"Response text: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("[ERROR] Could not connect to backend server.")
        print(f"Make sure the backend is running on {base_url}")
        print("\nTo start the backend:")
        print("  cd app")
        print("  uvicorn main:app --reload")
        return False
    except requests.exceptions.Timeout:
        print("[ERROR] Request timed out")
        return False
    except Exception as e:
        print(f"[ERROR] {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_debug_endpoint(base_url: str = LOCAL_URL):
    """
    Test the debug endpoint to see all admins.
    """
    url = f"{base_url}/api/admin/debug"
    
    print("\n" + "=" * 60)
    print("Testing Debug Endpoint (List All Admins)")
    print("=" * 60)
    print(f"URL: {url}")
    print("=" * 60)
    print()
    
    try:
        response = requests.get(url, timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print("Response:")
            print(json.dumps(result, indent=2, default=str))
            print()
            print(f"[INFO] Total admins in database: {result.get('admin_count', 0)}")
            return True
        else:
            print(f"[ERROR] Debug endpoint failed: {response.text}")
            return False
    except Exception as e:
        print(f"[ERROR] {e}")
        return False


if __name__ == "__main__":
    # Parse command line arguments
    base_url = LOCAL_URL
    use_production = False
    
    if "--url" in sys.argv:
        url_index = sys.argv.index("--url")
        if url_index + 1 < len(sys.argv):
            base_url = sys.argv[url_index + 1]
            sys.argv = [arg for arg in sys.argv if arg != "--url" and sys.argv.index(arg) != url_index + 1]
    
    if "--prod" in sys.argv or "--production" in sys.argv:
        base_url = PRODUCTION_URL
        sys.argv = [arg for arg in sys.argv if arg not in ["--prod", "--production"]]
    
    if len(sys.argv) < 3:
        print("\nUsage: python test_admin_login.py <username> <password> [options]")
        print("\nOptions:")
        print("  --url <URL>     Custom API URL")
        print("  --prod          Use production URL")
        print("\nExamples:")
        print("  python test_admin_login.py admin mypassword123")
        print("  python test_admin_login.py admin mypassword123 --prod")
        print("  python test_admin_login.py admin mypassword123 --url http://localhost:8000")
        print()
        sys.exit(1)
    
    username = sys.argv[1]
    password = sys.argv[2]
    
    # Test debug endpoint first
    print("Step 1: Checking admins in database...")
    test_debug_endpoint(base_url)
    
    print("\n" + "=" * 60)
    print()
    
    # Test login
    print("Step 2: Testing login endpoint...")
    success = test_login(username, password, base_url)
    
    print("\n" + "=" * 60)
    if success:
        print("[RESULT] ✓ Login endpoint is working correctly!")
    else:
        print("[RESULT] ✗ Login endpoint test failed")
        print("\nTroubleshooting:")
        print("1. Check if backend server is running")
        print("2. Verify username and password are correct")
        print("3. Check if password is stored as plain text (if you used insert_admin_plain_password.py)")
        print("4. Check backend logs for errors")
    print("=" * 60)

