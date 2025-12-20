import { useQuery } from '@tanstack/react-query';
import { getBrochures } from '@/services/api';

export default function Brochures() {
  // Fetch real brochures data from API
  const { data: brochuresData, isLoading, error } = useQuery({
    queryKey: ['brochures'],
    queryFn: getBrochures,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Process brochures data
  const brochures = (brochuresData && Array.isArray(brochuresData) ? brochuresData : []).map((item: any) => ({
    id: item.id?.toString() || Math.random().toString(),
    title: item.title || 'Untitled Brochure',
    subtitle: item.subtitle || item.category || 'Product Brochure',
    description: item.description || 'Download our brochure for more information',
    category: item.category || 'General',
    fileSize: item.file_size || 'Unknown',
    fileUrl: item.file_url || item.pdf_path || null,
    downloadCount: item.download_count || 0,
    status: item.status || 'active',
    createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    updatedAt: item.updated_at ? new Date(item.updated_at).toISOString().split('T')[0] : null,
  }));

  // Use fallback data if no brochures from API
  const finalBrochures = brochures.length > 0 ? brochures : [
    // Fallback data matching the design - 4 brochures like in the image
    {
      id: '1',
      title: 'Uk_panel_brochures',
      subtitle: 'Panel Blinds Collection',
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

  const handleViewOnline = (brochure: any) => {
    const pdfUrl = brochure.fileUrl || brochure.pdf_path;
    if (pdfUrl) {
      // Convert relative paths to S3 URLs if needed
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
      // Convert relative paths to S3 URLs if needed
      let finalUrl = pdfUrl;
      if (!finalUrl.startsWith('http')) {
        if (finalUrl.startsWith('/')) {
          finalUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com${finalUrl}`;
        } else {
          finalUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/${finalUrl}`;
        }
      }
      
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = finalUrl;
      link.download = `${brochure.title || 'brochure'}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading brochures...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto object-contain"
            />
          </div>
          
          {/* BROCHURES - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 sm:mb-3 md:mb-4 px-2" style={{ color: '#B8860B' }}>
            BROCHURES
          </p>
          
          {/* Product Brochures - Large serif heading */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-black px-2">
            Product Brochures
          </h1>
          
          {/* Golden line */}
          <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 mx-auto mb-2 sm:mb-3 md:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-3xl mx-auto px-4">
            Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments.
          </p>
        </div>

        {/* Brochures Grid - Matching the image design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {finalBrochures.map((brochure: any) => {
            // Get brochure image - use from data or fallback
            const brochureImage = brochure.image || `/assets/brochures/NowestImages/collection/Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp`;
            
            return (
              <div 
                key={brochure.id} 
                className="relative group flex flex-col"
                style={{
                  border: '1px solid #FF6B35', // Orange border
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: 'linear-gradient(to bottom, #3a3a3a 0%, #d4d4d4 100%)', // Dark grey to light grey gradient
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
                  padding: '16px',
                  minHeight: '100%',
                }}
              >
                {/* Brochure Image Container with tilt effect and shadow */}
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
                <div className="px-2 pb-4 min-h-[100px] flex flex-col">
                  {/* Brochure Title - Dark grey, centered with proper text handling */}
                  <h3 
                    className="font-serif text-sm sm:text-base font-bold mb-5 text-center break-words line-clamp-3 mt-2" 
                    style={{ 
                      color: '#2d2d2d', 
                      lineHeight: '1.3',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere',
                      hyphens: 'auto'
                    }}
                    title={brochure.title || brochure.subtitle || 'Untitled Brochure'}
                  >
                    {brochure.title || brochure.subtitle || 'Untitled Brochure'}
                  </h3>
                  
                  {/* Links Section - Centered */}
                  <div className="flex items-center justify-center gap-3">
                    {/* VIEW ONLINE Link */}
                    <button
                      onClick={() => handleViewOnline(brochure)}
                      className="text-xs sm:text-sm font-medium hover:underline transition-all cursor-pointer"
                      style={{ color: '#2d2d2d' }}
                      disabled={!brochure.fileUrl}
                    >
                      VIEW ONLINE
                    </button>
                    
                    {/* Vertical divider */}
                    <div className="h-3 w-px" style={{ backgroundColor: '#9ca3af' }}></div>
                    
                    {/* DOWNLOAD PDF Link */}
                    <button
                      onClick={() => handleDownloadPDF(brochure)}
                      className="text-xs sm:text-sm font-medium hover:underline transition-all cursor-pointer"
                      style={{ color: '#2d2d2d' }}
                      disabled={!brochure.fileUrl}
                    >
                      DOWNLOAD PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show message if no brochures */}
        {(!finalBrochures || finalBrochures.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No brochures available at the moment.</p>
            <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for more information.</p>
          </div>
        )}

        {/* Show error message if API failed */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">Failed to load brochures.</p>
            <p className="text-gray-400 text-sm mt-2">Please try refreshing the page or contact support.</p>
          </div>
        )}
      </div>
    </div>
  );
}
