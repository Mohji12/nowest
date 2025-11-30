import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getAdminProducts, createAdminProduct, updateAdminProduct, deleteAdminProduct } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function AdminProducts() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image_url: '',
    features: ''
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch products from API
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['admin-products'],
    queryFn: getAdminProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Type assertion for products array and process images
  const productsArray = (products as any[]).map((product: any) => {
    // Convert relative image paths to absolute S3 URLs
    const getImageUrl = (imagePath: string) => {
      if (!imagePath) return '/api/placeholder/400/300';
      
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
    const imageField = product.image_url || product.image || product.imageUrl || product.photo || product.photo_url;
    const processedImageUrl = getImageUrl(imageField);

    // Debug logging for image URLs
    if (imageField) {
      console.log(`Admin Product "${product.name}" image field:`, imageField);
      console.log(`Converted to S3 URL:`, processedImageUrl);
    } else {
      console.log(`Admin Product "${product.name}" has no image field, using placeholder`);
    }

    return {
      ...product,
      processedImageUrl
    };
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProduct = async () => {
    try {
      // Process features from comma-separated string to array
      const featuresArray = formData.features
        ? formData.features.split(',').map(f => f.trim()).filter(f => f)
        : [];

      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image: formData.image_url, // Map image_url to image for backend
        features: featuresArray,
        status: 'active'
      };

      if (editingProduct) {
        console.log('Updating product:', editingProduct.id, productData);
        await updateAdminProduct(editingProduct.id, productData);
        toast({
          title: 'Product Updated',
          description: 'Product has been successfully updated.',
        });
      } else {
        console.log('Creating product:', productData);
        await createAdminProduct(productData);
        toast({
          title: 'Product Created',
          description: 'Product has been successfully created.',
        });
      }
      
      resetForm();
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save product. Please try again.',
        type: 'error',
      });
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      description: product.description || '',
      image_url: product.image || product.image_url || '', // Map image to image_url for form
      features: product.features ? product.features.join(', ') : ''
    });
    setIsCreateModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteAdminProduct(productId);
        
        toast({
          title: 'Product Deleted',
          description: 'Product has been successfully deleted.',
        });
        
        queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete product. Please try again.',
          type: 'error',
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', description: '', image_url: '', features: '' });
    setEditingProduct(null);
    setIsCreateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Products</h1>
            <p className="text-lg text-gray-600">Manage your product catalog</p>
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
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="text-lg text-gray-600">Manage your product catalog</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-golden-orange hover:bg-golden-orange/90 text-white"
              onClick={() => resetForm()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Create Product'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingProduct ? 'Update product information' : 'Add a new product to your catalog'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4 max-w-full">
              {/* Name and Category Fields - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-900">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Wood Venetian Blinds"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange w-full"
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
                      <SelectItem value="blinds">Blinds</SelectItem>
                      <SelectItem value="curtains">Curtains</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="shutters">Shutters</SelectItem>
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
                  placeholder="Product description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange min-h-[100px] resize-y"
                />
              </div>

              {/* Image URL and Features Fields - Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Image URL Field */}
                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-sm font-medium text-gray-900">
                    Image URL (optional)
                  </Label>
                  <Input
                    id="image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange w-full"
                  />
                </div>

                {/* Features Field */}
                <div className="space-y-2">
                  <Label htmlFor="features" className="text-sm font-medium text-gray-900">
                    Features (comma-separated, optional)
                  </Label>
                  <Textarea
                    id="features"
                    placeholder="Feature 1, Feature 2, Feature 3"
                    value={formData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    className="border-gray-300 focus:border-golden-orange focus:ring-golden-orange min-h-[80px] resize-y w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button 
                onClick={handleCreateProduct}
                className="bg-golden-orange hover:bg-golden-orange/90 text-white"
              >
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Grid */}
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load products.</p>
          <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsArray.map((product: any) => (
            <Card key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={product.processedImageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/400/300';
                    }}
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  {/* Product Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  {/* Category - Plain text, not badge */}
                  <p className="text-sm text-gray-500 mb-4 capitalize">
                    {product.category}
                  </p>
                  
                  {/* Product Description */}
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
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
          {productsArray.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found.</p>
              <p className="text-gray-400 text-sm mt-2">Create your first product to get started.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
