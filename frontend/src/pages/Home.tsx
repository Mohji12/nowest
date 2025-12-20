import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import SignatureCollection from '@/components/SignatureCollection';
import ScrollContactCard from '@/components/ScrollContactCard';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

// Video and image paths from public assets (files in public directory are served at root)
const heroVideo = '/assets/videos/Ditto_mohan_Create_an_ultra-luxury_cinematic_hero_video_for_a_premium_custom-.mp4';
const heroImage = '/assets/stock_images/luxury_living_room_e_753bd7d5.jpg';

// Signature Collection Videos
const signatureVideo1 = '/assets/videos/Ditto_mohan_Create_a_5-second_cinematic_luxury_interior_video_for_a_premium_c.mp4';
const signatureVideo2 = '/assets/videos/Ditto_mohan_Create_a_10-second_cinematic_luxury_interior_video_for_the_homepa.mp4';
// Project 3 - Exact filename from directory
const signatureVideo3 = '/assets/videos/Ditto_mohan_Here\'s_a_high-end,_production-ready_prompt_you_can_directly_use_i.mp4';
// Project 4 - Exact filename from directory (with special characters)
const signatureVideo4 = '/assets/videos/Ditto_mohan_Perfect_—_let\'s_go_completely_different_from_the_usual_"curtains (1).mp4';

// Other images
const sheerImage = '/assets/generated_images/Luxury_sheer_curtains_hero_53aa2ee0.png';
const blackoutImage = '/assets/generated_images/Blackout_curtains_bedroom_luxury_675bdda2.png';
const motorizedImage = '/assets/generated_images/Motorized_office_curtains_modern_7739fdbe.png';
const romanImage = '/assets/generated_images/Roman_blinds_dining_room_6a3151e1.png';
const layeredImage = '/assets/generated_images/Layered_curtains_living_room_540027a7.png';
const dramaticImage = '/assets/stock_images/luxury_curtains_flow_9cf016a6.jpg';
const whatsappImage = '/assets/WhatsApp Image 2025-12-03 at 15.34.24_06ffa5f6.jpg';

export default function Home() {
  const [, setLocation] = useLocation();
  const signatureProjects = [
    {
      id: '1',
      title: 'Ethereal Elegance',
      subtitle: 'Sheer Curtains',
      video: signatureVideo1,
      image: sheerImage, // Fallback
    },
    {
      id: '2',
      title: 'Midnight Sanctuary',
      subtitle: 'Blackout Solutions',
      video: signatureVideo2,
      image: blackoutImage, // Fallback
    },
    {
      id: '3',
      title: 'Layered Luxury',
      subtitle: 'Dual-Layer Systems',
      video: signatureVideo3,
      image: layeredImage, // Fallback
    },
    {
      id: '4',
      title: 'Dramatic Ambiance',
      subtitle: 'Designer Collections',
      video: signatureVideo4,
      image: dramaticImage, // Fallback
    },
    {
      id: '5',
      title: 'Luxury Interior',
      subtitle: 'Premium Design',
      image: whatsappImage,
    },
  ];

  const scrollToExplorer = () => {
    document.getElementById('browse-by-room')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection
        title="Nowest Interior Ltd"
        subtitle="Luxury Blinds & Curtains Handcrafted in the UK Since 2002"
        video={heroVideo}
        image={heroImage}
        onExplore={scrollToExplorer}
      />

      <ScrollContactCard />

      <SignatureCollection projects={signatureProjects} />

      {/* Browse by Room Section */}
      <section id="browse-by-room" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4 md:mb-6 px-2">
              browse by room
            </h2>
            {/* Horizontal line with dot in the middle */}
            <div className="flex items-center justify-center mb-6 sm:mb-8 md:mb-12">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="w-2 h-2 bg-black rounded-full mx-2"></div>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Room Cards Grid - Arched Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Kitchen */}
            <div 
              className="group cursor-pointer"
              onClick={() => setLocation('/kitchen')}
            >
              <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp"
                    alt="Kitchen"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/LOGO PNG.png';
                      e.currentTarget.className = 'w-full h-full object-contain p-8';
                    }}
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-6 text-center">
                  <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold" style={{ color: '#B8860B' }}>
                    KITCHEN
                  </h3>
                </div>
              </div>
            </div>

            {/* Bathroom */}
            <div 
              className="group cursor-pointer"
              onClick={() => setLocation('/bathroom')}
            >
              <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp"
                    alt="Bathroom"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/LOGO PNG.png';
                      e.currentTarget.className = 'w-full h-full object-contain p-8';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#B8860B' }}>
                    BATHROOM
                  </h3>
                </div>
              </div>
            </div>

            {/* Bedroom */}
            <div 
              className="group cursor-pointer"
              onClick={() => setLocation('/bedroom')}
            >
              <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp"
                    alt="Bedroom"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/LOGO PNG.png';
                      e.currentTarget.className = 'w-full h-full object-contain p-8';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#B8860B' }}>
                    BEDROOM
                  </h3>
                </div>
              </div>
            </div>

            {/* Living Room */}
            <div 
              className="group cursor-pointer"
              onClick={() => setLocation('/living-room')}
            >
              <div className="relative overflow-hidden rounded-t-[50%] rounded-b-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp"
                    alt="Living Room"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/LOGO PNG.png';
                      e.currentTarget.className = 'w-full h-full object-contain p-8';
                    }}
                  />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="font-serif text-lg sm:text-xl font-bold" style={{ color: '#B8860B' }}>
                    LIVING ROOM
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 text-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto">
          
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 px-2 animate-fade-slide-up" data-testid="text-cta-heading">
            Transform Your Home Today
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-4 animate-fade-slide-up" style={{ animationDelay: '200ms' }}>
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
