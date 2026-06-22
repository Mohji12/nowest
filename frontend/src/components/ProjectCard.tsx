import React, { useState } from 'react';
import { getPortfolioImageCandidates } from '@/lib/s3Urls';

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
  const imageCandidates = image ? getPortfolioImageCandidates(image) : [];
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const currentImage = imageCandidates[candidateIndex];

  React.useEffect(() => {
    setCandidateIndex(0);
    setImageFailed(false);
  }, [image]);

  const handleImageError = () => {
    const nextIndex = candidateIndex + 1;
    if (nextIndex < imageCandidates.length) {
      setCandidateIndex(nextIndex);
      return;
    }
    setImageFailed(true);
  };

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer animate-breathe hover-elevate shadow-lg"
      data-testid={`card-project-${id}`}
    >
      {/* Image Section */}
      <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
        {currentImage && !imageFailed ? (
          <img
            src={currentImage}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            data-testid={`img-project-${id}`}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm px-4 text-center">
            Image unavailable
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
