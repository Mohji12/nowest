import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getBrochures } from '@/services/api';

// Import product images
import rollerBlindsImg from '@assets/stock_images/roller_blinds_modern_b7d98dd5.jpg';
import woodVenetianImg from '@assets/stock_images/wooden_venetian_blin_7e7829a6.jpg';
import romanBlindsImg from '@assets/stock_images/roman_blinds_luxury__00686ca9.jpg';
import verticalBlindsImg from '@assets/stock_images/vertical_blinds_pati_2902750d.jpg';
import curtainsImg from '@assets/stock_images/luxury_made_to_measu_6dae048d.jpg';
import blackoutImage from '@assets/generated_images/Blackout_curtains_bedroom_luxury_675bdda2.png';
import sheerImage from '@assets/generated_images/Luxury_sheer_curtains_hero_53aa2ee0.png';
import shuttersImg from '@assets/stock_images/plantation_shutters__c750720c.jpg';
import commercialCurtainsImg from '@assets/stock_images/commercial_bespoke_c_80ae7c98.jpg';
import motorizedBlindsImg from '@assets/stock_images/motorized_automated__4b820a60.jpg';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('blinds');

  // Fetch real products data from API
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch real brochures data from API
  const { data: brochuresData, isLoading: brochuresLoading, error: brochuresError } = useQuery({
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

  // Process products data and group by category
  const products = (productsData as any[])?.reduce((acc: any, item: any) => {
    const category = item.category || 'blinds';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    // Convert relative image paths to absolute S3 URLs
    const getImageUrl = (imagePath: string) => {
      if (!imagePath) return getProductImage(item.name || '', category);
      
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

    // Check multiple possible image field names
    const imageField = item.image_url || item.image || item.imageUrl || item.photo || item.photo_url;
    
    // Map product data with database images
    const productImage = getImageUrl(imageField);
    
    acc[category].push({
      id: item.id?.toString() || Math.random().toString(),
      name: item.name || 'Untitled Product',
      description: item.description || 'Premium quality product',
      image: productImage,
      price: item.price || null,
      features: item.features || [],
      category: item.category || category,
      created_at: item.created_at,
      updated_at: item.updated_at,
      status: item.status || 'active',
      specifications: item.specifications || null,
      materials: item.materials || null,
      dimensions: item.dimensions || null,
    });
    
    return acc;
  }, {}) || {};
  
  // Ensure brochures data is always available
  if (!products.brochures) {
    products.brochures = [];
  }
  
  // If no API data or brochures is empty, use fallback data
  const finalProducts = !productsData || Object.keys(products).length === 0 ? {
    blinds: [
      { 
        id: '1', 
        name: 'Roller Blinds', 
        description: 'Clean, modern lines with excellent light control and privacy. Perfect for contemporary homes and offices.', 
        image: rollerBlindsImg,
        features: ['Easy operation', 'Light control', 'Privacy protection', 'Modern design']
      },
      { 
        id: '2', 
        name: 'Venetian Blinds', 
        description: 'Classic horizontal slats for versatile light control. Available in wood, aluminum, and faux wood finishes.', 
        image: woodVenetianImg,
        features: ['Versatile light control', 'Multiple materials', 'Easy maintenance', 'Timeless style']
      },
    ],
    curtains: [
      { 
        id: '3', 
        name: 'Ready-made Curtains', 
        description: 'Beautiful designs available in standard sizes. Quick delivery and easy installation for immediate style.', 
        image: curtainsImg,
        features: ['Quick delivery', 'Standard sizes', 'Easy installation', 'Beautiful designs']
      },
      { 
        id: '4', 
        name: 'Made-to-measure', 
        description: 'Bespoke curtains tailored to your exact requirements. Perfect fit and professional finish guaranteed.', 
        image: curtainsImg,
        features: ['Perfect fit', 'Custom sizing', 'Professional finish', 'Premium materials']
      },
    ],
    commercial: [
      { 
        id: '5', 
        name: 'Commercial Motorised Blinds', 
        description: 'Automated blinds for commercial buildings offering centralized control and energy management. Perfect for smart buildings and modern offices.', 
        image: motorizedBlindsImg,
        features: ['Centralized control', 'Energy management', 'Smart building ready', 'Professional automation']
      },
      { 
        id: '6', 
        name: 'Bespoke Curtains and Voiles', 
        description: 'Premium commercial-grade curtains and voiles designed for hotels, offices, and professional environments. Durable fabrics with fire-retardant options and professional installation.', 
        image: commercialCurtainsImg,
        features: ['Fire-retardant options', 'Hotel & office grade', 'Professional installation', 'Durable fabrics']
      },
      { 
        id: '7', 
        name: 'Commercial Roller Blinds', 
        description: 'Heavy-duty roller blinds suitable for schools, offices, and commercial spaces. Available with blackout and light-filtering options, designed for high-traffic environments.', 
        image: rollerBlindsImg,
        features: ['Heavy-duty mechanisms', 'Schools & offices', 'Blackout options', 'High-traffic durability']
      },
    ],
    brochures: [
      { 
        id: '8', 
        name: 'Allusion2024', 
        subtitle: 'Allusion Curtains',
        description: 'Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments. View them directly in your browser or download for later reference.', 
        image: getUniqueBrochureImage('8', 0),
        features: ['Complete range', 'Download available', 'Professional design', 'Latest collection'],
        pdf_path: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Allusion.pdf'
      },
      { 
        id: '9', 
        name: 'Newest Interior Collection 2024', 
        subtitle: 'Complete Range',
        description: 'Inspiration & Stylish Solutions for Your Windows. Discover our complete range of blinds and curtains including rollers, verticals, romans, and motorised solutions.', 
        image: getUniqueBrochureImage('9', 1),
        features: ['Stylish solutions', 'Complete range', 'Motorised options', 'Professional inspiration'],
        pdf_path: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Collection2024.pdf'
      },
      { 
        id: '10', 
        name: 'Commercial Solutions 2024', 
        subtitle: 'Professional Window Treatments',
        description: 'Professional window treatments for offices and businesses. Complete range of commercial blinds, curtains, and automated solutions.', 
        image: getUniqueBrochureImage('10', 2),
        features: ['Professional solutions', 'Commercial grade', 'Automated options', 'Business focused'],
        pdf_path: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Commercial2024.pdf'
      },
    ],
  } : products;


  // Helper function to get product image based on name and category
  function getProductImage(name: string, category: string): string {
    const nameKey = name.toLowerCase();
    const categoryKey = category.toLowerCase();
    
    if (nameKey.includes('roller')) return rollerBlindsImg;
    if (nameKey.includes('venetian')) return woodVenetianImg;
    if (nameKey.includes('roman')) return romanBlindsImg;
    if (nameKey.includes('vertical')) return verticalBlindsImg;
    if (nameKey.includes('curtain') || nameKey.includes('drape')) return curtainsImg;
    if (nameKey.includes('sheer') || nameKey.includes('voile')) return sheerImage;
    if (nameKey.includes('blackout')) return blackoutImage;
    if (nameKey.includes('shutter')) return shuttersImg;
    if (categoryKey.includes('commercial')) return commercialCurtainsImg;
    if (nameKey.includes('motorized') || nameKey.includes('automated')) return motorizedBlindsImg;
    
    return rollerBlindsImg; // Default fallback
  }

  // Helper function to get unique brochure image
  function getUniqueBrochureImage(brochureId: string, brochureIndex: number): string {
    // Array of available stock images
    const stockImages = [
      'roller_blinds_modern_b7d98dd5.jpg',
      'wooden_venetian_blin_7e7829a6.jpg',
      'roman_blinds_luxury__00686ca9.jpg',
      'vertical_blinds_pati_2902750d.jpg',
      'luxury_made_to_measu_6dae048d.jpg',
      'plantation_shutters__c750720c.jpg',
      'commercial_bespoke_c_80ae7c98.jpg',
      'motorized_automated__4b820a60.jpg',
      'blackout_curtains_be_8665d0b1.jpg',
      'sheer_voile_curtains_0d38b589.jpg',
      'velvet_curtains_rich_182d7870.jpg',
      'silk_curtains_luxury_7a06336f.jpg',
      'luxury_roman_blinds__842e30a5.jpg',
      'commercial_motorized_1ba2a261.jpg',
      'pleated_honeycomb_bl_2663b2e3.jpg',
      'metal_venetian_blind_11b45db2.jpg',
      'layered_curtains_she_0428ff9d.jpg',
      'curtain_hardware_bra_0704bedf.jpg',
      'luxury_fabric_swatch_3d571f00.jpg',
      'professional_install_712bd200.jpg'
    ];

    // Use brochure index to ensure each brochure gets a unique image
    // If we have more brochures than images, cycle through them
    const index = brochureIndex % stockImages.length;
    return `/assets/stock_images/${stockImages[index]}`;
  }

  if (isLoading) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* OUR COLLECTION - Small uppercase text */}
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: '#B8860B' }}>
              OUR COLLECTION
            </p>
            
            {/* Luxury Curtains & Blinds - Large serif heading */}
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-black">
              Luxury Curtains & Blinds
            </h1>
            
            {/* Loading text */}
            <p className="text-gray-600 text-lg">
              Loading our collection...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback data if there's an error but still render the products
  if (error && !productsData) {
    console.warn('Products API failed, showing fallback data');
  }


  return (
    <div className="py-16 sm:py-20 md:py-24 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
            />
          </div>
          {/* OUR COLLECTION - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            OUR COLLECTION
          </p>
          
          {/* Luxury Curtains & Blinds - Large serif heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black px-2">
            Luxury Curtains & Blinds
          </h1>
          
          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Discover our comprehensive range of bespoke window treatments, from traditional curtains to modern automated blinds, crafted with precision and style
          </p>
          
          {error && !productsData && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-yellow-700">
                Showing sample products. Real data will load when connection is restored.
              </p>
            </div>
          )}
          
        </div>

        {/* Category Buttons - Mobile Optimized */}
        <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
          <div className="bg-gray-100 rounded-lg p-0.5 sm:p-1 flex w-full max-w-2xl overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 min-w-0 px-2 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap ${
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

            {/* Content based on selected category */}
            {selectedCategory === 'brochures' ? (
              /* Brochures Section - Mobile Optimized */
              <div className="max-w-6xl mx-auto">
                {/* Brochures Heading */}
                <div className="text-center mb-8 sm:mb-12">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black px-2">
                    Product Brochures
                  </h1>
                  <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto px-4">
                    Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments. View them directly in your browser or download for later reference.
                  </p>
                </div>

                {/* Brochures Grid - Mobile Optimized */}
                {brochuresLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {(brochuresData && brochuresData.length > 0 ? brochuresData : finalProducts.brochures || []).map((brochure: any, index: number) => (
                      <div key={brochure.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        {/* Image Section */}
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={getUniqueBrochureImage(brochure.id?.toString() || '1', index)}
                            alt={brochure.title || brochure.name || 'Brochure'}
                            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        
                        {/* Content Section - Mobile Optimized */}
                        <div className="p-4 sm:p-6 md:p-8">
                          {/* Document Icon */}
                          <div className="flex items-start justify-between mb-4 sm:mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        
                        {/* Title and Subtitle */}
                        <div className="mb-4 sm:mb-6">
                          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                            {brochure.title || brochure.name || 'Untitled Brochure'}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {brochure.subtitle || brochure.category || 'Product Brochure'}
                          </p>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                          {brochure.description || 'Download our brochure for more information about our products and services.'}
                        </p>
                        
                          {/* View PDF Button - Mobile Optimized */}
                          <button 
                            className="w-full bg-golden-orange hover:bg-golden-orange/90 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm sm:text-base md:text-lg"
                            onClick={() => {
                              // Use pdf_path if available, otherwise fall back to file_url
                              const pdfUrlField = brochure.pdf_path || brochure.file_url;
                              
                              if (pdfUrlField) {
                                // Convert relative paths to S3 URLs if needed
                                let pdfUrl = pdfUrlField;
                                
                                // If it's a relative path, convert to S3 URL
                                if (!pdfUrl.startsWith('http')) {
                                  if (pdfUrl.startsWith('/')) {
                                    pdfUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com${pdfUrl}`;
                                  } else {
                                    pdfUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/${pdfUrl}`;
                                  }
                                }
                                
                                // Try to open the PDF
                                const newWindow = window.open(pdfUrl, '_blank');
                                
                                if (!newWindow) {
                                  // Fallback: try to download the PDF
                                  const link = document.createElement('a');
                                  link.href = pdfUrl;
                                  link.download = `${brochure.title || 'brochure'}.pdf`;
                                  link.target = '_blank';
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }
                              } else {
                                alert('PDF file not available for this brochure');
                              }
                            }}
                          >
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View PDF
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Show fallback message if no brochures */}
                    {(!brochuresData || brochuresData.length === 0) && (!finalProducts.brochures || finalProducts.brochures.length === 0) && (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No brochures available at the moment.</p>
                        <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for more information.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Show error message if brochures failed to load */}
                {brochuresError && (
                  <div className="text-center py-12">
                    <p className="text-red-500 text-lg">Failed to load brochures.</p>
                    <p className="text-gray-400 text-sm mt-2">Please try refreshing the page or contact support.</p>
                  </div>
                )}
              </div>
            ) : selectedCategory === 'commercial' ? (
              /* Commercial Products Grid - Mobile Optimized */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {(finalProducts[selectedCategory] || []).map((product: any) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Image Section */}
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    {/* Content Section - Mobile Optimized */}
                    <div className="p-4 sm:p-6">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {product.name}
                      </h3>
                      
                      {product.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                          {product.description}
                        </p>
                      )}
                      
                      {/* Features List */}
                      {product.features && product.features.length > 0 && (
                        <ul className="space-y-1 sm:space-y-2">
                          {product.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start text-xs sm:text-sm text-gray-600">
                              <span className="text-gray-400 mr-2 mt-0.5">›</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {/* Price if available */}
                      {product.price && (
                        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                          <p className="text-base sm:text-lg font-bold text-gray-900">
                            £{product.price}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
        ) : (
          /* Regular Products Grid for Blinds and Curtains - Mobile Optimized */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {(finalProducts[selectedCategory] || []).map((product: any) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image Section */}
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                  />
                </div>
                
                {/* Content Section - Mobile Optimized */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                      {product.description}
                    </p>
                  )}
                  
                  {/* Features List */}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-1 sm:space-y-2">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <span className="text-gray-400 mr-2 mt-0.5">›</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Price if available */}
                  {product.price && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        £{product.price}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
