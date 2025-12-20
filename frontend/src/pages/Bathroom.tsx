import { useLocation } from 'wouter';
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, ChevronLeft, ChevronRight, ChevronLeft as BackIcon } from 'lucide-react';
import { getPortfolio } from '@/services/api';

export default function Bathroom() {
  const [, setLocation] = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Fetch portfolio data from API
  const { data: portfolioData } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get bathroom images from portfolio API (same source as Portfolio page)
  const bathroomImages = useMemo(() => {
    // If portfolio data is available, use actual working images from portfolio
    if (portfolioData && Array.isArray(portfolioData) && portfolioData.length > 0) {
      const bathroomKeywords = ['bathroom', 'bath'];
      const allPortfolioImages = (portfolioData as any[])
        .map((item: any) => {
          const imageField = item.image || item.image_url || item.imageUrl || item.photo || item.photo_url;
          if (!imageField) return null;
          
          // Use same logic as Portfolio page
          let url = '';
          if (imageField.startsWith('http://') || imageField.startsWith('https://')) {
            url = imageField;
          } else if (imageField.startsWith('/')) {
            const cleanPath = imageField.substring(1);
            url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${cleanPath}`;
          } else {
            url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${imageField}`;
          }
          return url;
        })
        .filter((url): url is string => url !== null && url !== '' && url.startsWith('http'));

      // Filter for bathroom-related if we have enough, otherwise use all
      const bathroomFiltered = (portfolioData as any[])
        .filter((item: any) => {
          const title = (item.title || '').toLowerCase();
          const category = (item.category || '').toLowerCase();
          const description = (item.description || '').toLowerCase();
          const searchText = `${title} ${category} ${description}`;
          return bathroomKeywords.some(keyword => searchText.includes(keyword));
        })
        .map((item: any) => {
          const imageField = item.image || item.image_url || item.imageUrl || item.photo || item.photo_url;
          if (!imageField) return null;
          
          let url = '';
          if (imageField.startsWith('http://') || imageField.startsWith('https://')) {
            url = imageField;
          } else if (imageField.startsWith('/')) {
            const cleanPath = imageField.substring(1);
            url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${cleanPath}`;
          } else {
            url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${imageField}`;
          }
          return url;
        })
        .filter((url): url is string => url !== null && url !== '' && url.startsWith('http'));

      // Use bathroom-filtered if we have at least 9, otherwise use all portfolio images
      if (bathroomFiltered.length >= 9) {
        return bathroomFiltered.slice(0, 12);
      }
      
      // Use all portfolio images if we don't have enough bathroom-specific ones
      return allPortfolioImages.slice(0, 12);
    }

    // Fallback: Return empty array - will show loading state
    return [];
  }, [portfolioData]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? bathroomImages.length - 1 : selectedImageIndex - 1
      );
    } else {
      setSelectedImageIndex(
        selectedImageIndex === bathroomImages.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  // Background image for bathroom
  const bathroomBackgroundImage = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp';

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section className="relative text-center mb-8 sm:mb-12 md:mb-16 overflow-hidden w-full" style={{ minHeight: '400px' }}>
        {/* Background image */}
        <img
          src={bathroomBackgroundImage}
          alt="Bathroom background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '400px', width: '100%' }}
          onError={(e) => {
            console.error('Bathroom background image failed to load:', bathroomBackgroundImage);
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        
        {/* Content overlay */}
        <div className="relative z-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="flex justify-start mb-4 sm:mb-6">
            <button
              onClick={() => setLocation('/')}
              className="text-white hover:text-gray-200 transition-colors flex items-center bg-black/30 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm"
            >
              <BackIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Title Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <p className="text-xs sm:text-sm md:text-base font-light text-white/80 mb-1 sm:mb-2" style={{ fontFamily: 'sans-serif' }}>
              THE
            </p>
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-lg px-2"
              style={{ 
                color: '#FF8C69',
                fontFamily: 'sans-serif',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              bathroom
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 md:mb-8 drop-shadow-md px-2" style={{ fontFamily: 'sans-serif' }}>
              Your personal sanctuary for relaxation and rejuvenation.
            </p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/90 max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 leading-relaxed drop-shadow-md px-2" style={{ fontFamily: 'sans-serif' }}>
              Bathroom blinds need to be both stylish and functional, offering privacy while withstanding moisture and humidity. Our moisture-resistant fabric collection is perfect for bathroom environments, combining elegant design with practical durability. Choose from a wide range of colours and patterns to create your perfect bathroom retreat.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow-md px-2" style={{ fontFamily: 'sans-serif' }}>
              Check out our photography below for some inspiration!
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 pb-32 sm:pb-40 md:pb-48">
        <div className="max-w-7xl mx-auto">
          {bathroomImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading images...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {bathroomImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                  <img
                    src={image}
                    alt={`Bathroom inspiration ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Hide the image on error instead of showing logo
                      e.currentTarget.style.display = 'none';
                      console.error(`[Bathroom] Failed to load image: ${image}`);
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg 
                        className="w-12 h-12 text-white" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Navigation Buttons */}
          {bathroomImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-7xl max-h-[85vh] sm:max-h-[90vh] w-full h-full flex items-center justify-center"
          >
            <img
              src={bathroomImages[selectedImageIndex]}
              alt={`Bathroom inspiration ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = '/assets/LOGO PNG.png';
                e.currentTarget.className = 'max-w-full max-h-full object-contain p-4 sm:p-8';
                e.currentTarget.onerror = null;
              }}
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white text-xs sm:text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedImageIndex + 1} / {bathroomImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

