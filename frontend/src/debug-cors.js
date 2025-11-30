// Debug CORS configuration
console.log('=== CORS Debug Information ===');
console.log('Current origin:', window.location.origin);
console.log('Current hostname:', window.location.hostname);
console.log('Current port:', window.location.port);
console.log('Current protocol:', window.location.protocol);
console.log('Full URL:', window.location.href);

// Test API connection
const BASE_URL = 'https://ornttd4ymwk6zjdyo3baduzwma0zezqn.lambda-url.ap-south-1.on.aws/';

console.log('Testing API connection to:', BASE_URL);

fetch(`${BASE_URL}/health`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', [...response.headers.entries()]);
  return response.json();
})
.then(data => {
  console.log('Response data:', data);
})
.catch(error => {
  console.error('Fetch error:', error);
  console.error('Error details:', {
    name: error.name,
    message: error.message,
    stack: error.stack
  });
});
