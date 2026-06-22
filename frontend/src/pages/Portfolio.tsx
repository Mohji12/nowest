import { useQuery } from '@tanstack/react-query';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getPortfolio } from '@/services/api';
import { getPortfolioImageUrl, PORTFOLIO_HERO_IMAGE } from '@/lib/s3Urls';

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
    const getImageUrl = (imagePath: string) => {
      if (!imagePath) return getPortfolioImage(item.title || '', item.category || '');
      return getPortfolioImageUrl(imagePath) || getPortfolioImage(item.title || '', item.category || '');
    };

    const imageUrl = getImageUrl(item.image);
    if (!imageUrl) return null;

    return {
      id: item.id?.toString() || Math.random().toString(),
      title: item.title || 'Untitled Project',
      category: item.category && item.category !== 'general' ? item.category : undefined,
      image: imageUrl,
      description: item.description || '',
      location: item.location || undefined,
      year: undefined, // Don't show year to avoid showing 2025
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null) || [
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


  // Background image from nowest S3 collection folder
  const portfolioImage = PORTFOLIO_HERO_IMAGE;

  if (isLoading) {
    return (
      <div>
        {/* Header section with background image - Full width */}
        <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '300px' }}>
          {/* Background image */}
          <img
            src={portfolioImage}
            alt="Portfolio background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ minHeight: '300px', width: '100%' }}
            onError={(e) => {
              console.error('Portfolio image failed to load:', portfolioImage);
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
            {/* OUR WORK - Small uppercase text */}
            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
              OUR WORK
            </p>
            
            {/* Portfolio - Large serif heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-2 drop-shadow-md">
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
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show fallback data if there's an error but still render the portfolio
  if (error && !portfolioData) {
    console.warn('Portfolio API failed, showing fallback data');
  }

  return (
    <div>
      {/* Header section with background image - Full width */}
      <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '300px' }}>
        {/* Background image */}
        <img
          src={portfolioImage}
          alt="Portfolio background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '300px', width: '100%' }}
          onError={(e) => {
            console.error('Portfolio image failed to load:', portfolioImage);
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
          {/* OUR WORK - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            OUR WORK
          </p>
          
          {/* Portfolio - Large serif heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-2 drop-shadow-md">
            Portfolio
          </h1>
          
          {/* Golden line */}
          <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
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

      {/* Portfolio Content Section */}
      <div className="px-4 sm:px-6 pb-24 sm:pb-28 md:pb-32 lg:pb-40">
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
