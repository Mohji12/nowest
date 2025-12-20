import { useRoute } from 'wouter';
import { ArrowLeft } from 'lucide-react';

// Import product images
import rollerBlindsImg from '@assets/stock_images/roller_blinds_modern_b7d98dd5.jpg';
import woodVenetianImg from '@assets/stock_images/wooden_venetian_blin_7e7829a6.jpg';
import verticalBlindsImg from '@assets/stock_images/vertical_blinds_pati_2902750d.jpg';
import romanBlindsImg from '@assets/stock_images/roman_blinds_luxury__00686ca9.jpg';
import shuttersImg from '@assets/stock_images/plantation_shutters__c750720c.jpg';
import motorizedBlindsImg from '@assets/stock_images/motorized_automated__4b820a60.jpg';
import cellularBlindsImg from '@assets/stock_images/pleated_honeycomb_bl_2663b2e3.jpg';

// S3 URLs
const MOTORIZED_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_automated__978f737d.jpg';
const PLEATED_PANEL_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/panel_blinds_sliding_0c1c0c07.jpg';

// Portfolio images from S3 Nowest_Image folder - distributed across product types
const PORTFOLIO_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Bamboo_pacific-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Portrait-size-Natural_Grey_Cameo_Fabric.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/PFNG-Image.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flores-Biscuit.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ortega-Cranberry-Haven-Sky.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Verdant-Teal-Haven-Lipstick.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/voile-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Lush-Maya-1-600x545.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/belle-peony-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/calista-mineral-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/cielo-amethyst-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/flores-mineral-2-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/folina-slate-2-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/pavo-teal-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/verdant-teal-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Picture2.png',
];

// Helper function to get unique images for each product type
const getProductImages = (startIndex: number, count: number = 3): string[] => {
  const images: string[] = [];
  for (let i = 0; i < count; i++) {
    const index = (startIndex + i) % PORTFOLIO_IMAGES.length;
    images.push(PORTFOLIO_IMAGES[index]);
  }
  return images;
};

// Product types data with detailed descriptions and images
const productTypesData: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  images: string[];
  mainImage: string;
}> = {
  'roller-blinds': {
    name: 'Roller Blinds',
    description: 'Clean, modern lines with excellent light control and privacy.',
    longDescription: 'Roller blinds offer a sleek, minimalist solution for any window. With a wide range of fabrics from sheer to blackout, they provide perfect light control and privacy. Easy to operate and maintain, roller blinds are ideal for contemporary homes and offices. Available in various colors and patterns to match your interior design.',
    features: [
      'Wide range of fabric options',
      'Easy operation with chain or motorized control',
      'Space-saving design',
      'Available in blackout, dimout, and sheer options',
      'Suitable for all window sizes',
    ],
    images: getProductImages(0, 4),
    mainImage: getProductImages(0, 1)[0],
  },
  'vertical-blinds': {
    name: 'Vertical Blinds',
    description: 'Perfect for large windows and sliding doors with versatile light control.',
    longDescription: 'Vertical blinds are the perfect choice for large windows, sliding doors, and patio doors. Their vertical slats can be rotated to control light and privacy, or drawn to one side for an unobstructed view. Available in fabric, PVC, and aluminum, they offer durability and style for any space.',
    features: [
      'Ideal for large windows and doors',
      'Rotating slats for precise light control',
      'Available in fabric, PVC, and aluminum',
      'Easy to clean and maintain',
      'Perfect for sliding doors',
    ],
    images: getProductImages(3, 4),
    mainImage: getProductImages(3, 1)[0],
  },
  'vision-blinds': {
    name: 'Vision® Blinds',
    description: 'Innovative fabric technology offering privacy with an unobstructed view.',
    longDescription: 'Vision® blinds feature innovative fabric technology that allows you to see out while maintaining privacy from the outside. The unique fabric structure creates a one-way vision effect, making them perfect for ground-floor windows and spaces where you want natural light and views without compromising privacy.',
    features: [
      'One-way vision technology',
      'Maintains natural light',
      'Privacy without blocking views',
      'Modern, sleek appearance',
      'Perfect for ground-floor windows',
    ],
    images: getProductImages(7, 4),
    mainImage: getProductImages(7, 1)[0],
  },
  'allusion-blinds': {
    name: 'Allusion® Blinds',
    description: 'A combination of sheer and opaque textured fabric for elegant light control.',
    longDescription: 'Allusion® blinds combine the best of both worlds with alternating translucent and opaque stripes. This innovative design allows you to control light and privacy by simply adjusting the blind position. When closed, the opaque stripes align to provide privacy, and when open, the translucent stripes allow natural light to filter through beautifully.',
    features: [
      'Alternating translucent and opaque stripes',
      'Versatile light and privacy control',
      'Elegant textured fabric',
      'Modern design aesthetic',
      'Suitable for all room types',
    ],
    images: getProductImages(8, 4),
    mainImage: getProductImages(8, 1)[0],
  },
  'cellular-pleated-blinds': {
    name: 'Cellular and Pleated Blinds',
    description: 'Energy-efficient honeycomb design providing excellent insulation and light control.',
    longDescription: 'Cellular and pleated blinds feature a unique honeycomb structure that traps air, providing excellent thermal insulation. This makes them perfect for reducing energy costs while maintaining comfort. Available in single, double, and triple cell options, they offer varying levels of insulation and light control.',
    features: [
      'Honeycomb structure for insulation',
      'Energy-efficient design',
      'Available in single, double, and triple cell',
      'Excellent light control',
      'Wide range of colors and patterns',
    ],
    images: getProductImages(11, 4),
    mainImage: getProductImages(11, 1)[0],
  },
  'panel-blinds': {
    name: 'Panel Blinds',
    description: 'Modern sliding panels perfect for large windows and contemporary spaces.',
    longDescription: 'Panel blinds feature large fabric panels that slide smoothly along a track system. Perfect for covering large windows, sliding doors, and room dividers, they offer a modern, minimalist aesthetic. Available in various fabric options and colors, panel blinds can be customized to match any interior design style.',
    features: [
      'Large fabric panels',
      'Smooth sliding mechanism',
      'Perfect for large windows',
      'Modern, minimalist design',
      'Customizable fabric options',
    ],
    images: getProductImages(15, 4),
    mainImage: getProductImages(15, 1)[0],
  },
  'perfect-fit-blinds': {
    name: 'Perfect Fit® Blinds',
    description: 'No drilling required - fits perfectly inside your window frame.',
    longDescription: 'Perfect Fit® blinds are designed to fit snugly inside your window frame without any drilling or screws. They use a unique clip system that attaches directly to the window frame, making installation quick and easy. Available in various styles including roller, pleated, and Venetian, Perfect Fit blinds are ideal for uPVC windows and doors.',
    features: [
      'No drilling required',
      'Quick and easy installation',
      'Perfect fit inside window frame',
      'Available in multiple styles',
      'Ideal for uPVC windows',
    ],
    images: getProductImages(13, 4),
    mainImage: getProductImages(13, 1)[0],
  },
  'conservatory-blinds': {
    name: 'Conservatory Blinds',
    description: 'Specialized blinds designed for conservatories and sunrooms.',
    longDescription: 'Conservatory blinds are specifically designed to handle the unique challenges of conservatories and sunrooms. They help control temperature, reduce glare, and provide privacy while maintaining the bright, airy feel of these spaces. Available in various styles and materials, conservatory blinds can be fitted to roof windows, side windows, and doors.',
    features: [
      'Temperature control',
      'Glare reduction',
      'UV protection',
      'Fits roof and side windows',
      'Maintains natural light',
    ],
    images: getProductImages(19, 4),
    mainImage: getProductImages(19, 1)[0],
  },
  'motorised-blinds': {
    name: 'Motorised Blinds',
    description: 'Automated blinds for ultimate convenience and smart home integration.',
    longDescription: 'Motorised blinds offer the ultimate in convenience and luxury. Control your blinds with a remote, smartphone app, or integrate them into your smart home system. Perfect for hard-to-reach windows, large installations, or simply for added convenience. Motorised blinds can be programmed to open and close at specific times, helping with energy efficiency and security.',
    features: [
      'Remote and app control',
      'Smart home integration',
      'Programmable schedules',
      'Perfect for hard-to-reach windows',
      'Energy-efficient automation',
    ],
    images: getProductImages(23, 4),
    mainImage: getProductImages(23, 1)[0],
  },
  'venetian-blinds': {
    name: 'Venetian Blinds',
    description: 'Classic horizontal slats available in wood, aluminum, and faux wood finishes.',
    longDescription: 'Venetian blinds are a timeless window treatment option. With horizontal slats that can be tilted to control light and privacy, they offer versatility and style. Available in wood, aluminum, and faux wood materials, Venetian blinds suit both traditional and modern interiors. They are easy to clean and maintain, making them a practical choice for any home.',
    features: [
      'Tilting slats for light control',
      'Available in wood, aluminum, and faux wood',
      'Timeless design',
      'Easy to clean',
      'Suitable for all room types',
    ],
    images: getProductImages(27, 4),
    mainImage: getProductImages(27, 1)[0],
  },
  'urban-shutters': {
    name: 'Urban Shutters by Louvolite',
    description: 'Contemporary shutters with a sleek, modern design perfect for urban homes.',
    longDescription: 'Urban Shutters by Louvolite combine contemporary design with traditional shutter functionality. These modern shutters feature clean lines and a sleek appearance, making them perfect for urban homes and modern interiors. Available in various colors and finishes, Urban Shutters provide excellent light control, privacy, and insulation.',
    features: [
      'Contemporary design',
      'Clean, modern lines',
      'Excellent light control',
      'Privacy and insulation',
      'Various colors and finishes',
    ],
    images: getProductImages(31, 4),
    mainImage: getProductImages(31, 1)[0],
  },
  'precision-roller-blind': {
    name: 'Precision Roller Blind by Louvolite',
    description: 'Premium roller blinds with precision engineering and superior quality.',
    longDescription: 'The Precision Roller Blind by Louvolite represents the pinnacle of roller blind engineering. With precision mechanisms and premium materials, these blinds offer smooth operation and long-lasting performance. Available in a wide range of fabrics and colors, they combine functionality with style.',
    features: [
      'Precision engineering',
      'Premium materials',
      'Smooth operation',
      'Wide range of fabrics',
      'Long-lasting performance',
    ],
    images: getProductImages(1, 4),
    mainImage: getProductImages(1, 1)[0],
  },
  'romashade': {
    name: 'RomaShade® by Louvolite',
    description: 'Elegant Roman-style blinds with smooth, cascading folds.',
    longDescription: 'RomaShade® by Louvolite brings the elegance of Roman blinds with modern functionality. These blinds feature smooth, cascading folds that create a sophisticated look when raised and provide excellent coverage when lowered. Available in various fabrics and colors, RomaShade blinds add elegance to any room.',
    features: [
      'Smooth cascading folds',
      'Elegant Roman style',
      'Excellent light control',
      'Various fabric options',
      'Sophisticated appearance',
    ],
    images: getProductImages(35, 4),
    mainImage: getProductImages(35, 1)[0],
  },
  'perfect-fit-shutters-lite': {
    name: 'Perfect Fit Shutters Lite',
    description: 'Lightweight shutters that fit perfectly without drilling.',
    longDescription: 'Perfect Fit Shutters Lite combine the elegance of shutters with the convenience of no-drill installation. These lightweight shutters fit perfectly inside your window frame using a clip system, making installation quick and easy. Available in various colors and styles, they provide excellent light control and privacy.',
    features: [
      'No drilling required',
      'Lightweight design',
      'Easy installation',
      'Perfect fit inside frame',
      'Various colors and styles',
    ],
    images: getProductImages(39, 4),
    mainImage: getProductImages(39, 1)[0],
  },
};

export default function ProductTypeDetail() {
  const [, params] = useRoute('/products/:productTypeId');
  const productTypeId = params?.productTypeId || '';
  const productData = productTypesData[productTypeId];

  if (!productData) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product type you're looking for doesn't exist.</p>
          <a href="/products" className="text-golden-orange hover:underline">Back to Products</a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-20 md:py-24 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-golden-orange mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </button>

        {/* Main Image */}
        <div className="mb-8 sm:mb-12">
          <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
            <img
              src={productData.mainImage}
              alt={productData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('LOGO PNG')) {
                  target.src = '/assets/LOGO PNG.png';
                  target.className = 'w-full h-full object-contain p-8';
                }
              }}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black">
            {productData.name}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
            {productData.longDescription}
          </p>

          {/* Features */}
          <div className="bg-gray-50 rounded-lg p-6 sm:p-8 mb-8">
            <h2 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">
              Key Features
            </h2>
            <ul className="space-y-3 sm:space-y-4">
              {productData.features.map((feature, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-golden-orange mr-3 mt-1">✓</span>
                  <span className="text-base sm:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image Gallery */}
        {productData.images.length > 1 && (
          <div className="mb-8 sm:mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-black">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {productData.images.map((image, index) => (
                <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={image}
                    alt={`${productData.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('LOGO PNG')) {
                        target.src = '/assets/LOGO PNG.png';
                        target.className = 'w-full h-full object-contain p-4';
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-golden-orange/10 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-black">
            Interested in {productData.name}?
          </h2>
          <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-lg">
            Contact us for a free consultation and quote
          </p>
          <a
            href="/contact"
            className="inline-block bg-golden-orange hover:bg-golden-orange/90 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-colors duration-200"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}

