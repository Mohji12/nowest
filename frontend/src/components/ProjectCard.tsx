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
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer animate-breathe hover-elevate shadow-lg"
      data-testid={`card-project-${id}`}
    >
      {/* Image Section */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          data-testid={`img-project-${id}`}
        />
        
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
