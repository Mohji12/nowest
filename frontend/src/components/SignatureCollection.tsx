import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  video?: string;
}

interface SignatureCollectionProps {
  projects: Project[];
}

export default function SignatureCollection({ projects }: SignatureCollectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let rafId: number | null = null;
    let lastIndex = 0;
    let lastTransitionTime = 0;
    const MIN_TRANSITION_DELAY = 600; // Minimum 600ms between image changes

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const section = document.getElementById('signature-collection');
        if (!section) {
          rafId = null;
          return;
        }

        const rect = section.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        const targetIndex = Math.min(
          Math.max(0, Math.floor(scrollProgress * projects.length)),
          projects.length - 1
        );
        
        const now = Date.now();
        const timeSinceLastTransition = now - lastTransitionTime;
        
        // Only allow transition if enough time has passed
        if (targetIndex !== lastIndex && timeSinceLastTransition >= MIN_TRANSITION_DELAY) {
          // Move one step at a time (increment or decrement)
          const newIndex = targetIndex > lastIndex ? lastIndex + 1 : lastIndex - 1;
          setActiveIndex(newIndex);
          lastIndex = newIndex;
          lastTransitionTime = now;
        }
        
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [projects.length]);

  return (
    <section
      id="signature-collection"
      className="py-24"
      style={{ minHeight: `${projects.length * 100}vh` }}
      data-testid="section-signature-collection"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            data-testid={`signature-project-${project.id}`}
          >
            {project.video && !videoErrors[project.id] ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onError={() => {
                  console.error('Video failed to load:', project.video);
                  setVideoErrors(prev => ({ ...prev, [project.id]: true }));
                }}
              />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={`w-full h-full ${
                  project.image.includes('WhatsApp Image') 
                    ? 'object-contain object-center' 
                    : 'object-cover'
                }`}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 animate-drape-reveal" />
            
            <div className="absolute inset-0 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8">
              <div className={`text-center text-white max-w-3xl transition-all duration-700 ${
                index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <p className="text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3 md:mb-4 tracking-wider uppercase px-2" data-testid={`text-project-subtitle-${project.id}`}>
                  {project.subtitle}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 px-2" data-testid={`text-project-title-${project.id}`}>
                  {project.title}
                </h3>
                <div className="w-12 sm:w-16 md:w-24 h-0.5 sm:h-1 bg-primary mx-auto mt-3 sm:mt-4 md:mt-6 animate-fabric-wave" />
              </div>
            </div>

            <div className="absolute bottom-3 sm:bottom-4 md:bottom-8 right-3 sm:right-4 md:right-8 flex gap-1 sm:gap-1.5 md:gap-2">
              {projects.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 sm:h-1 transition-all duration-300 ${
                    i === activeIndex 
                      ? 'w-6 sm:w-8 md:w-12 bg-primary' 
                      : 'w-3 sm:w-4 md:w-6 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
