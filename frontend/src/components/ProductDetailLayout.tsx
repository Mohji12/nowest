import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';

interface ProductDetailLayoutProps {
  name: string;
  subheading: string;
  description: string[];
  features: string[];
  heroImage: string;
  images: string[];
}

export default function ProductDetailLayout({
  name,
  subheading,
  description,
  features,
  heroImage,
  images,
}: ProductDetailLayoutProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <div className="relative w-full" style={{ minHeight: '300px' }}>
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover"
          style={{ minHeight: '300px', width: '100%' }}
          onError={(e) => {
            console.error('Product image failed to load:', heroImage);
            e.currentTarget.src = '/assets/LOGO PNG.png';
            e.currentTarget.className = 'w-full h-full object-contain p-8';
          }}
        />
      </div>

      {/* Main Content Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setLocation('/products')}
            className="flex items-center text-gray-600 hover:text-golden-orange mb-8 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {'<'} Back to Range Page
          </button>

          {/* Product Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-3 sm:mb-4">
            {name.toLowerCase()}
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 sm:mb-8 uppercase tracking-wide">
            {subheading}
          </p>

          {/* Description */}
          <div className="mb-12 sm:mb-16 space-y-4">
            {description.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image Gallery Section */}
          {images && images.length > 0 && (
            <div className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">
                Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={image}
                      alt={`${name} - Image ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.error('Gallery image failed to load:', image);
                        e.currentTarget.src = heroImage;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features & Benefits Section */}
          <div className="border-t border-gray-200 pt-8 sm:pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Column - Image (first image from gallery if available) */}
              {images && images.length > 0 && (
                <div className="order-2 md:order-1">
                  <img
                    src={images[0]}
                    alt={`${name} feature`}
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{ maxHeight: '500px' }}
                    onError={(e) => {
                      console.error('Feature image failed to load:', images[0]);
                      e.currentTarget.src = heroImage;
                    }}
                  />
                </div>
              )}
              
              {/* Right Column - Features List */}
              <div className={`order-1 ${images && images.length > 0 ? 'md:order-2' : 'md:col-span-2'}`}>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8">
                  features & benefits
                </h2>
                <ul className="space-y-3 sm:space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start text-base sm:text-lg text-gray-700">
                      <span className="text-golden-orange mr-3 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Get Quote Button Section */}
      <section className="py-12 sm:py-16 md:py-20 pb-24 sm:pb-28 md:pb-32 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => setLocation('/contact')}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg"
          >
            Get Quote
          </button>
        </div>
      </section>
    </div>
  );
}

