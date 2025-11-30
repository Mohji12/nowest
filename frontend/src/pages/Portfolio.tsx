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
      if (!imagePath) return getPortfolioImage(item.title || '', item.category || '');
      
      // If it's already a full URL (S3 or any other), return as is
      if (imagePath.startsWith('http')) {
        console.log(`Using S3/External URL: ${imagePath}`);
        return imagePath;
      }
      
      // If it's a relative path, convert to S3 URL
      if (imagePath.startsWith('/')) {
        // Remove leading slash and construct S3 URL
        const cleanPath = imagePath.substring(1);
        const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${cleanPath}`;
        console.log(`Converting relative path to S3 URL: ${imagePath} -> ${s3Url}`);
        return s3Url;
      }
      
      // If it's a relative path without leading slash, add it
      const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${imagePath}`;
      console.log(`Converting relative path to S3 URL: ${imagePath} -> ${s3Url}`);
      return s3Url;
    };

    // Debug: Log the image URL from database
    if (item.image) {
      const finalUrl = getImageUrl(item.image);
      console.log(`Portfolio item "${item.title}" has image URL:`, item.image);
      console.log(`Using URL:`, finalUrl);
    } else {
      console.log(`Portfolio item "${item.title}" has no image URL, using fallback`);
    }

    return {
      id: item.id?.toString() || Math.random().toString(),
      title: item.title || 'Untitled Project',
      category: item.category && item.category !== 'general' ? item.category : undefined,
      image: getImageUrl(item.image),
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
      <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            {/* OUR WORK - Small uppercase text */}
            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
              OUR WORK
            </p>
            
            {/* Portfolio - Large serif heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-black px-2">
              Portfolio
            </h1>
            
            {/* Golden line */}
            <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
            
            {/* Loading text */}
            <p className="text-gray-600 text-sm sm:text-base">
              Loading projects...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback data if there's an error but still render the portfolio
  if (error && !portfolioData) {
    console.warn('Portfolio API failed, showing fallback data');
  }

  return (
    <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
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
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-black px-2">
            Portfolio
          </h1>
          
          {/* Golden line */}
          <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
          {/* Project count */}
          <p className="text-gray-600 text-sm sm:text-base">
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


        <PortfolioGrid 
          projects={portfolioItems}
          onProjectClick={(id) => console.log('Project clicked:', id)}
        />
      </div>
    </div>
  );
}
