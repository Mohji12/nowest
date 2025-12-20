import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { getBrochures } from '@/services/api';
import { ExternalLink, Download } from 'lucide-react';

// Import product images
import rollerBlindsImg from '@assets/stock_images/roller_blinds_modern_b7d98dd5.jpg';
import woodVenetianImg from '@assets/stock_images/wooden_venetian_blin_7e7829a6.jpg';
import verticalBlindsImg from '@assets/stock_images/vertical_blinds_pati_2902750d.jpg';
import romanBlindsImg from '@assets/stock_images/roman_blinds_luxury__00686ca9.jpg';
import shuttersImg from '@assets/stock_images/plantation_shutters__c750720c.jpg';
import motorizedBlindsImg from '@assets/stock_images/motorized_automated__4b820a60.jpg';
import cellularBlindsImg from '@assets/stock_images/pleated_honeycomb_bl_2663b2e3.jpg';

// S3 URLs
const MOTORIZED_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_automated__978f737d.jpg';
const PLEATED_PANEL_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/panel_blinds_sliding_0c1c0c07.jpg';
const VERTICAL_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp';

// Product types data
const productTypes = [
  {
    id: 'roller-blinds',
    name: 'Roller Blinds',
    image: rollerBlindsImg,
    description: 'Clean, modern lines with excellent light control and privacy.',
  },
  {
    id: 'vertical-blinds',
    name: 'Vertical Blinds',
    image: VERTICAL_BLINDS_S3_URL,
    description: 'Perfect for large windows and sliding doors with versatile light control.',
  },
  {
    id: 'vision-blinds',
    name: 'Vision® Blinds',
    image: '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
    description: 'Innovative fabric technology offering privacy with an unobstructed view.',
  },
  {
    id: 'allusion-blinds',
    name: 'Allusion® Blinds',
    image: '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
    description: 'A combination of sheer and opaque textured fabric for elegant light control.',
  },
  {
    id: 'cellular-pleated-blinds',
    name: 'Cellular and Pleated Blinds',
    image: cellularBlindsImg,
    description: 'Energy-efficient honeycomb design providing excellent insulation and light control.',
  },
  {
    id: 'panel-blinds',
    name: 'Panel Blinds',
    image: PLEATED_PANEL_BLINDS_S3_URL,
    description: 'Modern sliding panels perfect for large windows and contemporary spaces.',
  },
  {
    id: 'perfect-fit-blinds',
    name: 'Perfect Fit® Blinds',
    image: '/assets/brochures/NowestImages/perfect/Landscape-PF3.jpg.webp',
    description: 'No drilling required - fits perfectly inside your window frame.',
  },
  {
    id: 'conservatory-blinds',
    name: 'Conservatory Blinds',
    image: rollerBlindsImg,
    description: 'Specialized blinds designed for conservatories and sunrooms.',
  },
  {
    id: 'motorised-blinds',
    name: 'Motorised Blinds',
    image: MOTORIZED_BLINDS_S3_URL,
    description: 'Automated blinds for ultimate convenience and smart home integration.',
  },
  {
    id: 'venetian-blinds',
    name: 'Venetian Blinds',
    image: woodVenetianImg,
    description: 'Classic horizontal slats available in wood, aluminum, and faux wood finishes.',
  },
  {
    id: 'urban-shutters',
    name: 'Urban Shutters by Louvolite',
    image: shuttersImg,
    description: 'Contemporary shutters with a sleek, modern design perfect for urban homes.',
  },
  {
    id: 'precision-roller-blind',
    name: 'Precision Roller Blind by Louvolite',
    image: rollerBlindsImg,
    description: 'Premium roller blinds with precision engineering and superior quality.',
  },
  {
    id: 'romashade',
    name: 'RomaShade® by Louvolite',
    image: romanBlindsImg,
    description: 'Elegant Roman-style blinds with smooth, cascading folds.',
  },
  {
    id: 'perfect-fit-shutters-lite',
    name: 'Perfect Fit Shutters Lite',
    image: shuttersImg,
    description: 'Lightweight shutters that fit perfectly without drilling.',
  },
];

export default function ProductTypes() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'blinds' | 'brochures'>('blinds');

  // Fetch brochures data
  const { data: brochuresData, isLoading: brochuresLoading, error: brochuresError } = useQuery({
    queryKey: ['brochures'],
    queryFn: getBrochures,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Process brochures data
  const brochures = brochuresData?.map((item: any) => ({
    id: item.id?.toString() || Math.random().toString(),
    title: item.title || 'Untitled Brochure',
    subtitle: item.subtitle || item.category || 'Product Brochure',
    description: item.description || 'Download our brochure for more information',
    category: item.category || 'General',
    fileUrl: item.file_url || item.pdf_path || null,
  })) || [
    // Fallback data
    {
      id: '1',
      title: 'THE COLLECTION',
      subtitle: 'Find Your Style',
      description: 'Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments.',
      category: 'Collection',
      fileUrl: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Collection2024.pdf',
      image: '/assets/brochures/NowestImages/collection/Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp'
    },
    {
      id: '2',
      title: 'ALLUSION®',
      subtitle: 'Allusion Blinds',
      description: 'A combination of sheer and opaque textured fabric for our most elegant blind yet.',
      category: 'Blinds',
      fileUrl: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Allusion.pdf',
      image: '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp'
    },
    {
      id: '3',
      title: 'PERFECT FIT®',
      subtitle: 'Perfect Fit Blinds',
      description: 'Choose innovative Perfect Fit to complement your roller, vision and pleated/cellular blinds.',
      category: 'Blinds',
      fileUrl: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Collection2024.pdf',
      image: '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp'
    },
    {
      id: '4',
      title: 'MOTORISED',
      subtitle: 'Motorised Blinds',
      description: 'Automated blinds for modern homes offering centralized control and energy management.',
      category: 'Blinds',
      fileUrl: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Commercial2024.pdf',
      image: '/assets/brochures/NowestImages/roller/Landscape_Petal_White_Liv-1024x731.jpg.webp'
    },
  ];

  const handleCardClick = (productTypeId: string) => {
    setLocation(`/products/${productTypeId}`);
  };

  const handleViewOnline = (brochure: any) => {
    const pdfUrl = brochure.fileUrl || brochure.pdf_path;
    if (pdfUrl) {
      let finalUrl = pdfUrl;
      if (!finalUrl.startsWith('http')) {
        if (finalUrl.startsWith('/')) {
          finalUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com${finalUrl}`;
        } else {
          finalUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/${finalUrl}`;
        }
      }
      window.open(finalUrl, '_blank');
    }
  };

  const handleDownloadPDF = (brochure: any) => {
    const pdfUrl = brochure.fileUrl || brochure.pdf_path;
    if (pdfUrl) {
      let finalUrl = pdfUrl;
      if (!finalUrl.startsWith('http')) {
        if (finalUrl.startsWith('/')) {
          finalUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com${finalUrl}`;
        } else {
          finalUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/${finalUrl}`;
        }
      }
      
      const link = document.createElement('a');
      link.href = finalUrl;
      link.download = `${brochure.title || 'brochure'}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Helper function to get unique brochure image
  const getBrochureImage = (brochure: any, index: number): string => {
    if (brochure.image) return brochure.image;
    
    const brochureImages = [
      '/assets/brochures/NowestImages/collection/Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp',
      '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
      '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp',
      '/assets/brochures/NowestImages/roller/Landscape_Petal_White_Liv-1024x731.jpg.webp',
    ];
    
    return brochureImages[index % brochureImages.length];
  };

  // Background image path - using portfolio image from S3
  const productImage = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp';

  return (
    <div>
      {/* Header section with background image - Full width */}
      <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '400px' }}>
        {/* Background image */}
        <img
          src={productImage}
          alt="Products background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '400px', width: '100%' }}
          onError={(e) => {
            console.error('Product image failed to load:', productImage);
            e.currentTarget.src = '/assets/LOGO PNG.png';
            e.currentTarget.className = 'absolute inset-0 w-full h-full object-contain z-0 p-8';
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        
        {/* Content overlay - Centered with max-width */}
        <div className="relative z-20 py-12 sm:py-16 md:py-20 px-4 max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
            />
          </div>
          
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            FIND YOUR PERFECT
          </p>
          
          <p className="text-white text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4 drop-shadow-md">
            Our outstanding collection showcases a diverse range of colours and over 100 unique prints.
            With so much variety, there's something for everyone!
          </p>
        </div>
      </div>

      {/* Products Content Section */}
      <div className="py-16 sm:py-20 md:py-24 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

        {/* Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 px-2 sm:px-4">
          <div className="bg-gray-100 rounded-lg p-0.5 sm:p-1 flex w-full max-w-md">
            <button
              onClick={() => setActiveTab('blinds')}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'blinds'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-black'
              }`}
            >
              Blinds
            </button>
            <button
              onClick={() => setActiveTab('brochures')}
              className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-sm sm:text-base ${
                activeTab === 'brochures'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-transparent text-gray-600 hover:text-black'
              }`}
            >
              Brochures
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'blinds' ? (
          /* Product Types Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {productTypes.map((productType) => (
            <div
              key={productType.id}
              onClick={() => handleCardClick(productType.id)}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              {/* Image Section */}
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100 relative">
                <img
                  src={productType.image}
                  alt={productType.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('LOGO PNG')) {
                      target.src = '/assets/LOGO PNG.png';
                      target.className = 'w-full h-full object-contain p-4';
                    }
                  }}
                />
              </div>
              
              {/* Content Section */}
              <div className="p-4 sm:p-6">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-golden-orange transition-colors">
                  {productType.name}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {productType.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        ) : (
          /* Brochures Section */
          <div className="max-w-6xl mx-auto">
            {brochuresLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
                {brochures.map((brochure, index) => {
                  const brochureImage = getBrochureImage(brochure, index);
                  
                  return (
                    <div 
                      key={brochure.id} 
                      className="relative group"
                      style={{
                        border: '1px solid #FF6B35',
                        borderRadius: '4px',
                        overflow: 'visible',
                        background: 'linear-gradient(to bottom, #3a3a3a 0%, #d4d4d4 100%)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '16px',
                      }}
                    >
                      {/* Brochure Image Container with tilt effect */}
                      <div 
                        className="relative mb-4"
                        style={{
                          transform: 'rotate(-3deg)',
                          transformOrigin: 'center center',
                          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                        }}
                      >
                        <div 
                          className="relative bg-white rounded-sm overflow-hidden"
                          style={{
                            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <img
                            src={brochureImage}
                            alt={brochure.title || 'Brochure'}
                            className="w-full h-auto object-cover"
                            style={{
                              aspectRatio: '3/4',
                              display: 'block',
                            }}
                            onError={(e) => {
                              e.currentTarget.src = '/assets/LOGO PNG.png';
                              e.currentTarget.className = 'w-full h-auto object-contain p-8';
                              e.currentTarget.onerror = null;
                            }}
                          />
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="px-2 pb-4">
                        {/* NEW FOR 2025 - Orange text */}
                        <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: '#FF6B35', letterSpacing: '0.1em' }}>
                          NEW FOR 2025
                        </p>
                        
                        {/* Brochure Title - Dark grey, centered */}
                        <h3 className="font-serif text-base sm:text-lg font-bold mb-5 text-center" style={{ color: '#2d2d2d', lineHeight: '1.2' }}>
                          {brochure.title || brochure.subtitle || 'Untitled Brochure'}
                        </h3>
                        
                        {/* Links Section - Centered */}
                        <div className="flex items-center justify-center gap-3">
                          {/* VIEW ONLINE Link */}
                          <button
                            onClick={() => handleViewOnline(brochure)}
                            className="text-xs sm:text-sm font-medium hover:underline transition-all cursor-pointer flex items-center"
                            style={{ color: '#2d2d2d' }}
                            disabled={!brochure.fileUrl}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            VIEW ONLINE
                          </button>
                          
                          {/* Vertical divider */}
                          <div className="h-3 w-px" style={{ backgroundColor: '#9ca3af' }}></div>
                          
                          {/* DOWNLOAD PDF Link */}
                          <button
                            onClick={() => handleDownloadPDF(brochure)}
                            className="text-xs sm:text-sm font-medium hover:underline transition-all cursor-pointer flex items-center"
                            style={{ color: '#2d2d2d' }}
                            disabled={!brochure.fileUrl}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            DOWNLOAD PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Show message if no brochures */}
            {(!brochures || brochures.length === 0) && !brochuresLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No brochures available at the moment.</p>
                <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for more information.</p>
              </div>
            )}

            {/* Show error message if API failed */}
            {brochuresError && (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg">Failed to load brochures.</p>
                <p className="text-gray-400 text-sm mt-2">Please try refreshing the page or contact support.</p>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

