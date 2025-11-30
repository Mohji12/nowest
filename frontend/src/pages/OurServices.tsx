import { useState, useEffect } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

// Import service images
import warrantyImg from '@assets/generated_images/2-year-warranty.jpg';
import curtainsImg from '@assets/generated_images/made-to-measure-curtains-london.jpg';
import blindsImg from '@assets/generated_images/made-to-measure-blinds-london.jpg';
import shuttersImg from '@assets/generated_images/MADE-TO-MEASURE-SHUTTERS.jpg';
import tracksImg from '@assets/generated_images/tracks-and-poles-london.jpg';
import installersImg from '@assets/generated_images/curtain-and-blind-installers-london.jpg';
import homeVisitImg from '@assets/generated_images/curtain-installers-london.jpg';

// Import review platform images
import houzzImg from '@assets/generated_images/Best-of-Houzz-Service-Social-Post-1024x1024-1-576x576.png';
import yellImg from '@assets/generated_images/Yell_5_star.jpg';
import googleReviewsImg from '@assets/generated_images/Google-Reviews-768x432.png';
import trustpilotImg from '@assets/generated_images/trust.png';

export default function OurServices() {
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
              Our Services
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2 sm:px-4">
              Comprehensive window treatment solutions from consultation to installation
            </p>
          </div>

          {/* Free Home Visits */}
          <div
            id="home-visit-section"
            data-animate
            className={`mb-12 md:mb-16 transition-all duration-700 ${
              visibleSections.has('home-visit-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={homeVisitImg}
                    alt="Free home consultation service"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Free Home Visits
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Many people are worried when it comes to measuring or taking a decision in what they really want. 
                  It's ideal to use Nowest Interior's free in-home services to discuss all your requirements.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Expert Advice:</strong>
                      <span className="text-muted-foreground"> Friendly home consultants with expert advice</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Measuring:</strong>
                      <span className="text-muted-foreground"> Exact measurements for perfect fit</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Sampling:</strong>
                      <span className="text-muted-foreground"> See samples in your home surroundings</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-foreground">Price Match Guarantee:</strong>
                      <span className="text-muted-foreground"> We guarantee to beat any prices</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Two Years Guarantee */}
          <div
            id="guarantee-section"
            data-animate
            className={`mb-12 md:mb-16 transition-all duration-700 ${
              visibleSections.has('guarantee-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Two Years Guarantee
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Our products are of the highest quality, and to support this statement we provide a 2-year unrivalled guarantee.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  Your guarantee covers defects in materials of:
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">All internal mechanisms</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Components and brackets</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Fabric delamination</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Operational cords</span>
                  </li>
                </ul>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={warrantyImg}
                    alt="2 year warranty guarantee"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Made to Measure Curtains and Voiles */}
          <div
            id="curtains-section"
            data-animate
            className={`mb-12 md:mb-16 transition-all duration-700 ${
              visibleSections.has('curtains-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={curtainsImg}
                    alt="Made to measure curtains and voiles"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Made to Measure Curtains and Voiles
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Our made to measure curtain and voile service offers you a wide range of over 1000 beautiful fabrics 
                  from UK's top best fabric suppliers.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  We have a wide range of modern, traditional and well-known brand fabrics for you to choose from, 
                  all hand and machine made in the UK.
                </p>
                <p className="text-base text-muted-foreground">
                  Choose from pencil pleat, Eyelet, Double pinch pleat, Triple pinch pleat, Goblet pleat, 
                  single pleat, Wave heading in different finishes. We also offer pelmets, tie backs and cushions.
                </p>
              </div>
            </div>
          </div>

          {/* Tracks and Poles */}
          <div
            id="tracks-section"
            data-animate
            className={`mb-12 md:mb-16 transition-all duration-700 ${
              visibleSections.has('tracks-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Tracks and Poles
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Here at Nowest Interior, we offer a wider selection of tracks and poles from UK's largest 
                  selection of top-quality tracks and poles suppliers.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  Our made to measure curtains poles and tracks are custom products including:
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Solutions for straight and bay windows</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Heavy duty bay window tracks</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Extra-long tracks and poles</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Curved and angled designs</span>
                  </li>
                  <li className="flex gap-3">
                    <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">Motorised tracks</span>
                  </li>
                </ul>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={tracksImg}
                    alt="Tracks and poles installation"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Made to Measure Blinds */}
          <div
            id="blinds-section"
            data-animate
            className={`mb-12 md:mb-16 transition-all duration-700 ${
              visibleSections.has('blinds-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={blindsImg}
                    alt="Made to measure blinds"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Made to Measure Blinds
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  Add that extra touch of luxury to your home by having your blinds made to fit your windows perfectly. 
                  Our made to measure blind service offers you the freedom to choose from over 1000 fabric options.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  All our blinds are manufactured using Louvolite components, one of the UK's well-known manufacturers.
                </p>
                <p className="text-base text-muted-foreground">
                  We have different variety of blinds like Roller, Vertical, Roman, Wood/Metal Venetian, 
                  Perfect Fit, Vision, Visage, Panel and Motorised blinds with light filtering control.
                </p>
              </div>
            </div>
          </div>

          {/* Made to Measure Shutters */}
          <div
            id="shutters-section"
            data-animate
            className={`mb-12 md:mb-16 transition-all duration-700 ${
              visibleSections.has('shutters-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Made to Measure Shutters
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  We have a comprehensive range of styles and finishes to choose from which are strong and more stable build. 
                  We provide you with the highest quality with a 2 year warranty.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  Sandringham Shutters are made-to-order with styles and finishes to suit any window, taste or budget.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  With five different wood types in a choice of styles including full height, cafe style, 
                  tier-on-tier, tracked, shaped and solid panels.
                </p>
                <p className="text-base text-muted-foreground">
                  There are 117 wonderful painted and stained colour finishes to choose from – 
                  that's definitely a colour for everyone's taste!
                </p>
              </div>
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={shuttersImg}
                    alt="Made to measure shutters"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Complete Fitting Service */}
          <div
            id="fitting-section"
            data-animate
            className={`transition-all duration-700 ${
              visibleSections.has('fitting-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="group">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={installersImg}
                    alt="Professional installation service"
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
                  Complete Fitting Service
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 leading-relaxed">
                  We install for every type of customers from a single house to any commercial buildings. 
                  Our work is established in the business world too.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  We have shown our talents by fitting curtains, tracks and blinds in football clubs, 
                  schools, universities, individual shops, malls, surgeries and many more places.
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  Our team works so efficiently and effectively bringing out a wider range of customer 
                  satisfaction in many areas in London, out of London and Europe.
                </p>
                <div className="mt-4">
                  <h4 className="font-serif text-lg font-bold mb-2">Our Fitters:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">Professional fitting with no fuss and disruption</span>
                    </li>
                    <li className="flex gap-3">
                      <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">Fast, friendly, efficient and punctual</span>
                    </li>
                    <li className="flex gap-3">
                      <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">Respect property and clean up after installation</span>
                    </li>
                    <li className="flex gap-3">
                      <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">Available weekends and evenings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Reviews Section */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-24 md:pb-28 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Our Reviews
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
              See what our customers are saying about us across different platforms
            </p>
          </div>

          <div
            id="reviews-section"
            data-animate
            className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
              visibleSections.has('reviews-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Houzz */}
            <div className="group p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://www.houzz.co.uk/professionals/curtains-blinds-and-shutters/nowest-interior-ltd-pfvwgb-pf~597124030" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-48 mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={houzzImg}
                    alt="Best of Houzz Service Award"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-lg font-bold mb-2">Best of Houzz</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Service Award Winner</p>
            </div>

            {/* Yell */}
            <div className="group p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://www.yell.com/biz/nowest-interior-wembley-8176292/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-48 mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={yellImg}
                    alt="Yell 5 Star Rating"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-lg font-bold mb-2">Yell</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">5 Star Rating</p>
            </div>

            {/* Google Reviews */}
            <div className="group p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://www.google.com/maps/place/Nowest+Fitter/@51.574682,-0.8619938,9z/data=!3m1!4b1!4m5!3m4!1s0x487613d659bf9473:0xbf1f9556d2d4e5ef!8m2!3d51.5760164!4d-0.301589" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-48 mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={googleReviewsImg}
                    alt="Google Reviews Rating"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-lg font-bold mb-2">Google Reviews</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">5.0 Average Rating</p>
            </div>

            {/* Trustpilot */}
            <div className="group p-6 rounded-md border border-border bg-background hover-elevate transition-all duration-300">
              <a 
                href="https://uk.trustpilot.com/review/nowestinterior.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="h-48 mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center cursor-pointer">
                  <img
                    src={trustpilotImg}
                    alt="Trustpilot Rating"
                    className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <h3 className="font-serif text-lg font-bold mb-2">Trustpilot</h3>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">4.9/5 (123 Reviews)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
