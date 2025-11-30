import { useState, useEffect } from 'react';
import { Star, CheckCircle, DollarSign, Zap, Shield, Wrench, MessageCircle, Home, Palette, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

// Import why choose us images
import nowestInteriorImg from '@assets/generated_images/nowest-interior.jpg';
import londonBlindFittersImg from '@assets/generated_images/london-blind-fitters.png';

// Import review platform images
import houzzImg from '@assets/generated_images/Best-of-Houzz-Service-Social-Post-1024x1024-1-576x576.png';
import yellImg from '@assets/generated_images/Yell_5_star.jpg';
import googleReviewsImg from '@assets/generated_images/Google-Reviews-768x432.png';
import trustpilotImg from '@assets/generated_images/trust.png';

export default function WhyChooseUs() {
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

  const whyChooseFeatures = [
    {
      icon: CheckCircle,
      title: 'Top-Quality Products',
      description: 'All products manufactured in the UK to the highest possible standard. We work closely with suppliers to ensure high-quality durable products.'
    },
    {
      icon: DollarSign,
      title: 'Competitive Price & Price Match Promise',
      description: 'Quality doesn\'t have to mean soaring prices. We help you save budget with first-class products at the cheapest price. Find it cheaper elsewhere? We\'ll match it.'
    },
    {
      icon: Star,
      title: '5-Star Customer Rating',
      description: 'Nowest always had a higher level of customer satisfaction. We\'re proud to say we always hear positive comments from every single customer.'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Nowest Interior promises the fastest turnaround on all our products in the UK. We know how valuable your time is and understand you want it quickly.'
    },
    {
      icon: Shield,
      title: 'Two Years Guarantee',
      description: 'Our products are of the highest quality with a 2-year unrivalled guarantee covering all internal mechanisms, components, brackets, fabric delamination, and operational cords.'
    },
    {
      icon: Wrench,
      title: 'Experts in Our Field',
      description: 'We\'ve been a well-respected business for over 15 years of experience and are very efficient and effective in what we do.'
    },
    {
      icon: MessageCircle,
      title: 'Personal Service',
      description: 'You will be looked after and guided through the whole process by one of our consultants whether you contact us online, email, or over the telephone.'
    },
    {
      icon: Home,
      title: 'British-Made, Handcrafted',
      description: 'Comprehensive range of luxury window treatments handmade to measure by our specialist workshop team right here in the UK with high standards and quality craftsmanship.'
    },
    {
      icon: Palette,
      title: 'Comprehensive Ranges',
      description: 'Wide range of blind styles, fabrics and colours including Roman blinds, vertical blinds, roller blinds, wooden blinds, vision blinds, visage blinds, pleated blinds, perfect fit blinds, and shutters.'
    }
  ];

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

      <section className="relative py-20 sm:py-24 md:py-28 px-3 sm:px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="animate-fade-slide-up">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 px-2 sm:px-4 leading-tight">
              Why Choose Nowest Interior Ltd
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 md:py-28 px-3 sm:px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">

          <div
            id="features-grid"
            data-animate
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* First Row - Cards 1, 2, 3 */}
            {whyChooseFeatures.slice(0, 3).map((feature, index) => {
              const Icon = feature.icon;
              const isVisible = visibleSections.has('features-grid');
              return (
                <div
                  key={index}
                  className={`group p-6 md:p-8 rounded-md border border-border bg-background hover-elevate active-elevate-2 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  data-testid={`feature-card-${index}`}
                  style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* First Image - Between First and Second Row */}
          <div className="my-12">
            <div
              id="nowest-interior-visual"
              data-animate
              className={`transition-all duration-700 ${
                visibleSections.has('nowest-interior-visual') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={nowestInteriorImg}
                    alt="Nowest Interior professional service"
                    className="w-full h-64 md:h-80 object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          <div
            id="features-grid-second"
            data-animate
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Second Row - Cards 4, 5, 6 */}
            {whyChooseFeatures.slice(3, 6).map((feature, index) => {
              const Icon = feature.icon;
              const isVisible = visibleSections.has('features-grid-second');
              return (
                <div
                  key={index + 3}
                  className={`group p-6 md:p-8 rounded-md border border-border bg-background hover-elevate active-elevate-2 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  data-testid={`feature-card-${index + 3}`}
                  style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Second Image - Between Second and Third Row */}
          <div className="my-12">
            <div
              id="london-blind-fitters-visual"
              data-animate
              className={`transition-all duration-700 ${
                visibleSections.has('london-blind-fitters-visual') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={londonBlindFittersImg}
                    alt="London blind fitters professional installation"
                    className="w-full h-64 md:h-80 object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          <div
            id="features-grid-third"
            data-animate
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Third Row - Cards 7, 8, 9 */}
            {whyChooseFeatures.slice(6, 9).map((feature, index) => {
              const Icon = feature.icon;
              const isVisible = visibleSections.has('features-grid-third');
              return (
                <div
                  key={index + 6}
                  className={`group p-6 md:p-8 rounded-md border border-border bg-background hover-elevate active-elevate-2 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  data-testid={`feature-card-${index + 6}`}
                  style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
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
