import { useRoute, useLocation } from 'wouter';
import ProductDetailLayout from '@/components/ProductDetailLayout';

// Import product images
import rollerBlindsImg from '@assets/stock_images/roller_blinds_modern_b7d98dd5.jpg';
import woodVenetianImg from '@assets/stock_images/wooden_venetian_blin_7e7829a6.jpg';
import verticalBlindsImg from '@assets/stock_images/vertical_blinds_pati_2902750d.jpg';
import romanBlindsImg from '@assets/stock_images/roman_blinds_luxury__00686ca9.jpg';
import shuttersImg from '@assets/stock_images/plantation_shutters__c750720c.jpg';
import curtainsImg from '@assets/stock_images/luxury_made_to_measu_6dae048d.jpg';
import curtainsImg2 from '@assets/stock_images/luxury_made_to_measu_df4fc3f5.jpg';
import curtainsImg3 from '@assets/stock_images/made_to_measure_luxu_14f11c74.jpg';
import velvetCurtainsImg from '@assets/stock_images/velvet_curtains_rich_182d7870.jpg';
import silkCurtainsImg from '@assets/stock_images/silk_curtains_luxury_7a06336f.jpg';
import layeredCurtainsImg from '@assets/stock_images/layered_curtains_she_0428ff9d.jpg';

// S3 URLs
const MOTORIZED_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_automated__978f737d.jpg';
const PLEATED_PANEL_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/panel_blinds_sliding_0c1c0c07.jpg';
const CONSERVATORY_BLINDS_BASE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/conservatory+blinds';
const CONSERVATORY_BLINDS_S3_IMAGES = [
  `${CONSERVATORY_BLINDS_BASE}/A_spacious_and_airy_Edwardian_202606220345.jpeg`,
  `${CONSERVATORY_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+03_45_18+AM.png`,
  `${CONSERVATORY_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+03_46_51+AM.png`,
];

// Product detail data
const productDetails: Record<string, {
  name: string;
  subheading: string;
  description: string[]; // Multiple paragraphs
  features: string[];
  heroImage: string;
  images: string[]; // At least 3 images per product
}> = {
  'roller-blinds': {
    name: 'Roller Blinds',
    subheading: 'STYLISH, SIMPLE & MODERN',
    description: [
      'Roller blinds are a stylish and practical window shade that can be a real focal point in the home. Our Louvolite window roller blinds collection offers a diverse range of fabric blinds with lustrous weaves and textures. Choose from prints that range from bold to tastefully simple, with effective blockouts for bedrooms and living spaces.',
      'Our roller blinds feature moisture resistant and Ultra-Fresh treated fabrics, making them perfect for bathrooms and kitchens. The innovative fabric technology ensures durability and easy maintenance, while the wide range of colors and patterns allows you to match any interior design style.',
      'For the ultimate in luxury & style, you can motorise your roller blinds with Louvolite One Touch® rechargeable motors. Customize with cassettes and bottom bars to create a truly bespoke window treatment solution that combines functionality with aesthetic appeal.'
    ],
    features: [
      'Stunning Roller blind fabric designs',
      'A tremendous collection of colours',
      'Energy saving Roller blind fabrics',
      'Can be motorised'
    ],
    heroImage: rollerBlindsImg,
    images: [
      rollerBlindsImg,
      '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
      verticalBlindsImg
    ]
  },
  'vertical-blinds': {
    name: 'Vertical Blinds',
    subheading: 'VERSATILE & ELEGANT',
    description: [
      'Vertical blinds are the perfect solution for large windows, sliding doors, and patio doors. Their elegant vertical slats can be rotated to control light and privacy with precision, or drawn to one side for an unobstructed view. This versatile design makes them ideal for both residential and commercial applications.',
      'Available in a wide range of fabrics, PVC, and aluminum materials, vertical blinds offer durability and style for any space. The variety of materials ensures you can find the perfect option for your specific needs, whether you require maximum light control, privacy, or aesthetic appeal.',
      'Perfect for modern homes and offices, they provide excellent light control while maintaining a sleek, contemporary appearance. The smooth operation and easy maintenance make vertical blinds a practical choice for busy households and commercial spaces.'
    ],
    features: [
      'Perfect for large windows and doors',
      'Versatile light control',
      'Available in multiple materials',
      'Easy to clean and maintain'
    ],
    heroImage: verticalBlindsImg,
    images: [
      verticalBlindsImg,
      rollerBlindsImg,
      '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp'
    ]
  },
  'vision-blinds': {
    name: 'Vision® Blinds',
    subheading: 'PRIVACY WITH A VIEW',
    description: [
      'Vision® blinds feature innovative fabric technology that offers privacy while maintaining an unobstructed view. This revolutionary fabric allows you to see out while preventing others from seeing in during daylight hours. The unique micro-perforated design creates a one-way vision effect that provides complete privacy without sacrificing natural light.',
      'Perfect for ground floor windows and rooms where you want natural light without compromising privacy. Whether you\'re working from home, relaxing in your living room, or enjoying breakfast in the kitchen, Vision® blinds ensure you can see the world outside while keeping your interior private.',
      'Vision® blinds are available in a range of colors and can be motorised for added convenience. The combination of cutting-edge technology and elegant design makes these blinds an ideal choice for modern homes where style and functionality are equally important.'
    ],
    features: [
      'Privacy with unobstructed view',
      'Innovative fabric technology',
      'Perfect for ground floor windows',
      'Available in multiple colours'
    ],
    heroImage: '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
    images: [
      '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
      '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
      rollerBlindsImg
    ]
  },
  'allusion-blinds': {
    name: 'Allusion® Blinds',
    subheading: 'ELEGANT & SOPHISTICATED',
    description: [
      'Allusion® blinds combine sheer and opaque textured fabric to create our most elegant blind yet. This unique design creates sophisticated light patterns in any room, offering the perfect balance between privacy and natural light. The alternating translucent and opaque stripes provide a contemporary aesthetic while maintaining functionality.',
      'The innovative fabric construction allows for precise light control - you can enjoy diffused natural light while maintaining privacy, or adjust the blind to create dramatic lighting effects throughout the day. This versatility makes Allusion® blinds perfect for spaces where you want both style and functionality.',
      'Available in a stunning range of colors and patterns, Allusion® blinds are perfect for living rooms, dining areas, and bedrooms where style meets practicality. Each design is carefully crafted to complement modern interiors while providing the practical benefits of effective light and privacy control.'
    ],
    features: [
      'Sheer and opaque combination',
      'Sophisticated light patterns',
      'Contemporary aesthetic',
      'Wide range of colours and patterns'
    ],
    heroImage: '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
    images: [
      '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
      '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
      romanBlindsImg
    ]
  },
  'cellular-pleated-blinds': {
    name: 'Cellular and Pleated Blinds',
    subheading: 'ENERGY EFFICIENT & STYLISH',
    description: [
      'Cellular and pleated blinds feature an innovative honeycomb cell structure that provides excellent insulation and energy efficiency. This charming selection of colourways and patterns offers year-round benefits, keeping your home warm in winter and cool in summer. The unique cellular design traps air, creating a natural barrier against heat loss and gain.',
      'The honeycomb cells work like double glazing for your windows, significantly reducing energy costs while maintaining a comfortable indoor temperature. This makes cellular blinds an excellent investment for environmentally conscious homeowners who want to reduce their carbon footprint and energy bills.',
      'Available in single, double, and triple cell options, these blinds are perfect for any room where energy efficiency and style are priorities. From bedrooms to living rooms, cellular blinds provide both aesthetic appeal and practical benefits that enhance your home\'s comfort and value.'
    ],
    features: [
      'Energy efficient honeycomb design',
      'Excellent insulation properties',
      'Wide range of colourways',
      'Year-round benefits'
    ],
    heroImage: '/assets/brochures/NowestImages/cellur/Landscape-Cell_Celeste_LF_Anthracite-700x500-1.jpg.webp',
    images: [
      '/assets/brochures/NowestImages/cellur/Landscape-Cell_Celeste_LF_Anthracite-700x500-1.jpg.webp',
      '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp',
      rollerBlindsImg
    ]
  },
  'panel-blinds': {
    name: 'Panel Blinds',
    subheading: 'MODERN & CONTEMPORARY',
    description: [
      'Panel blinds feature modern sliding panels perfect for large windows and contemporary spaces. With a sleek design and smooth operation, they offer an elegant solution for wide windows and sliding doors. The minimalist aesthetic of panel blinds makes them ideal for modern architectural designs.',
      'Available in a variety of fabrics and colors, panel blinds can be customized to match any interior style. From neutral tones that blend seamlessly with your decor to bold colors that make a statement, the customization options are virtually limitless.',
      'Their minimalist design makes them ideal for modern homes and offices where clean lines and functionality are essential. The smooth sliding mechanism ensures quiet operation, while the large panels provide excellent coverage for expansive windows and glass doors.'
    ],
    features: [
      'Modern sliding panel design',
      'Perfect for large windows',
      'Smooth operation',
      'Contemporary style'
    ],
    heroImage: PLEATED_PANEL_BLINDS_S3_URL,
    images: [
      PLEATED_PANEL_BLINDS_S3_URL,
      verticalBlindsImg,
      rollerBlindsImg
    ]
  },
  'perfect-fit-blinds': {
    name: 'Perfect Fit® Blinds',
    subheading: 'NO DRILLING REQUIRED',
    description: [
      'Perfect Fit® blinds are designed to fit perfectly inside your window frame without any drilling required. This innovative system allows you to complement your roller, vision, and pleated/cellular blinds with a seamless installation. The unique mounting system clips directly onto your window frame, ensuring a perfect fit every time.',
      'Available in a range of styles and colors, Perfect Fit® blinds are ideal for uPVC windows and provide a neat, professional finish. The precision engineering ensures that each blind fits snugly within the window recess, creating a clean, integrated look that enhances your windows rather than detracting from them.',
      'Easy to install and remove, they are perfect for rental properties or anyone who wants a non-invasive window treatment solution. Whether you\'re a tenant who can\'t make permanent alterations or a homeowner who prefers a reversible installation, Perfect Fit® blinds offer the perfect solution.'
    ],
    features: [
      'No drilling required',
      'Perfect fit inside window frame',
      'Easy installation and removal',
      'Ideal for uPVC windows'
    ],
    heroImage: '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp',
    images: [
      '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp',
      '/assets/brochures/NowestImages/cellur/Landscape-Cell_Celeste_LF_Anthracite-700x500-1.jpg.webp',
      rollerBlindsImg
    ]
  },
  'conservatory-blinds': {
    name: 'Conservatory Blinds',
    subheading: 'SPECIALIZED FOR CONSERVATORIES',
    description: [
      'Conservatory blinds are specially designed for conservatories and sunrooms, providing effective heat and light control in glass extensions. These specialized blinds help regulate temperature, reduce glare, and protect furniture from UV damage. The unique challenges of conservatory spaces require window treatments that can handle extreme temperature variations and intense sunlight.',
      'Available in various styles including roof blinds, side blinds, and combination systems, conservatory blinds are essential for creating a comfortable living space in your conservatory year-round. Roof blinds are particularly important for controlling overhead sunlight, while side blinds provide privacy and additional temperature control.',
      'Made-to-measure blinds that control light and heat while enhancing style. Perfect Fit® options provide child-safe, gap-free installation ideal for uPVC windows. The combination of effective insulation and light control means your conservatory can be enjoyed in all seasons, from bright summer days to cold winter evenings.'
    ],
    features: [
      'Specialized for conservatories and sunrooms',
      'Effective heat and light control',
      'UV protection for furnishings',
      'Roof, side and door installation options',
      'Perfect Fit® child-safe options available'
    ],
    heroImage: CONSERVATORY_BLINDS_S3_IMAGES[0],
    images: CONSERVATORY_BLINDS_S3_IMAGES
  },
  'motorised-blinds': {
    name: 'Motorised Blinds',
    subheading: 'SMART & CONVENIENT',
    description: [
      'Motorised blinds offer the ultimate in convenience and smart home integration. Control your blinds with a remote, smartphone app, or voice commands for seamless operation. Perfect for hard-to-reach windows, large windows, or anyone who wants the convenience of automated window treatments.',
      'Motorised blinds can be programmed to open and close at specific times, helping to regulate temperature and save energy. This automation not only adds convenience but also contributes to energy efficiency by optimizing natural light and temperature control throughout the day.',
      'Available with rechargeable batteries or hardwired options, motorised blinds can be integrated into existing smart home systems. Whether you use Amazon Alexa, Google Home, or Apple HomeKit, these blinds seamlessly connect to your home automation ecosystem for complete control at your fingertips.'
    ],
    features: [
      'Smart home integration',
      'Remote and app control',
      'Voice command compatible',
      'Programmable operation'
    ],
    heroImage: MOTORIZED_BLINDS_S3_URL,
    images: [
      MOTORIZED_BLINDS_S3_URL,
      rollerBlindsImg,
      verticalBlindsImg
    ]
  },
  'venetian-blinds': {
    name: 'Venetian Blinds',
    subheading: 'CLASSIC & TIMELESS',
    description: [
      'Venetian blinds feature classic horizontal slats that provide versatile light control and privacy. Available in wood, aluminum, and faux wood finishes, they offer a timeless style that suits any interior. The adjustable slats allow you to control the amount of light entering the room while maintaining privacy.',
      'The precision tilt mechanism gives you complete control over light direction and intensity. You can angle the slats to direct light upward for ambient lighting, downward for task lighting, or close them completely for maximum privacy. This versatility makes Venetian blinds suitable for any room in your home.',
      'Easy to clean and maintain, Venetian blinds are perfect for any room where you want classic elegance combined with practical functionality. The durable materials and simple design ensure that these blinds will continue to look great and function perfectly for years to come.'
    ],
    features: [
      'Versatile light control',
      'Multiple material options',
      'Timeless style',
      'Easy maintenance'
    ],
    heroImage: woodVenetianImg,
    images: [
      woodVenetianImg,
      rollerBlindsImg,
      romanBlindsImg
    ]
  },
  'urban-shutters-louvolite': {
    name: 'Urban Shutters by Louvolite',
    subheading: 'CLASSICAL ELEGANCE',
    description: [
      'Urban Shutters by Louvolite transform your home with a classical selection of made-to-measure frames and door styles to suit any interior. These premium shutters offer timeless elegance and exceptional quality, providing excellent light control and privacy. The craftsmanship and attention to detail in every shutter ensure that you receive a product that not only looks beautiful but also performs flawlessly.',
      'Available in various styles including full-height, tier-on-tier, and café style, Urban Shutters can be customized to match your exact requirements and interior design preferences. Each style offers unique benefits - full-height shutters provide complete coverage, tier-on-tier offers flexibility with independent upper and lower sections, and café style maintains privacy while allowing light in through the top portion.',
      'The premium materials and construction mean that Urban Shutters are built to last, providing years of reliable service while maintaining their elegant appearance. These shutters are an investment in both style and functionality that will enhance your home for decades to come.'
    ],
    features: [
      'Made-to-measure frames',
      'Classical design',
      'Multiple style options',
      'Louvolite quality guarantee'
    ],
    heroImage: '/assets/brochures/NowestImages/urban/Landscape-FH-Cafe-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp',
    images: [
      '/assets/brochures/NowestImages/urban/Landscape-FH-Cafe-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp',
      shuttersImg,
      woodVenetianImg
    ]
  },
  'precision-roller-blind-louvolite': {
    name: 'Precision Roller Blind by Louvolite',
    subheading: 'PRECISION ENGINEERING',
    description: [
      'Precision Roller Blinds by Louvolite represent the pinnacle of roller blind engineering. With superior quality and performance, these premium blinds offer precise operation and exceptional durability. Every component is engineered to exacting standards, ensuring smooth, reliable operation that stands the test of time.',
      'Featuring high-quality fabrics and precision mechanisms, Precision Roller Blinds are designed for those who demand the very best in window treatments. The fabrics are carefully selected for their durability, light-filtering properties, and aesthetic appeal, while the mechanisms are engineered for years of trouble-free operation.',
      'Available in a wide range of colors and patterns, they combine style with unmatched functionality. Whether you prefer subtle neutrals that blend seamlessly with your decor or bold patterns that make a statement, Precision Roller Blinds offer options to suit every taste and interior design style.'
    ],
    features: [
      'Precision engineering',
      'Superior quality',
      'Exceptional durability',
      'Louvolite brand guarantee'
    ],
    heroImage: rollerBlindsImg,
    images: [
      rollerBlindsImg,
      '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
      verticalBlindsImg
    ]
  },
  'romashade-louvolite': {
    name: 'RomaShade® by Louvolite',
    subheading: 'ELEGANT ROMAN DESIGN',
    description: [
      'RomaShade® by Louvolite features an elegant Roman shade design with smooth, precise operation. These beautiful blinds create soft, cascading folds when raised and lie flat when lowered, offering excellent light control and privacy. The graceful folds add texture and visual interest to your windows while maintaining a clean, sophisticated appearance.',
      'Available in a stunning range of fabrics and colors, RomaShade® blinds add sophistication and style to any room. From luxurious silks and velvets to practical cottons and linens, the fabric options ensure you can find the perfect match for your interior design vision.',
      'Perfect for bedrooms, living rooms, and dining areas where you want a touch of elegance. The combination of beautiful design and practical functionality makes RomaShade® blinds an excellent choice for any room where style and performance are equally important.'
    ],
    features: [
      'Elegant Roman shade design',
      'Smooth operation',
      'Beautiful fabric options',
      'Louvolite quality'
    ],
    heroImage: romanBlindsImg,
    images: [
      romanBlindsImg,
      curtainsImg,
      '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp'
    ]
  },
  'perfect-fit-shutters-lite': {
    name: 'Perfect Fit Shutters Lite',
    subheading: 'LIGHTWEIGHT & PERFECT FIT',
    description: [
      'Perfect Fit Shutters Lite are lightweight shutters that fit perfectly inside your window frame without drilling. These innovative shutters offer the classic look of traditional shutters with the convenience of easy installation. The lightweight design makes them easy to handle during installation while maintaining the durability and functionality of traditional shutters.',
      'Perfect for any window size and style, they provide excellent light control and privacy while maintaining a neat, professional appearance. The precision fit ensures that each shutter sits perfectly within the window recess, creating a seamless, integrated look that enhances your windows.',
      'Ideal for uPVC windows and rental properties where a non-invasive solution is required. The easy installation and removal process means you can enjoy the benefits of shutters without making permanent alterations to your property, making them perfect for tenants or homeowners who prefer reversible installations.'
    ],
    features: [
      'No drilling required',
      'Lightweight design',
      'Perfect fit installation',
      'Easy to install and remove'
    ],
    heroImage: shuttersImg,
    images: [
      shuttersImg,
      '/assets/brochures/NowestImages/urban/Landscape-FH-Cafe-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp',
      woodVenetianImg
    ]
  },
  'ready-made-curtains': {
    name: 'Ready-made Curtains',
    subheading: 'QUICK & CONVENIENT',
    description: [
      'Ready-made curtains offer beautiful designs available in standard sizes for immediate style transformation. Perfect for those who want quick delivery and easy installation without the wait of custom manufacturing. Our ready-made collection features a wide range of fabrics, colors, and patterns to suit any interior style.',
      'From elegant sheers to luxurious blackout options, these curtains provide an instant solution for window treatments while maintaining quality and style. Each curtain is carefully selected to ensure it meets our high standards for both aesthetics and functionality.',
      'Ideal for standard window sizes, they offer excellent value and convenience. Whether you\'re looking to refresh a single room or outfit an entire home, ready-made curtains provide a cost-effective solution without compromising on style or quality.'
    ],
    features: [
      'Quick delivery available',
      'Standard sizes for convenience',
      'Easy installation',
      'Beautiful design options'
    ],
    heroImage: curtainsImg,
    images: [
      curtainsImg,
      curtainsImg2,
      curtainsImg3,
      velvetCurtainsImg
    ]
  },
  'made-to-measure-curtains': {
    name: 'Made-to-measure Curtains',
    subheading: 'BESPOKE & PERFECT FIT',
    description: [
      'Made-to-measure curtains are bespoke window treatments tailored to your exact requirements. Every detail is customized to ensure a perfect fit and professional finish guaranteed. From precise measurements to fabric selection, heading styles, and finishing touches, our made-to-measure service creates curtains that are uniquely yours.',
      'Available in premium materials including silk, velvet, linen, and cotton, these curtains are crafted with attention to detail and professional expertise. Our experienced team works closely with you to understand your vision and bring it to life, ensuring every aspect of your curtains reflects your personal style and functional needs.',
      'Perfect for any window size or shape, including bay windows, arched windows, and unusual configurations. Whether you have a traditional Victorian bay window or a modern floor-to-ceiling glass wall, our made-to-measure service ensures a flawless fit that enhances both the window and the room.'
    ],
    features: [
      'Perfect fit guaranteed',
      'Custom sizing for any window',
      'Professional finish',
      'Premium materials available'
    ],
    heroImage: curtainsImg3,
    images: [
      curtainsImg3,
      curtainsImg,
      silkCurtainsImg,
      layeredCurtainsImg
    ]
  }
};

export default function ProductDetail() {
  const [, params] = useRoute('/products/:productId');
  const [, setLocation] = useLocation();
  const productId = params?.productId || '';
  
  // Fallback for products not yet migrated to individual files
  const productData = productDetails[productId];

  if (!productData) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => setLocation('/products')}
            className="text-golden-orange hover:underline"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Fallback: render using old data structure (for any products not yet migrated)
  return (
    <ProductDetailLayout
      name={productData.name}
      subheading={productData.subheading}
      description={productData.description}
      features={productData.features}
      heroImage={productData.heroImage}
      images={productData.images}
    />
  );
}

