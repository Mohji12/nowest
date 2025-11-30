import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getAdminPortfolio, createAdminPortfolioItem, updateAdminPortfolioItem, deleteAdminPortfolioItem } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function AdminPortfolio() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image_url: '',
    location: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch portfolio from API
  const { data: portfolio = [], isLoading, error } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: getAdminPortfolio,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Type assertion for portfolio array and process images
  const portfolioArray = (portfolio as any[]).map((item: any) => {
    // Convert relative image paths to absolute S3 URLs
    const getImageUrl = (imagePath: string) => {
      if (!imagePath) {
        return '/api/placeholder/400/300';
      }
      
      // If it's already a full URL (S3 or any other), return as is
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      
      // If it's a relative path, convert to S3 URL
      if (imagePath.startsWith('/')) {
        // Remove leading slash and construct S3 URL
        const cleanPath = imagePath.substring(1);
        const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${cleanPath}`;
        return s3Url;
      }
      
      // If it's a relative path without leading slash, add it
      const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${imagePath}`;
      return s3Url;
    };

    // Check multiple possible image field names and convert to S3 URL
    const imageField = item.image || item.image_url || item.imageUrl || item.photo || item.photo_url;
    const processedImageUrl = getImageUrl(imageField);

    return {
      ...item,
      processedImageUrl
    };
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreatePortfolio = async () => {
    try {
      const portfolioData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        image: formData.image_url, // Map image_url to image for backend
        location: formData.location,
        status: 'active'
      };

      if (editingPortfolio) {
        await updateAdminPortfolioItem(editingPortfolio.id, portfolioData);
        toast({
          title: 'Portfolio Updated',
          description: 'Portfolio item has been successfully updated.',
        });
      } else {
        await createAdminPortfolioItem(portfolioData);
        toast({
          title: 'Portfolio Created',
          description: 'Portfolio item has been successfully created.',
        });
      }
      
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save portfolio item. Please try again.',
        type: 'error',
      });
    }
  };

  const handleEditPortfolio = (portfolio: any) => {
    setEditingPortfolio(portfolio);
    setFormData({
      title: portfolio.title || '',
      category: portfolio.category || '',
      description: portfolio.description || '',
      image_url: portfolio.image || portfolio.image_url || '', // Map image to image_url for form
      location: portfolio.location || ''
    });
    setIsCreateModalOpen(true);
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio item?')) {
      try {
        await deleteAdminPortfolioItem(portfolioId);
        
        toast({
          title: 'Portfolio Deleted',
          description: 'Portfolio item has been successfully deleted.',
        });
        
        queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete portfolio item. Please try again.',
          type: 'error',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: '', description: '', image_url: '', location: '' });
    setEditingPortfolio(null);
    setIsCreateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Portfolio</h1>
            <p className="text-lg text-gray-600">Manage your project portfolio</p>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-lg text-gray-600">Manage your project portfolio</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-golden-orange hover:bg-golden-orange/90 text-white"
              onClick={() => resetForm()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingPortfolio ? 'Edit Portfolio Item' : 'Create Portfolio Item'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingPortfolio ? 'Update portfolio item information' : 'Add a new project to your portfolio'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4 max-w-full">
              {/* Title and Category Fields - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-900">
                    Project Title
                  </Label>
                  <input
                    id="title"
                    placeholder="Luxury Living Room Project"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                  />
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-900">
                    Category
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Project description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange min-h-[100px] resize-y"
                />
              </div>

              {/* Image URL Field */}
              <div className="space-y-2">
                <Label htmlFor="image_url" className="text-sm font-medium text-gray-900">
                  Image URL (optional)
                </Label>
                <input
                  id="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                />
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-900">
                  Location (optional)
                </Label>
                <input
                  id="location"
                  placeholder="London, UK"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreatePortfolio}
                className="bg-golden-orange hover:bg-golden-orange/90 text-white"
              >
                {editingPortfolio ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid */}
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load portfolio items.</p>
          <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <p className="text-sm text-red-700 font-medium">Error Details:</p>
            <p className="text-xs text-red-600 mt-1">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
            <p className="text-xs text-red-500 mt-2">
              This might be due to authentication issues. Make sure you're logged in as an admin.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioArray.map((item: any) => (
            <Card key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-0">
                {/* Portfolio Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={item.processedImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                </div>
                
                {/* Portfolio Info */}
                <div className="p-6">
                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  
                  {/* Category - Plain text, not badge */}
                  <p className="text-sm text-gray-500 mb-4 capitalize">
                    {item.category}
                  </p>
                  
                  {/* Project Description */}
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPortfolio(item)}
                      className="flex-1 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="flex-1 h-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty State */}
          {portfolioArray.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No portfolio items found.</p>
              <p className="text-gray-400 text-sm mt-2">Create your first portfolio item to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
