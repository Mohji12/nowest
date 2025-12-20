import React from 'react';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  location?: string;
  year?: number;
  onClick?: () => void;
}

export default function ProjectCard({ id, title, category, image, description, location, year, onClick }: ProjectCardProps) {
  // Handle image loading errors with S3 bucket name fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.src;
    console.error(`[ProjectCard] Image failed to load for "${title}":`, currentSrc);
    
    // Try alternative bucket name if it's an S3 URL
    if (currentSrc.includes('jgi-menteetrackers')) {
      const altUrl = currentSrc.replace('jgi-menteetrackers', 'jgi-menteetracker');
      console.log(`[ProjectCard] Trying alternative bucket URL:`, altUrl);
      target.src = altUrl;
      target.onerror = null;
      return;
    }
    
    if (currentSrc.includes('jgi-menteetracker') && !currentSrc.includes('LOGO PNG')) {
      const altUrl = currentSrc.replace('jgi-menteetracker', 'jgi-menteetrackers');
      console.log(`[ProjectCard] Trying alternative bucket URL:`, altUrl);
      target.src = altUrl;
      target.onerror = null;
      return;
    }
    
    // Try to use a fallback image
    const fallbackImage = '/assets/LOGO PNG.png';
    
    // Only set fallback if we haven't already tried it
    if (target.src !== fallbackImage && !target.src.includes('LOGO PNG')) {
      console.log(`[ProjectCard] Using fallback image for "${title}"`);
      target.src = fallbackImage;
      target.className = 'w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-110';
      target.onerror = null; // Prevent infinite loop
    } else {
      // If fallback also fails, hide the image
      target.style.display = 'none';
    }
  };

  // Log image URL for debugging
  React.useEffect(() => {
    if (image) {
      console.log(`[ProjectCard] Loading image for "${title}":`, image);
    } else {
      console.warn(`[ProjectCard] No image provided for "${title}"`);
    }
  }, [image, title]);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer animate-breathe hover-elevate shadow-lg"
      data-testid={`card-project-${id}`}
    >
      {/* Image Section */}
      <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            data-testid={`img-project-${id}`}
            onError={handleImageError}
            onLoad={() => {
              console.log(`[ProjectCard] Image loaded successfully for "${title}":`, image);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <img
              src="/assets/LOGO PNG.png"
              alt={title}
              className="w-24 h-24 object-contain opacity-50"
            />
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="bg-golden-orange text-white text-xs font-medium px-2 py-1 rounded-full" data-testid={`text-project-category-${id}`}>
              {category}
            </span>
          </div>
        )}
        
        {/* Title Overlay - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white" data-testid={`text-project-title-${id}`}>
              {title}
            </h3>
            {description && (
              <p className="text-white/90 text-sm leading-relaxed mt-1 line-clamp-2" data-testid={`text-project-description-${id}`}>
                {description}
              </p>
            )}
            {(location || year) && (
              <div className="flex items-center justify-between text-white/80 text-xs mt-2">
                {location && (
                  <span className="flex items-center gap-1" data-testid={`text-project-location-${id}`}>
                    📍 {location}
                  </span>
                )}
                {year && (
                  <span data-testid={`text-project-year-${id}`}>
                    {year}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
