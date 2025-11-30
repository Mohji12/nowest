import { useState, useEffect } from 'react';
import { getPortfolio } from '@/services/api';

export default function PortfolioTest() {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const data = await getPortfolio();
        setPortfolioData(data);
        console.log('Portfolio data received:', data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Portfolio fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Portfolio API Test</h1>
          <p>Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Portfolio API Test</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Portfolio API Test</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Raw API Response:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(portfolioData, null, 2)}
          </pre>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Portfolio Items ({portfolioData?.length || 0}):</h2>
          {portfolioData?.map((item: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-lg">{item.title || 'No title'}</h3>
              <p className="text-gray-600 mb-2">{item.description || 'No description'}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>ID:</strong> {item.id || 'No ID'}
                </div>
                <div>
                  <strong>Category:</strong> {item.category || 'No category'}
                </div>
                <div>
                  <strong>Location:</strong> {item.location || 'No location'}
                </div>
                <div>
                  <strong>Client:</strong> {item.client || 'No client'}
                </div>
                <div>
                  <strong>Image URL:</strong> {item.image || 'No image URL'}
                </div>
                <div>
                  <strong>Created:</strong> {item.created_at || 'No created date'}
                </div>
              </div>
              {item.image && (
                <div className="mt-4">
                  <strong>Image Preview:</strong>
                  <p className="text-sm text-gray-500 mb-2">Database URL: {item.image}</p>
                  <p className="text-sm text-gray-500 mb-2">URL Type: {item.image.startsWith('http') ? 'Full URL (S3/External)' : 'Relative Path'}</p>
                  {(() => {
                    const finalUrl = item.image.startsWith('http') 
                      ? item.image 
                      : `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${item.image.startsWith('/') ? item.image.substring(1) : item.image}`;
                    return (
                      <>
                        <p className="text-sm text-gray-500 mb-2">Final URL: {finalUrl}</p>
                        <img 
                          src={finalUrl} 
                          alt={item.title}
                          className="mt-2 max-w-xs h-32 object-cover rounded"
                          onError={(e) => {
                            console.error('Image failed to load:', finalUrl);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Image loaded successfully:', finalUrl);
                          }}
                        />
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
