import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, ExternalLink, FileText } from 'lucide-react';
import { getAdminBrochures, createAdminBrochure, updateAdminBrochure, deleteAdminBrochure } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function AdminBrochures() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBrochure, setEditingBrochure] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdf_path: '',
    image: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch brochures from API
  const { data: brochures = [], isLoading, error } = useQuery({
    queryKey: ['admin-brochures'],
    queryFn: getAdminBrochures,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Process brochures - backend already converts URLs to full S3 URLs
  const brochuresArray = (brochures as any[]).map((brochure: any) => {
    // Backend already converts PDF and image paths to full S3 URLs
    const processedPdfUrl = brochure.pdf_path || '';
    const processedImageUrl = brochure.image || 'https://via.placeholder.com/400x500?text=No+Image';

    return {
      ...brochure,
      processedPdfUrl,
      processedImageUrl
    };
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateBrochure = async () => {
    console.log('handleCreateBrochure called!');
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    try {
      setIsSubmitting(true);
      
      // Validate required fields
      if (!formData.title.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a brochure title.',
          type: 'error',
        });
        return;
      }

      if (!formData.description.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a brochure description.',
          type: 'error',
        });
        return;
      }

      if (!formData.pdf_path.trim()) {
        toast({
          title: 'Validation Error',
          description: 'Please enter a PDF path or URL.',
          type: 'error',
        });
        return;
      }

      const brochureData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        pdf_path: formData.pdf_path.trim(),
        image: formData.image.trim() || null
      };

      console.log('Creating brochure with data:', brochureData);

      if (editingBrochure) {
        console.log('Updating brochure:', editingBrochure.id, brochureData);
        await updateAdminBrochure(editingBrochure.id, brochureData);
        toast({
          title: 'Brochure Updated',
          description: 'Brochure has been successfully updated.',
        });
      } else {
        console.log('Creating new brochure:', brochureData);
        await createAdminBrochure(brochureData);
        toast({
          title: 'Brochure Created',
          description: 'Brochure has been successfully created.',
        });
      }
      
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['admin-brochures'] });
    } catch (error) {
      console.error('Error creating/updating brochure:', error);
      toast({
        title: 'Error',
        description: `Failed to save brochure: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditBrochure = (brochure: any) => {
    setEditingBrochure(brochure);
    setFormData({
      title: brochure.title || '',
      description: brochure.description || '',
      pdf_path: brochure.pdf_path || '',
      image: brochure.image || ''
    });
    setIsCreateModalOpen(true);
  };

  const handleDeleteBrochure = async (brochureId: string) => {
    if (window.confirm('Are you sure you want to delete this brochure?')) {
      try {
        await deleteAdminBrochure(brochureId);
        
        toast({
          title: 'Brochure Deleted',
          description: 'Brochure has been successfully deleted.',
        });
        
        queryClient.invalidateQueries({ queryKey: ['admin-brochures'] });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete brochure. Please try again.',
          type: 'error',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', pdf_path: '', image: '' });
    setEditingBrochure(null);
    setIsCreateModalOpen(false);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Brochures</h1>
            <p className="text-lg text-gray-600">Manage product brochures</p>
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
          <h1 className="text-4xl font-bold text-gray-900">Brochures</h1>
          <p className="text-lg text-gray-600">Manage product brochures</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-golden-orange hover:bg-golden-orange/90 text-white"
              onClick={() => resetForm()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Brochure
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingBrochure ? 'Edit Brochure' : 'Create Brochure'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingBrochure ? 'Update brochure information' : 'Add a new brochure to your collection'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => { e.preventDefault(); handleCreateBrochure(); }}>
              <div className="space-y-6 py-4 max-w-full">
                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-900">
                    Brochure Title
                  </Label>
                  <input
                    id="title"
                    placeholder="Allusion2024"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                    required
                  />
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-900">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brochure description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange min-h-[100px] resize-y"
                    required
                  />
                </div>

                {/* PDF Path Field */}
                <div className="space-y-2">
                  <Label htmlFor="pdf_path" className="text-sm font-medium text-gray-900">
                    PDF Path/URL
                  </Label>
                  <input
                    id="pdf_path"
                    placeholder="/brochures/brochure.pdf or https://example.com/brochure.pdf"
                    value={formData.pdf_path}
                    onChange={(e) => handleInputChange('pdf_path', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                    required
                  />
                </div>

                {/* Image URL Field */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium text-gray-900">
                    Image URL (S3 or full URL) - Optional
                  </Label>
                  <input
                    id="image"
                    placeholder="https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/Nowest_Image/..."
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-orange focus:border-golden-orange"
                  />
                  <p className="text-xs text-gray-500">
                    Use S3 image URLs from the Nowest_Image folder for brochure card images
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-golden-orange hover:bg-golden-orange/90 text-white disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : (editingBrochure ? 'Update' : 'Create')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Brochures List */}
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load brochures.</p>
          <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brochuresArray.map((brochure: any) => (
            <Card key={brochure.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Brochure Image */}
                <div className="aspect-[3/4] overflow-hidden rounded-t-lg bg-gray-100">
                  <img
                    src={brochure.processedImageUrl}
                    alt={brochure.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x500?text=No+Image';
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                
                <div className="p-6">
                  {/* Brochure Info */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {brochure.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {brochure.description}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {brochure.processedPdfUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(brochure.processedPdfUrl, '_blank')}
                        className="flex-1 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View PDF
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditBrochure(brochure)}
                      className="flex-1 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBrochure(brochure.id)}
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
          {brochuresArray.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No brochures found.</p>
              <p className="text-gray-400 text-sm mt-2">Create your first brochure to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
