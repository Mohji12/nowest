"""
Simple script to test admin login endpoint using Python requests.
Usage: python test_login_simple.py
"""
import requests
import json

# Configuration - Update these with your credentials
USERNAME = "your_username"  # Replace with your admin username
PASSWORD = "your_password"  # Replace with your admin password

# API URL - Change to production URL if needed
API_URL = "http://127.0.0.1:8000/api/admin/login"
# API_URL = "https://oljximoxqf.execute-api.ap-south-1.amazonaws.com/api/admin/login"  # Production

def test_login():
    """Test the admin login endpoint."""
    print("=" * 60)
    print("Testing Admin Login Endpoint")
    print("=" * 60)
    print(f"URL: {API_URL}")
    print(f"Username: {USERNAME}")
    print(f"Password: {'*' * len(PASSWORD)}")
    print("=" * 60)
    print()
    
    # Prepare request data
    data = {
        "username": USERNAME,
        "password": PASSWORD
    }
    
    try:
        # Send POST request
        print("Sending request...")
        response = requests.post(API_URL, json=data, timeout=10)
        
        # Print status code
        print(f"Status Code: {response.status_code}")
        print()
        
        # Parse and print response
        try:
            result = response.json()
            print("Response:")
            print(json.dumps(result, indent=2, default=str))
            print()
            
            # Check if login was successful
            if response.status_code == 200:
                print("[SUCCESS] ✓ Login successful!")
                print(f"✓ Token: {result.get('access_token', 'N/A')[:50]}...")
                print(f"✓ Admin: {result.get('admin', {}).get('username', 'N/A')}")
                return True
            else:
                print(f"[ERROR] ✗ Login failed")
                print(f"Error: {result.get('detail', 'Unknown error')}")
                return False
                
        except json.JSONDecodeError:
            print("[ERROR] Response is not valid JSON")
            print(f"Response text: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("[ERROR] Could not connect to backend server.")
        print(f"Make sure the backend is running on {API_URL}")
        print("\nTo start the backend:")
        print("  cd app")
        print("  uvicorn main:app --reload")
        return False
    except requests.exceptions.Timeout:
        print("[ERROR] Request timed out")
        return False
    except Exception as e:
        print(f"[ERROR] {type(e).__name__}: {e}")
        return False

if __name__ == "__main__":
    # Check if credentials are set
    if USERNAME == "your_username" or PASSWORD == "your_password":
        print("[INFO] Please update USERNAME and PASSWORD in the script first!")
        print()
        print("Edit the script and change:")
        print(f"  USERNAME = \"your_username\"  →  USERNAME = \"your_actual_username\"")
        print(f"  PASSWORD = \"your_password\"  →  PASSWORD = \"your_actual_password\"")
        print()
    else:
        test_login()

