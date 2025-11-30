import { useState, useEffect } from 'react';
import ProcessTimeline from '@/components/ProcessTimeline';
import { Star, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

// Import review platform images
import houzzImg from '@assets/generated_images/Best-of-Houzz-Service-Social-Post-1024x1024-1-576x576.png';
import yellImg from '@assets/generated_images/Yell_5_star.jpg';
import googleReviewsImg from '@assets/generated_images/Google-Reviews-768x432.png';
import trustpilotImg from '@assets/generated_images/trust.png';

export default function OurProcess() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [, setLocation] = useLocation();

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
      {/* Back Button */}
      <div className="fixed top-16 sm:top-20 left-2 sm:left-4 z-40">
        <button
          onClick={() => setLocation('/about')}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-background/90 backdrop-blur-sm border border-border rounded-full shadow-lg hover:bg-muted transition-all duration-200 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs sm:text-sm font-medium">Back to About</span>
        </button>
      </div>


      <section className="py-20 sm:py-24 md:py-28 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              Our Process
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4">
              From initial consultation to final installation, we guide you through every step
            </p>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* Our Reviews Section */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-24 sm:pb-28 md:pb-32 px-3 sm:px-4 bg-card/30">
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

    </div>
  );
}
