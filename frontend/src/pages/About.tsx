import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

// Import actual images from attached_assets
import consultingImg from '@assets/stock_images/professional_interio_c6db885a.jpg';
import hotelImg from '@assets/stock_images/luxury_hotel_interio_aae16878.jpg';

// Import review platform images
import houzzImg from '@assets/generated_images/Best-of-Houzz-Service-Social-Post-1024x1024-1-576x576.png';
import yellImg from '@assets/generated_images/Yell_5_star.jpg';
import googleReviewsImg from '@assets/generated_images/Google-Reviews-768x432.png';
import trustpilotImg from '@assets/generated_images/trust.png';


export default function About() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);


  return (
    <div>
      <section className="relative py-20 sm:py-24 md:py-28 px-3 sm:px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="animate-fade-slide-up">
            <div className="mb-6 sm:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
            />
            </div>
            <p className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
              Welcome to Nowest Interior Ltd
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 px-2 sm:px-4 leading-tight" data-testid="text-about-page-title">
              Crafting Beautiful Spaces Since 2002
            </h1>
            <div className="w-12 sm:w-16 md:w-24 h-1 bg-primary mx-auto mb-3 sm:mb-4 md:mb-6" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed">
              It's often challenging to turn your interior dreams into reality. That's where we come in. 
              We help you design stunning spaces that reflect your personality and lifestyle.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28 md:py-32 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div
            id="story-section"
            data-animate
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center transition-all duration-700 ${
              visibleSections.has('story-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                Our Story
              </h2>
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nowest Interior Ltd began in 2002 under the name Norwest Fitters, starting as a small, family-run business. 
                  Over the years, our passion, dedication, and commitment to quality have helped us grow into a respected company 
                  known for excellence in both window treatments and installation services.
                </p>
                <p>
                  For more than 15 years, we've been proudly supplying and fitting a wide range of blinds and curtains, 
                  combining stylish design with precision craftsmanship.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 group">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={consultingImg}
                  alt="Professional consultation for window treatments"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>

          <div
            id="clients-section"
            data-animate
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-16 transition-all duration-700 ${
              visibleSections.has('clients-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group">
              <div className="relative overflow-hidden rounded-md">
                <img
                  src={hotelImg}
                  alt="Luxury hotel interior with elegant window treatments"
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Who We Work With
              </h2>
              <div className="space-y-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Over the years, we've had the privilege of working with a wide range of clients, including interior designers, 
                  property developers, estate agents, universities, hotels, and sports and leisure venues.
                </p>
                <p>
                  We're especially proud to have completed projects for several top Premier League football clubs, 
                  both in and outside London.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pt-32 sm:pt-36 md:pt-40 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Our Reviews
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4">
              See what our customers are saying about us across different platforms
            </p>
          </div>

          <div
            id="reviews-section"
            data-animate
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-700 ${
              visibleSections.has('reviews-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Houzz */}
            <div className="group p-4 sm:p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://www.houzz.co.uk/professionals/curtains-blinds-and-shutters/nowest-interior-ltd-pfvwgb-pf~597124030" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-40 sm:h-48 mb-3 sm:mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={houzzImg}
                    alt="Best of Houzz Service Award"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-base sm:text-lg font-bold mb-2">Best of Houzz</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">Service Award Winner</p>
            </div>

            {/* Yell */}
            <div className="group p-4 sm:p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://www.yell.com/biz/nowest-interior-wembley-8176292/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-40 sm:h-48 mb-3 sm:mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={yellImg}
                    alt="Yell 5 Star Rating"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-base sm:text-lg font-bold mb-2">Yell</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">5 Star Rating</p>
            </div>

            {/* Google Reviews */}
            <div className="group p-4 sm:p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://www.google.com/maps/place/Nowest+Fitter/@51.574682,-0.8619938,9z/data=!3m1!4b1!4m5!3m4!1s0x487613d659bf9473:0xbf1f9556d2d4e5ef!8m2!3d51.5760164!4d-0.301589" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-40 sm:h-48 mb-3 sm:mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={googleReviewsImg}
                    alt="Google Reviews Rating"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-base sm:text-lg font-bold mb-2">Google Reviews</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">5.0 Average Rating</p>
            </div>

            {/* Trustpilot */}
            <div className="group p-4 sm:p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://uk.trustpilot.com/review/nowestinterior.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-40 sm:h-48 mb-3 sm:mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={trustpilotImg}
                    alt="Trustpilot Rating"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-base sm:text-lg font-bold mb-2">Trustpilot</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">4.9/5 (123 Reviews)</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="promise-section"
        data-animate
        className={`py-28 md:py-32 px-4 bg-card/30 transition-all duration-700 ${
          visibleSections.has('promise-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our Promise
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 px-4">
            At Nowest Interior Ltd, customer satisfaction is at the heart of everything we do. 
            Our fabulous range of products, combined with our professional fitting service, ensures that every customer 
            enjoys a seamless experience and a beautiful result.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 px-4">
            We're proud to have earned countless positive reviews and long-lasting relationships with customers 
            who continue to recommend us after more than two decades in business.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-primary">
            Your home deserves the best — and that's exactly what we deliver.
          </p>
        </div>
      </section>

      <section className="relative pt-32 sm:pt-36 md:pt-40 pb-28 md:pb-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
        
        <div className="relative max-w-3xl mx-auto">
          <div className="animate-fade-slide-up">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 px-4 max-w-2xl mx-auto leading-relaxed">
              Book a free home consultation and discover how we can bring your interior dreams to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Button
                size="lg"
                className="group w-full sm:w-auto"
                data-testid="button-start-consultation"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                data-testid="button-view-products"
              >
                View Our Products
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
