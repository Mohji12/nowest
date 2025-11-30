import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function APITest() {
  const [testResults, setTestResults] = useState<any[]>([]);

  const runTests = async () => {
    const results: any[] = [];
    
    // Test 1: Health check through proxy
    try {
      const response = await fetch('/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      results.push({
        test: 'Health Check (proxy)',
        status: response.status,
        ok: response.ok,
        success: response.ok,
      });
    } catch (error) {
      results.push({
        test: 'Health Check (proxy)',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      });
    }

    // Test 2: Portfolio API through proxy
    try {
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      results.push({
        test: 'Portfolio API (proxy)',
        status: response.status,
        ok: response.ok,
        success: response.ok,
      });
    } catch (error) {
      results.push({
        test: 'Portfolio API (proxy)',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      });
    }

    // Test 3: Products API through proxy
    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      results.push({
        test: 'Products API (proxy)',
        status: response.status,
        ok: response.ok,
        success: response.ok,
      });
    } catch (error) {
      results.push({
        test: 'Products API (proxy)',
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      });
    }

    setTestResults(results);
  };

  return (
    <div className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold mb-4">API Connection Test</h1>
          <p className="text-muted-foreground mb-6">
            Test the connection to your backend API
          </p>
          <Button onClick={runTests}>Run API Tests</Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${
                    result.success ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.success ? '✅' : '❌'} {result.test}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result.success ? (
                    <div>
                      <p>Status: {result.status}</p>
                      <p>OK: {result.ok ? 'Yes' : 'No'}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-red-600">Error: {result.error}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
