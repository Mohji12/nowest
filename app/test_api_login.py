"""
Test the API login endpoint directly.
"""
import requests
import json

url = "http://127.0.0.1:8000/api/admin/login"
data = {
    "username": "newadmin2025",
    "password": "SecurePass123!"
}

print(f"Testing API login endpoint: {url}")
print(f"Credentials: username={data['username']}, password={'*' * len(data['password'])}")
print("=" * 50)

try:
    response = requests.post(url, json=data, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n[SUCCESS] Login successful!")
        print(f"Token: {result.get('access_token', 'N/A')[:50]}...")
        print(f"Admin: {result.get('admin', {})}")
    else:
        print(f"\n[ERROR] Login failed")
        print(f"Response: {response.text}")
        
except requests.exceptions.ConnectionError:
    print("\n[ERROR] Could not connect to backend server.")
    print("Make sure the backend is running on http://127.0.0.1:8000")
except Exception as e:
    print(f"\n[ERROR] {e}")

