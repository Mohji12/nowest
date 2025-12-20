import { useQuery } from '@tanstack/react-query';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getPortfolio } from '@/services/api';

// Import fallback images
import sheerImage from '@assets/generated_images/Luxury_sheer_curtains_hero_53aa2ee0.png';
import blackoutImage from '@assets/generated_images/Blackout_curtains_bedroom_luxury_675bdda2.png';
import motorizedImage from '@assets/generated_images/Motorized_office_curtains_modern_7739fdbe.png';
import romanImage from '@assets/generated_images/Roman_blinds_dining_room_6a3151e1.png';
import layeredImage from '@assets/generated_images/Layered_curtains_living_room_540027a7.png';
import silkImage from '@assets/generated_images/Silk_fabric_drape_detail_e994039e.png';
import velvetImage from '@assets/generated_images/Velvet_fabric_texture_closeup_eb67914e.png';

// Image fallback map based on category or title keywords
const portfolioImageMap: Record<string, string> = {
  'sheer': sheerImage,
  'blackout': blackoutImage,
  'motorized': motorizedImage,
  'motorised': motorizedImage,
  'roman': romanImage,
  'layered': layeredImage,
  'silk': silkImage,
  'velvet': velvetImage,
};

// Helper function to get portfolio image
const getPortfolioImage = (title: string, category: string): string => {
  const titleKey = title.toLowerCase();
  const categoryKey = category.toLowerCase();
  
  for (const [key, img] of Object.entries(portfolioImageMap)) {
    if (titleKey.includes(key) || categoryKey.includes(key)) return img;
  }
  
  return sheerImage; // Default fallback
};

export default function Portfolio() {


  // Fetch real portfolio data from API
  const { data: portfolioData, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry API calls twice on failure
  });

  // Process portfolio data with database images
  const portfolioItems = (portfolioData as any[])?.map((item: any) => {
    // Handle both S3 URLs and relative paths from database
    const getImageUrl = (imagePath: string) => {
      if (!imagePath || imagePath.trim() === '') {
        console.log(`[Portfolio] No image path for "${item.title}", using fallback`);
        return getPortfolioImage(item.title || '', item.category || '');
      }
      
      // If it's already a full URL (S3 or any other), return as is
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        console.log(`[Portfolio] ✅ Using database URL for "${item.title}": ${imagePath}`);
        return imagePath;
      }
      
      // If it's a relative path, convert to S3 URL
      if (imagePath.startsWith('/')) {
        // Remove leading slash and construct S3 URL
        const cleanPath = imagePath.substring(1);
        const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${cleanPath}`;
        console.log(`[Portfolio] Converted relative path to S3 URL for "${item.title}": ${imagePath} -> ${s3Url}`);
        return s3Url;
      }
      
      // If it's a relative path without leading slash, add it
      const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${imagePath}`;
      console.log(`[Portfolio] Converted path to S3 URL for "${item.title}": ${imagePath} -> ${s3Url}`);
      return s3Url;
    };

    // Check multiple possible image field names
    const imageField = item.image || item.image_url || item.imageUrl || item.photo || item.photo_url;
    
    // Debug: Log the image URL from database
    if (imageField) {
      const finalUrl = getImageUrl(imageField);
      console.log(`[Portfolio] Portfolio item "${item.title}" has image URL:`, imageField);
      console.log(`[Portfolio] Using final URL:`, finalUrl);
    } else {
      console.log(`[Portfolio] Portfolio item "${item.title}" has no image URL, using fallback`);
    }

    // Get the image URL using the image field
    const imageUrl = getImageUrl(imageField || '');
    
    return {
      id: item.id?.toString() || Math.random().toString(),
      title: item.title || 'Untitled Project',
      category: item.category && item.category !== 'general' ? item.category : undefined,
      image: imageUrl,
      description: item.description || '',
      location: item.location || undefined,
      year: undefined, // Don't show year to avoid showing 2025
    };
  }) || [
    // Fallback data if API fails
    {
      id: '1',
      title: 'Luxury Sheer Curtains',
      category: 'residential',
      image: getPortfolioImage('Luxury Sheer Curtains', 'residential'),
      description: 'Elegant translucent fabrics that filter natural light',
      location: 'London',
      year: undefined,
    },
    {
      id: '2',
      title: 'Modern Office Blinds',
      category: 'commercial',
      image: getPortfolioImage('Modern Office Blinds', 'commercial'),
      description: 'Professional window treatments for workplace environments',
      location: 'Manchester',
      year: undefined,
    },
    {
      id: '3',
      title: 'Boutique Hotel Suite',
      category: 'hospitality',
      image: getPortfolioImage('Boutique Hotel Suite', 'hospitality'),
      description: 'Luxury window treatments for hospitality spaces',
      location: 'Edinburgh',
      year: undefined,
    },
  ];


  if (isLoading) {
    return (
      <div>
        {/* Header section with background video - Full width */}
        <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '400px' }}>
          {/* Background video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ minHeight: '400px', width: '100%' }}
          >
            <source src={encodeURI('/assets/videos/Ditto_mohan_Create_a_5-second_cinematic_luxury_interior_video_for_a_premium_c (1).mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          
          {/* Content overlay - Centered with max-width */}
          <div className="relative z-20 py-12 sm:py-16 md:py-20 px-4 max-w-7xl mx-auto">
            {/* OUR WORK - Small uppercase text */}
            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
              OUR WORK
            </p>
            
            {/* Portfolio - Large serif heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-2 drop-shadow-lg">
              Portfolio
            </h1>
            
            {/* Golden line */}
            <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
            
            {/* Loading text */}
            <p className="text-white text-sm sm:text-base drop-shadow-md">
              Loading projects...
            </p>
          </div>
        </div>
        
        {/* Portfolio grid section */}
        <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Log error if API fails (but still show fallback data)
  if (error && !portfolioData) {
    console.warn('Portfolio API failed, showing fallback data', error);
  }

  // Get error message for display
  const errorMessage = error && !portfolioData 
    ? ((error as any)?.userMessage || (error as any)?.detail || (error instanceof Error ? error.message : 'Unknown error'))
    : null;

  // Video path - URL encoded to handle special characters
  const portfolioVideo = encodeURI('/assets/videos/Ditto_mohan_Create_a_5-second_cinematic_luxury_interior_video_for_a_premium_c (1).mp4');

  return (
    <div>
      {/* Header section with background video - Full width */}
      <div className="relative text-center mb-8 sm:mb-12 md:mb-16 overflow-hidden w-full" style={{ minHeight: '350px' }}>
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '350px', width: '100%' }}
        >
          <source src={portfolioVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        
        {/* Content overlay - Centered with max-width */}
        <div className="relative z-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto object-contain"
            />
          </div>
          {/* OUR WORK - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-2 sm:mb-3 md:mb-4 px-2" style={{ color: '#B8860B' }}>
            OUR WORK
          </p>
          
          {/* Portfolio - Large serif heading */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 text-white px-2 drop-shadow-lg">
            Portfolio
          </h1>
          
          {/* Golden line */}
          <div className="w-10 sm:w-12 md:w-16 h-0.5 sm:h-1 mx-auto mb-2 sm:mb-3 md:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
          {/* Error banner - show if API failed */}
          {errorMessage && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded max-w-3xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Unable to load portfolio data:</strong> {errorMessage}
                  </p>
                  <p className="text-xs text-yellow-600 mt-2">
                    Showing sample portfolio items. This is likely a backend server issue. Please try refreshing the page.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Project count */}
          <p className="text-white text-sm sm:text-base drop-shadow-md">
            {portfolioItems.length} {portfolioItems.length === 1 ? 'Project' : 'Projects'}
          </p>
          
          {error && !portfolioData && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-yellow-700">
                Showing sample projects. Real data will load when connection is restored.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio grid section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">


          <PortfolioGrid 
            projects={portfolioItems}
            onProjectClick={(id) => console.log('Project clicked:', id)}
          />
        </div>
      </div>
    </div>
  );
}
