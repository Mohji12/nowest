import HeroSection from '@/components/HeroSection';
import SignatureCollection from '@/components/SignatureCollection';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

// Image paths from public assets (files in public directory are served at root)
const heroImage = '/assets/WhatsApp Image 2025-12-03 at 15.34.24_06ffa5f6.jpg';
const dramaticImage = '/assets/stock_images/luxury_curtains_flow_9cf016a6.jpg';
const whatsappImage = '/assets/WhatsApp Image 2025-12-03 at 15.34.24_06ffa5f6.jpg';

// Room preview images from nowest S3 collection
const ROOM_IMAGES = {
  kitchen: 'https://nowest.s3.ap-south-1.amazonaws.com/collection/kitchen/A_bright_cheerful_kitchen_with_202606230239.jpeg',
  bathroom: 'https://nowest.s3.ap-south-1.amazonaws.com/collection/A_bright_family_bathroom_with_202606230251.jpeg',
  bedroom: 'https://nowest.s3.ap-south-1.amazonaws.com/collection/bedroom/A_bold_modern_maximalist_bedroom_202606230317.jpeg',
  livingRoom: 'https://nowest.s3.ap-south-1.amazonaws.com/collection/living+room/A_bright_contemporary_living_room_202606230333.jpeg',
};

export default function Home() {
  const [, setLocation] = useLocation();

  const signatureProjects = [
    {
      id: '1',
      title: 'Ethereal Elegance',
      subtitle: 'Sheer Curtains',
      video: `/assets/videos/Ditto_mohan_Create_a_5-second_cinematic_luxury_interior_video_for_a_premium_c.mp4`,
    },
    {
      id: '2',
      title: 'Midnight Sanctuary',
      subtitle: 'Blackout Solutions',
      video: `/assets/videos/Ditto_mohan_Create_a_10-second_cinematic_luxury_interior_video_for_the_homepa.mp4`,
    },
    {
      id: '3',
      title: 'Layered Luxury',
      subtitle: 'Dual-Layer Systems',
      video: '/assets/videos/video5.mp4',
    },
    {
      id: '4',
      title: 'Dramatic Ambiance',
      subtitle: 'Designer Collections',
      image: dramaticImage,
    },
    {
      id: '5',
      title: 'Luxury Interior',
      subtitle: 'Premium Design',
      image: whatsappImage,
    },
  ];

  const scrollToExplorer = () => {
    document.getElementById('curtain-explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection
        title="Nowest Interior Ltd"
        subtitle="Luxury Blinds & Curtains Handcrafted in the UK Since 2002"
        video="/assets/videos/Ditto_mohan_Create_an_ultra-luxury_cinematic_hero_video_for_a_premium_custom-.mp4"
        image={heroImage}
        onExplore={scrollToExplorer}
      />

      <SignatureCollection projects={signatureProjects} />

      <div id="curtain-explorer">
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-golden-orange mb-4 px-2">
                browse by room
              </h2>
              <div className="relative w-24 sm:w-32 h-0.5 bg-golden-orange mx-auto">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
              </div>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {/* Kitchen */}
              <div 
                className="group cursor-pointer"
                onClick={() => setLocation('/rooms/kitchen')}
              >
                <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[3/4] w-full">
                    <img
                      src={ROOM_IMAGES.kitchen}
                      alt="Kitchen"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Kitchen image failed to load');
                        e.currentTarget.src = '/assets/LOGO PNG.png';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-center text-sm sm:text-base font-medium text-[#8B4513] uppercase tracking-wide">
                  KITCHEN
                </h3>
              </div>

              {/* Bathroom */}
              <div 
                className="group cursor-pointer"
                onClick={() => setLocation('/rooms/bathroom')}
              >
                <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[3/4] w-full">
                    <img
                      src={ROOM_IMAGES.bathroom}
                      alt="Bathroom"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Bathroom image failed to load');
                        e.currentTarget.src = '/assets/LOGO PNG.png';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-center text-sm sm:text-base font-medium text-[#8B4513] uppercase tracking-wide">
                  BATHROOM
                </h3>
              </div>

              {/* Bedroom */}
              <div 
                className="group cursor-pointer"
                onClick={() => setLocation('/rooms/bedroom')}
              >
                <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[3/4] w-full">
                    <img
                      src={ROOM_IMAGES.bedroom}
                      alt="Bedroom"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Bedroom image failed to load');
                        e.currentTarget.src = '/assets/LOGO PNG.png';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-center text-sm sm:text-base font-medium text-[#8B4513] uppercase tracking-wide">
                  BEDROOM
                </h3>
              </div>

              {/* Living Room */}
              <div 
                className="group cursor-pointer"
                onClick={() => setLocation('/rooms/living-room')}
              >
                <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-[3/4] w-full">
                    <img
                      src={ROOM_IMAGES.livingRoom}
                      alt="Living Room"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Living Room image failed to load');
                        e.currentTarget.src = '/assets/LOGO PNG.png';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-center text-sm sm:text-base font-medium text-[#8B4513] uppercase tracking-wide">
                  LIVING ROOM
                </h3>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 pb-24 sm:pb-28 md:pb-32 lg:pb-40 px-4 sm:px-6 text-center overflow-hidden">
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
              onClick={() => setLocation('/contact')}
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
