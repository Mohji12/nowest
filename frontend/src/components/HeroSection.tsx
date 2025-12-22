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
      {/* Video Background */}
      {video ? (
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`,
              minHeight: '100%',
              minWidth: '100%'
            }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>
      ) : (
        /* Image Background Fallback */
      <div 
        className="absolute inset-0 bg-cover bg-center parallax-slow"
        style={{ 
            backgroundImage: image ? `url(${image})` : undefined,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>
      )}

      {/* Logo at the top center */}
      <div className="absolute top-2 sm:top-4 left-1/2 -translate-x-1/2 z-20">
        <div 
          className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <img 
            src="/assets/LOGO PNG.png" 
            alt="Nowest Interior Ltd" 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-contain filter drop-shadow-lg"
          />
        </div>
      </div>

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <h1 
          className={`font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 px-2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          data-testid="text-hero-title"
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className={`text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mb-8 sm:mb-12 px-4 font-light transition-all duration-1000 delay-300 ${
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
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-white/80 animate-bounce hover:text-primary transition-colors"
          data-testid="button-scroll-indicator"
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </section>
  );
}
