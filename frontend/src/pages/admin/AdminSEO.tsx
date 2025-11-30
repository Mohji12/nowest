import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getAdminSeoByPage, upsertAdminSeo } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function AdminSEO() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    og_image_url: ''
  });

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'products', label: 'Products' },
    { id: 'contact', label: 'Contact' }
  ];


  // Fetch SEO data for the active tab
  const { data: seoData, isLoading, error } = useQuery({
    queryKey: ['admin-seo', activeTab],
    queryFn: () => getAdminSeoByPage(activeTab),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404 errors (page doesn't exist yet)
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    }
  });

  // Get sample data for each page
  const getSampleData = (page: string) => {
    const sampleData = {
      home: {
        title: 'Nowest Interior Ltd | Luxury Blinds & Curtains UK',
        description: 'Luxury blinds, curtains, and shutters handcrafted in the UK since 2002. Over 1,000 fabrics to choose from with professional fitting service.',
        keywords: 'blinds,curtains,shutters,luxury,UK,handcrafted',
        og_image_url: 'https://example.com/og-image.jpg'
      },
      about: {
        title: 'About Us | Nowest Interior Ltd',
        description: 'Learn about our 20+ years of experience in luxury window treatments. Expert craftsmanship and premium materials.',
        keywords: 'about,experience,quality,craftsmanship,window treatments',
        og_image_url: 'https://example.com/about-og-image.jpg'
      },
      portfolio: {
        title: 'Our Portfolio | Luxury Interior Projects',
        description: 'Explore our portfolio of completed luxury interior projects. From residential to commercial spaces.',
        keywords: 'portfolio,projects,luxury,interior,completed',
        og_image_url: 'https://example.com/portfolio-og-image.jpg'
      },
      products: {
        title: 'Our Products | Blinds, Curtains & Shutters',
        description: 'Discover our comprehensive range of window treatments including blinds, curtains, and shutters.',
        keywords: 'products,blinds,curtains,shutters,window treatments',
        og_image_url: 'https://example.com/products-og-image.jpg'
      },
      contact: {
        title: 'Contact Us | Nowest Interior Ltd',
        description: 'Get in touch with our expert team for personalized window treatment solutions. Free consultation available.',
        keywords: 'contact,consultation,window treatments,expert team',
        og_image_url: 'https://example.com/contact-og-image.jpg'
      }
    };
    return sampleData[page as keyof typeof sampleData] || {
      title: '',
      description: '',
      keywords: '',
      og_image_url: ''
    };
  };

  // Update form data when SEO data changes
  useEffect(() => {
    console.log(`SEO data for ${activeTab}:`, seoData);
    if (seoData) {
      const data = seoData as any;
      setFormData({
        title: data.title || '',
        description: data.description || '',
        keywords: data.keywords ? data.keywords.join(',') : '',
        og_image_url: data.og_title || '' // Using og_title as og_image_url for now
      });
    } else if (error?.status === 404) {
      // Set sample data if no real data exists (404 error)
      const sampleData = getSampleData(activeTab);
      setFormData(sampleData);
    }
  }, [seoData, activeTab, error]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Validate required fields
      if (!formData.title.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a page title.',
          type: 'error',
        });
        return;
      }

      if (!formData.description.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a meta description.',
          type: 'error',
        });
        return;
      }

      // Process keywords from comma-separated string to array
      const keywordsArray = formData.keywords
        ? formData.keywords.split(',').map(k => k.trim()).filter(k => k)
        : [];

      const seoData = {
        page: activeTab,
        title: formData.title.trim(),
        description: formData.description.trim(),
        keywords: keywordsArray,
        og_title: formData.og_image_url.trim() || null,
        og_description: formData.description.trim() // Use description as og_description
      };

      await upsertAdminSeo(seoData);
      
      toast({
        title: 'SEO Settings Saved',
        description: `${tabs.find(t => t.id === activeTab)?.label} page SEO settings have been updated.`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['admin-seo'] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save SEO settings. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageTitle = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return `${tab?.label} Page SEO`;
  };

  const getPageDescription = () => {
    return `Configure meta tags and SEO settings for this page.`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">SEO Settings</h1>
          <p className="text-lg text-gray-600">Optimize your site for search engines.</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error && error.status !== 404) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">SEO Settings</h1>
          <p className="text-lg text-gray-600">Optimize your site for search engines.</p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load SEO settings.</p>
          <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm text-red-700 font-medium">Error Details:</p>
            <p className="text-xs text-red-600 mt-1">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-lg text-gray-600">Optimize your site for search engines.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-start">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>


      {/* SEO Form Card */}
      <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h2>
              <p className="text-gray-600 mt-1">{getPageDescription()}</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Page Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-gray-900">
                  Page Title
                </Label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Nowest Interior Ltd | Luxury Blinds & Curtains UK"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                  Meta Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Luxury blinds, curtains, and shutters handcrafted in the UK since 2002. Over 1,000 fabrics to choose from with professional fitting service."
                  className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange min-h-[100px] resize-y"
                />
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-sm font-medium text-gray-900">
                  Keywords (comma-separated)
                </Label>
                <input
                  id="keywords"
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="blinds,curtains,shutters,luxury,UK,handcrafted"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                />
              </div>

              {/* OG Image URL */}
              <div className="space-y-2">
                <Label htmlFor="og_image_url" className="text-sm font-medium text-gray-900">
                  OG Image URL
                </Label>
                <input
                  id="og_image_url"
                  type="url"
                  value={formData.og_image_url}
                  onChange={(e) => handleInputChange('og_image_url', e.target.value)}
                  placeholder="https://example.com/og-image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <Button
                onClick={handleSave}
                disabled={isSubmitting}
                className="bg-golden-orange hover:bg-golden-orange/90 text-white disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
