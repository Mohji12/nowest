import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import SignatureCollection from '@/components/SignatureCollection';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Maximize2, Moon, Zap, Layers } from 'lucide-react';

// Image paths from public assets (files in public directory are served at root)
const heroImage = '/assets/stock_images/luxury_living_room_e_753bd7d5.jpg';
const sheerImage = '/assets/generated_images/Luxury_sheer_curtains_hero_53aa2ee0.png';
const blackoutImage = '/assets/generated_images/Blackout_curtains_bedroom_luxury_675bdda2.png';
const motorizedImage = '/assets/generated_images/Motorized_office_curtains_modern_7739fdbe.png';
const romanImage = '/assets/generated_images/Roman_blinds_dining_room_6a3151e1.png';
const layeredImage = '/assets/generated_images/Layered_curtains_living_room_540027a7.png';
const dramaticImage = '/assets/stock_images/luxury_curtains_flow_9cf016a6.jpg';

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState(0);

  const signatureProjects = [
    {
      id: '1',
      title: 'Ethereal Elegance',
      subtitle: 'Sheer Curtains',
      image: sheerImage,
    },
    {
      id: '2',
      title: 'Midnight Sanctuary',
      subtitle: 'Blackout Solutions',
      image: blackoutImage,
    },
    {
      id: '3',
      title: 'Layered Luxury',
      subtitle: 'Dual-Layer Systems',
      image: layeredImage,
    },
    {
      id: '4',
      title: 'Dramatic Ambiance',
      subtitle: 'Designer Collections',
      image: dramaticImage,
    },
  ];

  const curtainTypes = [
    {
      id: 'sheer',
      name: 'Sheers',
      icon: Maximize2,
      description: 'Elegant translucent fabrics that filter natural light while maintaining privacy and creating an ethereal ambiance.',
      image: sheerImage
    },
    {
      id: 'blackout',
      name: 'Blackout',
      icon: Moon,
      description: 'Complete light control and privacy with luxurious fabrics that offer superior insulation and sophisticated aesthetics.',
      image: blackoutImage
    },
    {
      id: 'motorized',
      name: 'Motorized',
      icon: Zap,
      description: 'Smart automation meets luxury design. Control your curtains with precision using advanced motorization technology.',
      image: motorizedImage
    },
    {
      id: 'roman',
      name: 'Roman Blinds',
      icon: Layers,
      description: 'Classic elegance with clean horizontal folds. Perfect for a tailored, sophisticated window treatment.',
      image: romanImage
    }
  ];

  const scrollToExplorer = () => {
    document.getElementById('curtain-explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection
        title="Nowest Interior Ltd"
        subtitle="Luxury Blinds & Curtains Handcrafted in the UK Since 2002"
        image={heroImage}
        onExplore={scrollToExplorer}
      />

      <SignatureCollection projects={signatureProjects} />

      <div id="curtain-explorer">
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header Section - Mobile Optimized */}
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-golden-orange text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
                OUR SERVICES
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 px-2">
                Explore Our Collection
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-golden-orange mx-auto"></div>
            </div>

            {/* Category Navigation Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-12 sm:mb-16 max-w-4xl mx-auto">
              {curtainTypes.map((type, index) => {
                const Icon = type.icon;
                const isActive = index === activeCategory;
                
                return (
                  <div 
                    key={type.id} 
                    onClick={() => setActiveCategory(index)}
                    className={`category-card group cursor-pointer p-3 sm:p-4 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-golden-orange text-white active shadow-lg' 
                        : 'bg-white text-black border border-gray-200 hover:border-golden-orange/30'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mb-1 sm:mb-2 ${
                        isActive ? 'text-white' : 'text-black'
                      }`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h3 className={`font-medium text-xs sm:text-sm ${
                        isActive ? 'text-white' : 'text-black'
                      }`}>
                        {type.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Main Product Showcase - Mobile Optimized */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                <img
                  src={curtainTypes[activeCategory].image}
                  alt={curtainTypes[activeCategory].name}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Text Overlay - Mobile Optimized */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-auto max-w-md">
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                    {curtainTypes[activeCategory].name}
                  </h3>
                  <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed">
                    {curtainTypes[activeCategory].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 text-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-2 animate-fade-slide-up" data-testid="text-cta-heading">
            Transform Your Home Today
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 px-4 animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
            Experience over 20 years of excellence in bespoke blinds and curtains. Free home consultation available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-slide-up" style={{ animationDelay: '400ms' }}>
            <Button
              size="lg"
              onClick={() => setLocation('/portfolio')}
              className="group w-full sm:w-auto"
              data-testid="button-view-portfolio"
            >
              <span>View Full Portfolio</span>
              <div className="ml-2 w-0 group-hover:w-4 transition-all overflow-hidden">
                →
              </div>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => console.log('Book consultation')}
              className="group w-full sm:w-auto"
              data-testid="button-book-consultation"
            >
              <span>Book Consultation</span>
              <div className="ml-2 w-0 group-hover:w-4 transition-all overflow-hidden">
                ✦
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
