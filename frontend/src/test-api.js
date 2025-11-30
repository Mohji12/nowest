// Simple test to verify API connection
import { BASE_URL } from './lib/baseUrl.js';

console.log('Testing API connection...');
console.log('Base URL:', BASE_URL);

// Test the health endpoint
fetch(`${BASE_URL}/health`)
  .then(response => {
    console.log('Health check response:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Health check data:', data);
  })
  .catch(error => {
    console.error('Health check error:', error);
  });

// Test the portfolio endpoint
fetch(`${BASE_URL}/api/portfolio`)
  .then(response => {
    console.log('Portfolio response:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Portfolio data length:', data.length);
  })
  .catch(error => {
    console.error('Portfolio error:', error);
  });
