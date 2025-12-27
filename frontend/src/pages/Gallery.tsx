import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

// Gallery categories with their folder names and display info
const galleryCategories = [
  {
    id: 'allusion',
    name: 'Allusion®',
    description: 'A combination of sheer and opaque textured fabric for our most elegant blind yet.',
    folder: 'allusion',
    image: '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp'
  },
  {
    id: 'cellur',
    name: 'Cellular & Pleated',
    description: 'A charming selection of colourways and patterns boasting year round benefits.',
    folder: 'cellur',
    image: '/assets/brochures/NowestImages/cellur/Landscape-Cell_Celeste_LF_Anthracite-700x500-1.jpg.webp'
  },
  {
    id: 'collection',
    name: 'Children\'s Collection',
    description: 'Inspire playtimes and ensure a restful nights sleep with our charming children\'s prints.',
    folder: 'collection',
    image: '/assets/brochures/NowestImages/collection/Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp'
  },
  {
    id: 'perfect',
    name: 'Perfect Fit®',
    description: 'Choose innovative Perfect Fit to complement your roller, vision and pleated/cellular blinds.',
    folder: 'perfect',
    image: '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp'
  },
  {
    id: 'roller',
    name: 'Roller',
    description: 'Simple and stylish in its design, featuring an exciting array of prints, plains and textures.',
    folder: 'roller',
    image: '/assets/brochures/NowestImages/roller/Landscape_Petal_White_Liv-1024x731.jpg.webp'
  },
  {
    id: 'urban',
    name: 'Urban Shutters',
    description: 'Transform your home with our classical selection of made to measure frames and door styles to suit any interior.',
    folder: 'urban',
    image: '/assets/brochures/NowestImages/urban/Landscape-FH-Cafe-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp'
  },
  {
    id: 'vertical',
    name: 'Vertical',
    description: 'Featuring on-trend designs and colourways for a blind of pure practicality and distinction.',
    folder: 'vertical',
    image: '/assets/brochures/NowestImages/vertical/Vert-Landscape-size-Ex-Lite-Blue_Kit.jpg.webp'
  },
  {
    id: 'vision',
    name: 'Vision®',
    description: 'Featuring metallic finishes, sheer fabrics, natural wood woven effects and muted tones.',
    folder: 'vision',
    image: '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp'
  }
];

export default function Gallery() {
  const [, setLocation] = useLocation();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observers = galleryCategories.map((_, index) => {
      const card = document.getElementById(`gallery-card-${index}`);
      if (!card) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set([...Array.from(prev), index]));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const handleCardClick = (categoryId: string) => {
    setLocation(`/gallery/${categoryId}`);
  };

  // Background image path
  const galleryImage = '/assets/stock_images/luxury_living_room_e_753bd7d5.jpg';

  return (
    <div>
      {/* Header section with background image - Full width */}
      <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '300px' }}>
        {/* Background image */}
        <img
          src={galleryImage}
          alt="Gallery background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '300px', width: '100%' }}
          onError={(e) => {
            console.error('Gallery image failed to load:', galleryImage);
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
          
          {/* GALLERY - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            GALLERY
          </p>
          
          {/* Gallery - Large serif heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-2 drop-shadow-lg">
            Gallery
          </h1>
          
          {/* Golden line */}
          <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
          {/* Description */}
          <p className="text-white text-sm sm:text-base max-w-3xl mx-auto px-4 drop-shadow-md">
            Be inspired by our latest collection of stunning photography showcasing the very best of what we have to offer.
          </p>
          <p className="text-white text-sm sm:text-base max-w-3xl mx-auto mt-2 px-4 drop-shadow-md">
            Select the range from the menu above or scroll down to browse all our ranges.
          </p>
        </div>
      </div>

      {/* Gallery Grid Section */}
      <div className="py-16 sm:py-20 md:py-24 pb-24 sm:pb-28 md:pb-32 lg:pb-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {galleryCategories.map((category, index) => (
            <div
              key={category.id}
              id={`gallery-card-${index}`}
              onClick={() => handleCardClick(category.id)}
              className={`group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                visibleCards.has(index) ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ 
                transitionDelay: `${(index % 3) * 100}ms`,
              }}
            >
              {/* Image Section */}
              <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback to logo if image fails
                    e.currentTarget.src = '/assets/LOGO PNG.png';
                    e.currentTarget.className = 'w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-110';
                    e.currentTarget.onerror = null;
                  }}
                />
                
                {/* Title Overlay - Always visible at bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                    
                    {/* View Gallery Link */}
                    <div className="flex items-center text-white/90 text-sm mt-3 group-hover:text-white transition-colors">
                      <span className="mr-2">view gallery</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Get Quote Button Section */}
      <section className="py-12 sm:py-16 md:py-20 pb-24 sm:pb-28 md:pb-32 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => setLocation('/contact')}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg"
          >
            Get Quote
          </button>
        </div>
      </section>
    </div>
  );
}

