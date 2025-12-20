import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
  onExplore?: () => void;
}

export default function HeroSection({ title, subtitle, image, video, onExplore }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 parallax-slow bg-black">
        {video && !videoError ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`
            }}
            onError={() => {
              console.error('Hero video failed to load:', video);
              setVideoError(true);
            }}
          />
        ) : image ? (
          <img
            src={image}
            alt="Hero background"
            className="w-full h-full object-cover object-center"
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`
            }}
            onError={(e) => {
              console.error('Hero image failed to load:', image);
              // Fallback to a default image if the main image fails
              e.currentTarget.src = '/assets/LOGO PNG.png';
              e.currentTarget.className = 'w-full h-full object-contain object-center';
              e.currentTarget.onerror = null;
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Logo at the top center */}
      <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 z-20">
        <div 
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <img 
            src="/assets/LOGO PNG.png" 
            alt="Nowest Interior Ltd" 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72 object-contain filter drop-shadow-lg"
          />
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 text-center">
        <h1 
          className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          data-testid="text-hero-title"
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8 md:mb-12 px-4 font-light transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            data-testid="text-hero-subtitle"
          >
            {subtitle}
          </p>
        )}

        <Button
          size="lg"
          variant="outline"
          onClick={onExplore}
          className={`backdrop-blur-xl bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-1000 delay-500 group ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          data-testid="button-explore-portfolio"
        >
          <span className="mr-2">Explore Portfolio</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </Button>

        <button
          onClick={onExplore}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/80 animate-bounce hover:text-primary transition-colors"
          data-testid="button-scroll-indicator"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
