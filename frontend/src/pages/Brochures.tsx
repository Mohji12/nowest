import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { getBrochures } from '@/services/api';
import { Download, FileText, ExternalLink } from 'lucide-react';

export default function Brochures() {
  const [selectedCategory, setSelectedCategory] = useState('brochures');

  // Fetch real brochures data from API
  const { data: brochuresData, isLoading, error } = useQuery({
    queryKey: ['brochures'],
    queryFn: getBrochures,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const categories = [
    { id: 'blinds', label: 'Blinds' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'brochures', label: 'Brochures' },
  ];

  // Process brochures data
  const brochures = brochuresData?.map((item: any) => ({
    id: item.id?.toString() || Math.random().toString(),
    title: item.title || 'Untitled Brochure',
    subtitle: item.subtitle || item.category || 'Product Brochure',
    description: item.description || 'Download our brochure for more information',
    category: item.category || 'General',
    fileSize: item.file_size || 'Unknown',
    fileUrl: item.file_url || null,
    downloadCount: item.download_count || 0,
    status: item.status || 'active',
    createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    updatedAt: item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : null,
  })) || [
    // Fallback data if API fails - matching the image design
    {
      id: '1',
      title: 'Allusion2024',
      subtitle: 'Allusion Curtains',
      description: 'Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments. View them directly in your browser or download for later reference.',
      category: 'Curtains',
      fileSize: '2.5 MB',
      fileUrl: '/sample-brochure.pdf',
      downloadCount: 156,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: null,
    },
    {
      id: '2',
      title: 'Newest Interior Collection 2024',
      subtitle: 'Complete Range',
      description: 'Inspiration & Stylish Solutions for Your Windows. Discover our complete range of blinds and curtains including rollers, verticals, romans, and motorised solutions.',
      category: 'Products',
      fileSize: '3.2 MB',
      fileUrl: '/style-guide.pdf',
      downloadCount: 89,
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: null,
    },
    {
      id: '3',
      title: 'Commercial Solutions 2024',
      subtitle: 'Professional Window Treatments',
      description: 'Professional window treatments for offices and businesses. Complete range of commercial blinds, curtains, and automated solutions.',
      category: 'Commercial',
      fileSize: '2.8 MB',
      fileUrl: '/commercial-brochure.pdf',
      downloadCount: 45,
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: null,
    },
  ];

  const handleDownload = (brochure: any) => {
    if (brochure.fileUrl) {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = brochure.fileUrl;
      link.download = `${brochure.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePreview = (brochure: any) => {
    if (brochure.fileUrl) {
      window.open(brochure.fileUrl, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex w-full max-w-2xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex-1 px-8 py-4 rounded-md font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-transparent text-gray-600 hover:text-black'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-16">
            {/* Product Brochures - Large serif heading */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-black">
              Product Brochures
            </h1>
            
            {/* Loading text */}
            <p className="text-gray-600 text-lg">
              Loading brochures...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Our Brochures
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unable to load brochures. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 px-4">
          <div className="bg-gray-100 rounded-lg p-1 flex w-full max-w-2xl">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-transparent text-gray-600 hover:text-black'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          {/* Product Brochures - Large serif heading */}
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-black">
            Product Brochures
          </h1>
          
          {/* Description */}
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments. View them directly in your browser or download for later reference.
          </p>
          
          {error && !brochuresData && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-yellow-700">
                Showing sample brochures. Real data will load when connection is restored.
              </p>
            </div>
          )}
        </div>

        {/* Brochures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brochures.map((brochure) => (
            <div key={brochure.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              {/* Document Icon */}
              <div className="flex items-start justify-between mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              
              {/* Title and Subtitle */}
              <div className="mb-4">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                  {brochure.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {brochure.subtitle}
                </p>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {brochure.description}
              </p>
              
              {/* View PDF Button */}
              <Button 
                onClick={() => handleDownload(brochure)}
                className="w-full bg-golden-orange hover:bg-golden-orange/90 text-white font-medium"
                disabled={!brochure.fileUrl}
              >
                <FileText className="h-4 w-4 mr-2" />
                View PDF
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
