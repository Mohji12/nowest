import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { getProducts, getBrochures } from '@/services/api';

// Import product images
import rollerBlindsImg from '@assets/stock_images/roller_blinds_modern_b7d98dd5.jpg';
import woodVenetianImg from '@assets/stock_images/wooden_venetian_blin_7e7829a6.jpg';
import romanBlindsImg from '@assets/stock_images/roman_blinds_luxury__00686ca9.jpg';
import verticalBlindsImg from '@assets/stock_images/vertical_blinds_pati_2902750d.jpg';
import curtainsImg from '@assets/stock_images/luxury_made_to_measu_6dae048d.jpg';
import curtainsImg2 from '@assets/stock_images/luxury_made_to_measu_df4fc3f5.jpg';
import curtainsImg3 from '@assets/stock_images/made_to_measure_luxu_14f11c74.jpg';
import blackoutImage from '@assets/generated_images/Blackout_curtains_bedroom_luxury_675bdda2.png';
import sheerImage from '@assets/generated_images/Luxury_sheer_curtains_hero_53aa2ee0.png';
import velvetCurtainsImg from '@assets/stock_images/velvet_curtains_rich_182d7870.jpg';
import silkCurtainsImg from '@assets/stock_images/silk_curtains_luxury_7a06336f.jpg';
import layeredCurtainsImg from '@assets/stock_images/layered_curtains_she_0428ff9d.jpg';
import shuttersImg from '@assets/stock_images/plantation_shutters__c750720c.jpg';
import commercialCurtainsImg from '@assets/stock_images/commercial_bespoke_c_80ae7c98.jpg';
import motorizedBlindsImg from '@assets/stock_images/motorized_automated__4b820a60.jpg';

// S3 image URLs for products
const MOTORIZED_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_automated__978f737d.jpg';
const PLEATED_PANEL_BLINDS_S3_URL = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/panel_blinds_sliding_0c1c0c07.jpg';
const CONSERVATORY_BLINDS_S3_URL = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/conservatory+blinds/A_spacious_and_airy_Edwardian_202606220345.jpeg';

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('blinds');
  const [, setLocation] = useLocation();

  // Fetch real products data from API
  const { data: productsData, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch real brochures data from API
  const { data: brochuresData, isLoading: brochuresLoading, error: brochuresError } = useQuery({
    queryKey: ['brochures'],
    queryFn: getBrochures,
    staleTime: 0, // Always fetch fresh data to see updates immediately
    gcTime: 0, // Don't cache to ensure fresh data
  });

  const categories = [
    { id: 'blinds', label: 'Blinds' },
    { id: 'curtains', label: 'Curtains' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'brochures', label: 'Brochures' },
  ];

  // Helper function to generate productId from product name
  const generateProductId = (name: string): string => {
    if (!name) return '';
    return name
      .toLowerCase()
      .replace(/®/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Process products data and group by category
  const products = (productsData as any[])?.reduce((acc: any, item: any, index: number) => {
    // Filter out Vertical Blinds and Visage Blinds from the blinds category
    const itemNameLower = item.name?.toLowerCase() || '';
    if ((item.category === 'blinds' || !item.category) && 
        (itemNameLower.includes('vertical') || itemNameLower === 'vertical blinds' ||
         itemNameLower.includes('visage') || itemNameLower === 'visage blinds' || itemNameLower === 'visage blind')) {
      return acc;
    }
    
    // Filter out Tie-Backs, Swags and Tails, and Curtain Linings from the curtains category
    if ((item.category === 'curtains' || item.category === 'curtain') && 
        (itemNameLower.includes('tie-back') || itemNameLower.includes('tie back') ||
         itemNameLower.includes('swag') || itemNameLower.includes('swags and tails') ||
         itemNameLower.includes('curtain lining') || itemNameLower.includes('curtain linings'))) {
      return acc;
    }
    
    const category = item.category || 'blinds';
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    // Convert relative image paths to absolute S3 URLs with better error handling
    const getImageUrl = (imagePath: string, productIndex?: number) => {
      if (!imagePath || imagePath.trim() === '') {
        console.log(`[Products] No image path for product: ${item.name}, using fallback`);
        // Pass index for curtain products to get different images
        return getProductImage(item.name || '', category, productIndex);
      }
      
      // If it's already a full URL (S3 or any other), return as is - this is the database URL
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        console.log(`[Products] ✅ Using database URL for ${item.name}: ${imagePath}`);
        return imagePath;
      }
      
      // If it's a relative path, convert to S3 URL
      if (imagePath.startsWith('/')) {
        // Remove leading slash and construct S3 URL
        const cleanPath = imagePath.substring(1);
        const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${cleanPath}`;
        console.log(`[Products] Converted relative path to S3 URL for ${item.name}: ${imagePath} -> ${s3Url}`);
        return s3Url;
      }
      
      // If it's a relative path without leading slash, add it
      const s3Url = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/attached_assets/${imagePath}`;
      console.log(`[Products] Converted path to S3 URL for ${item.name}: ${imagePath} -> ${s3Url}`);
      return s3Url;
    };

    // Check multiple possible image field names
    const imageField = item.image_url || item.image || item.imageUrl || item.photo || item.photo_url;
    
    // Log for debugging (only if image field exists)
    if (imageField) {
      console.log(`[Products] Product: ${item.name}, Image field from database: ${imageField}`);
      if (imageField.startsWith('http')) {
        console.log(`[Products] ✅ Database has full URL - will use it directly`);
      }
    } else {
      console.log(`[Products] Product: ${item.name}, No image field found, will use fallback`);
    }
    
    // Map product data with database images
    // This will use the database URL if it exists, otherwise use fallback
    // Pass the index within the category for curtain products to get different images
    const categoryIndex = acc[category] ? acc[category].length : 0;
    let productImage = getImageUrl(imageField || '', categoryIndex);
    
    // Override image for specific products
    if (itemNameLower.includes('vertical commercial') || itemNameLower.includes('vertical-blinds-commercial')) {
      productImage = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp';
    }
    
    acc[category].push({
      id: item.id?.toString() || Math.random().toString(),
      productId: generateProductId(item.name || ''),
      name: item.name || 'Untitled Product',
      description: item.description || 'Premium quality product',
      image: productImage,
      price: item.price || null,
      features: item.features || [],
      category: item.category || category,
      created_at: item.created_at,
      updated_at: item.updated_at,
      status: item.status || 'active',
      specifications: item.specifications || null,
      materials: item.materials || null,
      dimensions: item.dimensions || null,
    });
    
    return acc;
  }, {}) || {};
  
  // Ensure brochures data is always available
  if (!products.brochures) {
    products.brochures = [];
  }

  // Add static blinds products missing from the API (e.g. Conservatory Blinds)
  if (productsData && Object.keys(products).length > 0) {
    if (!products.blinds) {
      products.blinds = [];
    }

    const staticBlindsProducts = [
      {
        id: 'static-conservatory-blinds',
        productId: 'conservatory-blinds',
        name: 'Conservatory Blinds',
        description: 'Specialized blinds designed for conservatories and sunrooms. Control heat and light in your glass extension.',
        image: CONSERVATORY_BLINDS_S3_URL,
        features: ['Conservatory specific', 'Heat control', 'Light management', 'Specialized design'],
        category: 'blinds',
        status: 'active',
      },
    ];

    staticBlindsProducts.forEach((staticProduct) => {
      const exists = products.blinds.some(
        (p: any) =>
          p.productId === staticProduct.productId ||
          (p.name || '').toLowerCase().includes('conservatory')
      );

      if (!exists) {
        products.blinds.push(staticProduct);
      }
    });
  }
  
  // If no API data or brochures is empty, use fallback data
  const finalProducts = !productsData || Object.keys(products).length === 0 ? {
    blinds: [
      { 
        id: '1', 
        productId: 'roller-blinds',
        name: 'Roller Blinds', 
        description: 'Clean, modern lines with excellent light control and privacy. Perfect for contemporary homes and offices.', 
        image: rollerBlindsImg,
        features: ['Easy operation', 'Light control', 'Privacy protection', 'Modern design']
      },
      { 
        id: '3',
        productId: 'vision-blinds',
        name: 'Vision® Blinds', 
        description: 'Innovative fabric technology offering privacy with an unobstructed view. Experience the perfect balance of light and privacy.', 
        image: '/assets/brochures/NowestImages/vision/2023-Landscape_Arrezzo_Beige.jpg.webp',
        features: ['Privacy with view', 'Innovative fabric', 'Unobstructed view', 'Modern technology']
      },
      { 
        id: '4',
        productId: 'allusion-blinds',
        name: 'Allusion® Blinds', 
        description: 'A combination of sheer and opaque textured fabric for our most elegant blind yet. Create sophisticated light patterns in any room.', 
        image: '/assets/brochures/NowestImages/allusion/Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
        features: ['Elegant design', 'Sheer and opaque', 'Textured fabric', 'Sophisticated patterns']
      },
      { 
        id: '5',
        productId: 'cellular-pleated-blinds',
        name: 'Cellular and Pleated Blinds', 
        description: 'A charming selection of colourways and patterns boasting year round benefits. Energy-efficient honeycomb design providing excellent insulation.', 
        image: '/assets/brochures/NowestImages/cellur/Landscape-Cell_Celeste_LF_Anthracite-700x500-1.jpg.webp',
        features: ['Energy efficient', 'Excellent insulation', 'Year round benefits', 'Multiple colourways']
      },
      { 
        id: '6',
        productId: 'panel-blinds',
        name: 'Panel Blinds', 
        description: 'Modern sliding panels perfect for large windows and contemporary spaces. Sleek design with smooth operation.', 
        image: PLEATED_PANEL_BLINDS_S3_URL,
        features: ['Modern design', 'Large windows', 'Smooth operation', 'Contemporary style']
      },
      { 
        id: '7',
        productId: 'perfect-fit-blinds',
        name: 'Perfect Fit® Blinds', 
        description: 'No drilling required - fits perfectly inside your window frame. Choose innovative Perfect Fit to complement your roller, vision and pleated/cellular blinds.', 
        image: '/assets/brochures/NowestImages/perfect/Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp',
        features: ['No drilling', 'Perfect fit', 'Easy installation', 'Multiple styles']
      },
      { 
        id: '8',
        productId: 'conservatory-blinds',
        name: 'Conservatory Blinds', 
        description: 'Specialized blinds designed for conservatories and sunrooms. Control heat and light in your glass extension.', 
        image: CONSERVATORY_BLINDS_S3_URL,
        features: ['Conservatory specific', 'Heat control', 'Light management', 'Specialized design']
      },
      { 
        id: '9',
        productId: 'motorised-blinds',
        name: 'Motorised Blinds', 
        description: 'Automated blinds for ultimate convenience and smart home integration. Control with remote, app, or voice commands.', 
        image: MOTORIZED_BLINDS_S3_URL,
        features: ['Smart home ready', 'Remote control', 'App integration', 'Voice commands']
      },
      { 
        id: '10',
        productId: 'venetian-blinds',
        name: 'Venetian Blinds', 
        description: 'Classic horizontal slats for versatile light control. Available in wood, aluminum, and faux wood finishes.', 
        image: woodVenetianImg,
        features: ['Versatile light control', 'Multiple materials', 'Easy maintenance', 'Timeless style']
      },
      { 
        id: '11',
        productId: 'urban-shutters-louvolite',
        name: 'Urban Shutters by Louvolite', 
        description: 'Transform your home with our classical selection of made to measure frames and door styles to suit any interior.', 
        image: '/assets/brochures/NowestImages/urban/Landscape-FH-Cafe-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp',
        features: ['Made to measure', 'Classical design', 'Multiple styles', 'Louvolite quality']
      },
      { 
        id: '12',
        productId: 'precision-roller-blind-louvolite',
        name: 'Precision Roller Blind by Louvolite', 
        description: 'Premium roller blinds with precision engineering. Superior quality and performance from Louvolite.', 
        image: rollerBlindsImg,
        features: ['Precision engineering', 'Superior quality', 'Louvolite brand', 'Premium performance']
      },
      { 
        id: '13',
        productId: 'romashade-louvolite',
        name: 'RomaShade® by Louvolite', 
        description: 'Elegant Roman shade design with smooth operation. Beautiful fabric options for any interior style.', 
        image: romanBlindsImg,
        features: ['Roman shade design', 'Smooth operation', 'Beautiful fabrics', 'Louvolite quality']
      },
      { 
        id: '14',
        productId: 'perfect-fit-shutters-lite',
        name: 'Perfect Fit Shutters Lite', 
        description: 'Lightweight shutters that fit perfectly without drilling. Perfect for any window size and style.', 
        image: shuttersImg,
        features: ['No drilling', 'Lightweight design', 'Perfect fit', 'Easy installation']
      },
    ],
    curtains: [
      { 
        id: '3', 
        productId: 'ready-made-curtains',
        name: 'Ready-made Curtains', 
        description: 'Beautiful designs available in standard sizes. Quick delivery and easy installation for immediate style.', 
        image: curtainsImg,
        features: ['Quick delivery', 'Standard sizes', 'Easy installation', 'Beautiful designs']
      },
      { 
        id: '4', 
        productId: 'made-to-measure-curtains',
        name: 'Made-to-measure', 
        description: 'Bespoke curtains tailored to your exact requirements. Perfect fit and professional finish guaranteed.', 
        image: curtainsImg3,
        features: ['Perfect fit', 'Custom sizing', 'Professional finish', 'Premium materials']
      },
      { 
        id: '15',
        productId: 'sheer-curtains',
        name: 'Sheer Curtains', 
        description: 'Sheer curtains allow soft daylight into your home while adding elegance and privacy. Available in multiple textures.', 
        image: sheerImage,
        features: ['Soft daylight', 'Elegant look', 'Privacy layer', 'Texture options']
      },
      { 
        id: '16',
        productId: 'pencil-pleat-curtains',
        name: 'Pencil Pleat Curtains', 
        description: 'Versatile pencil pleat curtains with narrow folds that fit both tracks and poles. Suitable for any room style.', 
        image: curtainsImg,
        features: ['Fits tracks & poles', 'Narrow folds', 'Classic look', 'Room versatile']
      },
      { 
        id: '17',
        productId: 'wave-curtains',
        name: 'Wave Curtains', 
        description: 'Wave curtains provide a smooth, uniform drape using specially designed tracks. Perfect for modern homes and wide windows.', 
        image: curtainsImg2,
        features: ['Uniform drape', 'Modern look', 'Wide window suitable', 'Special track system']
      },
      { 
        id: '18',
        productId: 'roman-curtains',
        name: 'Roman Curtains', 
        description: 'Roman curtains combine the softness of fabric with the practicality of blinds. Perfect for bedroom and living spaces. Available in multiple styles and linings.', 
        image: romanBlindsImg,
        features: ['Soft fabric folds', 'Premium styles', 'Blackout options', 'Ideal for bedrooms']
      },
      { 
        id: '19',
        productId: 'eyelet-curtains',
        name: 'Eyelet Curtains', 
        description: 'Modern eyelet curtains with a smooth wave-like fall. Easy to open, close, and maintain. Suitable for contemporary interior designs.', 
        image: curtainsImg,
        features: ['Wave-like fall', 'Modern design', 'Easy operation', 'Low maintenance']
      },
      { 
        id: '20',
        productId: 'pinch-pleat-curtains',
        name: 'Pinch Pleat Curtains', 
        description: 'Pinch pleat curtains feature evenly spaced gathers for a smart finish. Offers excellent light reduction, noise insulation, and a tailored look.', 
        image: curtainsImg3,
        features: ['Elegant pleats', 'Premium finish', 'Light reduction', 'Noise insulation']
      },
      { 
        id: '21',
        productId: 'pelmets',
        name: 'Pelmets', 
        description: 'Available in Soft Padded, Solid Board, and Bonded Rails, pelmets help manage light, glare, and privacy while adding a decorative finish to your windows and rooms.', 
        image: curtainsImg,
        features: ['Soft padded', 'Solid board', 'Bonded rails', 'Decorative & functional']
      },
      { 
        id: '22',
        productId: 'curtain-tracks-and-poles',
        name: 'Curtain Tracks and Poles', 
        description: 'We offer a wide selection of made-to-measure tracks and poles from the UK\'s top suppliers. Custom options include straight and bay window solutions, heavy-duty bay window tracks, and extra-long tracks.', 
        image: verticalBlindsImg,
        features: ['UK top suppliers', 'Bay window solutions', 'Heavy-duty options', 'Motorised available']
      },
      { 
        id: '23',
        productId: 'cushions',
        name: 'Cushions', 
        description: 'Add a finishing touch to your interior with our handcrafted cushions, individually designed to complement your colour scheme. Standard size: 40cm x 40cm (custom sizes available).', 
        image: velvetCurtainsImg,
        features: ['Handcrafted design', 'Complement colour scheme', '40cm x 40cm standard', 'Custom sizes available']
      },
    ],
    commercial: [
      { 
        id: '5', 
        productId: 'fire-retardant-curtains',
        name: 'Fire Retardant Curtains', 
        description: 'Fire-retardant curtains made for safety-critical environments such as hospitals, schools, hotels, and commercial spaces.', 
        image: commercialCurtainsImg,
        features: ['Fire safety', 'Commercial grade', 'Durable fabric', 'Regulation compliant']
      },
      { 
        id: '6', 
        productId: 'vertical-blinds-commercial',
        name: 'Vertical Commercial', 
        description: 'Durable and functional vertical blinds ideal for offices, schools, and commercial buildings. Provides excellent glare and privacy control.', 
        image: 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
        features: ['Glare control', 'Commercial grade', 'Durable material', 'Easy to maintain']
      },
      { 
        id: '7', 
        productId: 'security-grilles',
        name: 'Security Grilles', 
        description: 'Robust security grilles designed to protect commercial and industrial properties. Easy to operate, durable, and ideal for storefronts and warehouses.', 
        image: rollerBlindsImg,
        features: ['High security', 'Durable material', 'Easy operation', 'Ideal for commercial use']
      },
      { 
        id: '8',
        productId: 'commercial-metal',
        name: 'Commercial Metal', 
        description: 'Premium metal window treatments designed for commercial applications. Durable, low-maintenance, and perfect for high-traffic commercial environments.', 
        image: MOTORIZED_BLINDS_S3_URL,
        features: ['Durable metal construction', 'Low maintenance', 'Commercial grade', 'High-traffic durability']
      },
    ],
    brochures: [
      { 
        id: '8', 
        name: 'Allusion2024', 
        subtitle: 'Allusion Curtains',
        description: 'Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments. View them directly in your browser or download for later reference.', 
        image: getUniqueBrochureImage('8', 0),
        features: ['Complete range', 'Download available', 'Professional design', 'Latest collection'],
        pdf_path: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Allusion.pdf'
      },
      { 
        id: '9', 
        name: 'Newest Interior Collection 2024', 
        subtitle: 'Complete Range',
        description: 'Inspiration & Stylish Solutions for Your Windows. Discover our complete range of blinds and curtains including rollers, verticals, romans, and motorised solutions.', 
        image: getUniqueBrochureImage('9', 1),
        features: ['Stylish solutions', 'Complete range', 'Motorised options', 'Professional inspiration'],
        pdf_path: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Collection2024.pdf'
      },
      { 
        id: '10', 
        name: 'Commercial Solutions 2024', 
        subtitle: 'Professional Window Treatments',
        description: 'Professional window treatments for offices and businesses. Complete range of commercial blinds, curtains, and automated solutions.', 
        image: getUniqueBrochureImage('10', 2),
        features: ['Professional solutions', 'Commercial grade', 'Automated options', 'Business focused'],
        pdf_path: 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/brochures/Commercial2024.pdf'
      },
    ],
  } : products;


  // Helper function to get product image based on name and category
  function getProductImage(name: string, category: string, index: number = 0): string {
    if (!name && !category) {
      return rollerBlindsImg; // Default fallback
    }
    
    const nameKey = (name || '').toLowerCase();
    const categoryKey = (category || '').toLowerCase();
    
    // Check name first - specific cases first
    if (nameKey.includes('vertical commercial') || nameKey.includes('vertical-blinds-commercial')) {
      return 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp';
    }
    if (nameKey.includes('roller') || nameKey.includes('roll')) return rollerBlindsImg;
    if (nameKey.includes('venetian') || nameKey.includes('venet')) return woodVenetianImg;
    if (nameKey.includes('roman')) return romanBlindsImg;
    if (nameKey.includes('vertical') || nameKey.includes('vert')) return verticalBlindsImg;
    
    // Different curtain types get different images
    if (nameKey.includes('velvet')) return velvetCurtainsImg;
    if (nameKey.includes('silk')) return silkCurtainsImg;
    if (nameKey.includes('layered') || nameKey.includes('dual')) return layeredCurtainsImg;
    if (nameKey.includes('sheer') || nameKey.includes('voile')) return sheerImage;
    if (nameKey.includes('blackout') || nameKey.includes('black-out')) return blackoutImage;
    if (nameKey.includes('made-to-measure') || nameKey.includes('bespoke') || nameKey.includes('custom')) return curtainsImg3;
    if (nameKey.includes('ready-made') || nameKey.includes('ready made') || nameKey.includes('standard')) return curtainsImg;
    
    // For generic curtain products, cycle through different images based on index
    if (nameKey.includes('curtain') || nameKey.includes('drape')) {
      const curtainImages = [curtainsImg, curtainsImg2, curtainsImg3, velvetCurtainsImg, silkCurtainsImg, layeredCurtainsImg];
      return curtainImages[index % curtainImages.length];
    }
    if (nameKey.includes('shutter')) return shuttersImg;
    if (nameKey.includes('motorized') || nameKey.includes('motorised') || nameKey.includes('automated') || nameKey.includes('motor')) return MOTORIZED_BLINDS_S3_URL;
    if (nameKey.includes('conservatory')) return CONSERVATORY_BLINDS_S3_URL;
    if (nameKey.includes('pleated') || nameKey.includes('panel') || nameKey.includes('cellular') || nameKey.includes('honeycomb')) return PLEATED_PANEL_BLINDS_S3_URL;
    
    // Check category
    if (categoryKey.includes('commercial')) return commercialCurtainsImg;
    if (categoryKey.includes('curtain')) return curtainsImg;
    if (categoryKey.includes('blind')) return rollerBlindsImg;
    if (categoryKey.includes('shutter')) return shuttersImg;
    
    return rollerBlindsImg; // Default fallback
  }

  // Helper function to get unique brochure image
  function getUniqueBrochureImage(brochureId: string, brochureIndex: number): string {
    // Array of available stock images
    const stockImages = [
      'roller_blinds_modern_b7d98dd5.jpg',
      'wooden_venetian_blin_7e7829a6.jpg',
      'roman_blinds_luxury__00686ca9.jpg',
      'vertical_blinds_pati_2902750d.jpg',
      'luxury_made_to_measu_6dae048d.jpg',
      'plantation_shutters__c750720c.jpg',
      'commercial_bespoke_c_80ae7c98.jpg',
      'motorized_automated__4b820a60.jpg',
      'blackout_curtains_be_8665d0b1.jpg',
      'sheer_voile_curtains_0d38b589.jpg',
      'velvet_curtains_rich_182d7870.jpg',
      'silk_curtains_luxury_7a06336f.jpg',
      'luxury_roman_blinds__842e30a5.jpg',
      'commercial_motorized_1ba2a261.jpg',
      'pleated_honeycomb_bl_2663b2e3.jpg',
      'metal_venetian_blind_11b45db2.jpg',
      'layered_curtains_she_0428ff9d.jpg',
      'curtain_hardware_bra_0704bedf.jpg',
      'luxury_fabric_swatch_3d571f00.jpg',
      'professional_install_712bd200.jpg'
    ];

    // Use brochure index to ensure each brochure gets a unique image
    // If we have more brochures than images, cycle through them
    const index = brochureIndex % stockImages.length;
    return `/assets/stock_images/${stockImages[index]}`;
  }

  // Background image path - using random S3 image
  const productsImage = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp';

  if (isLoading) {
    return (
      <div>
        {/* Header section with background image - Full width */}
        <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '300px' }}>
          {/* Background image */}
          <img
            src={productsImage}
            alt="Products background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ minHeight: '300px', width: '100%' }}
            onError={(e) => {
              console.error('Products image failed to load:', productsImage);
              e.currentTarget.src = '/assets/stock_images/luxury_made_to_measu_6dae048d.jpg';
              e.currentTarget.className = 'absolute inset-0 w-full h-full object-cover z-0';
            }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          
          {/* Content overlay - Centered with max-width */}
          <div className="relative z-20 py-12 sm:py-16 md:py-20 px-4 max-w-7xl mx-auto">
            <div className="mb-6 sm:mb-8">
              <img 
                src="/assets/LOGO PNG.png" 
                alt="Nowest Interior Ltd" 
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
              />
            </div>
            {/* OUR COLLECTION - Small uppercase text */}
            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
              OUR COLLECTION
            </p>
            
            {/* Luxury Curtains & Blinds - Large serif heading */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2 drop-shadow-md">
              Luxury Curtains & Blinds
            </h1>
            
            {/* Loading text */}
            <p className="text-white text-base sm:text-lg drop-shadow-md">
              Loading our collection...
            </p>
          </div>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Show fallback data if there's an error but still render the products
  if (error && !productsData) {
    console.warn('Products API failed, showing fallback data');
  }

  return (
    <div>
      {/* Header section with background image - Full width */}
      <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '300px' }}>
        {/* Background image */}
        <img
          src={productsImage}
          alt="Products background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '300px', width: '100%' }}
          onError={(e) => {
            console.error('Products image failed to load:', productsImage);
            e.currentTarget.src = '/assets/stock_images/luxury_made_to_measu_6dae048d.jpg';
            e.currentTarget.className = 'absolute inset-0 w-full h-full object-cover z-0';
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        
        {/* Content overlay - Centered with max-width */}
        <div className="relative z-20 py-12 sm:py-16 md:py-20 px-4 max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
            />
          </div>
          {/* OUR COLLECTION - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            OUR COLLECTION
          </p>
          
          {/* Luxury Curtains & Blinds - Large serif heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2 drop-shadow-md">
            Luxury Curtains & Blinds
          </h1>
          
          {/* Description */}
          <p className="text-white text-base sm:text-lg max-w-3xl mx-auto mb-6 sm:mb-8 px-4 drop-shadow-md">
            Discover our comprehensive range of bespoke window treatments, from traditional curtains to modern automated blinds, crafted with precision and style
          </p>
          
          {error && !productsData && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-yellow-700">
                Showing sample products. Real data will load when connection is restored.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Products Content Section */}
      <div className="px-4 sm:px-6 pb-24 sm:pb-28 md:pb-32 lg:pb-40">
        <div className="max-w-7xl mx-auto">

        {/* Category Buttons - Mobile Optimized */}
        <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
          <div className="bg-gray-100 rounded-lg p-0.5 sm:p-1 flex w-full max-w-2xl overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 min-w-0 px-2 sm:px-3 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-transparent text-gray-600 hover:text-black'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

            {/* Content based on selected category */}
            {selectedCategory === 'brochures' ? (
              /* Brochures Section - Mobile Optimized */
              <div className="max-w-6xl mx-auto">
                {/* Brochures Heading */}
                <div className="text-center mb-8 sm:mb-12">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-black px-2">
                    Product Brochures
                  </h1>
                  <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto px-4">
                    Browse our collection of product brochures featuring our complete range of blinds, curtains, and window treatments. View them directly in your browser or download for later reference.
                  </p>
                </div>

                {/* Brochures Grid - Mobile Optimized */}
                {brochuresLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    {((brochuresData && Array.isArray(brochuresData) && brochuresData.length > 0) 
                      ? brochuresData.map((item: any) => ({
                          ...item,
                          image: item.image || null, // Use image from database (S3 URL from backend)
                        }))
                      : (Array.isArray(finalProducts.brochures) ? finalProducts.brochures : [])
                    ).map((brochure: any, brochureIndex: number) => (
                      <div 
                        key={brochure.id} 
                        className="relative group flex flex-col transition-all duration-300 hover:scale-105"
                        style={{
                          border: '1px solid #FF6B35',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          background: 'linear-gradient(to bottom, #3a3a3a 0%, #d4d4d4 100%)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1)',
                          padding: '16px',
                          minHeight: '100%',
                        }}
                      >
                        {/* Brochure Image Container with tilt effect and shadow */}
                        <div 
                          className="relative mb-4"
                          style={{
                            transform: 'rotate(-3deg)',
                            transformOrigin: 'center center',
                            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                          }}
                        >
                          <div 
                            className="relative bg-white rounded-sm overflow-hidden"
                            style={{
                              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                          <img
                              src={brochure.image || 'https://via.placeholder.com/400x500?text=No+Image'}
                            alt={brochure.title || brochure.name || 'Brochure'}
                              className="w-full h-auto object-cover"
                              onLoad={() => {
                                console.log(`[Products] Loaded brochure image for "${brochure.title}":`, brochure.image);
                              }}
                              onError={(e) => {
                                console.error(`[Products] Failed to load image for "${brochure.title}":`, brochure.image);
                                e.currentTarget.src = 'https://via.placeholder.com/400x500?text=No+Image';
                                e.currentTarget.onerror = null;
                              }}
                              style={{
                                aspectRatio: '3/4',
                                display: 'block',
                              }}
                          />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="px-2 pb-4 min-h-[100px] flex flex-col flex-grow">
                          {/* Brochure Title - Dark grey, centered */}
                          <h3 
                            className="font-serif text-sm sm:text-base font-bold mb-5 text-center break-words line-clamp-3 mt-2" 
                            style={{ 
                              color: '#2d2d2d', 
                              lineHeight: '1.3',
                              wordBreak: 'break-word',
                              overflowWrap: 'anywhere',
                            }}
                            title={brochure.title || brochure.name || 'Untitled Brochure'}
                          >
                            {brochure.title || brochure.name || 'Untitled Brochure'}
                          </h3>
                          
                          {/* Links Section - Centered */}
                          <div className="flex items-center justify-center gap-3 mt-auto">
                            {/* VIEW ONLINE Link */}
                          <button 
                            onClick={() => {
                                const pdfUrlField = brochure.pdf_path || brochure.file_url || brochure.fileUrl;
                              if (pdfUrlField) {
                                let pdfUrl = pdfUrlField;
                                if (!pdfUrl.startsWith('http')) {
                                  if (pdfUrl.startsWith('/')) {
                                    pdfUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com${pdfUrl}`;
                                  } else {
                                    pdfUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/${pdfUrl}`;
                                  }
                                }
                                  window.open(pdfUrl, '_blank');
                                } else {
                                  alert('PDF file not available for this brochure');
                                }
                              }}
                              className="text-xs sm:text-sm font-medium hover:underline transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ color: '#2d2d2d' }}
                              disabled={!brochure.pdf_path && !brochure.file_url && !brochure.fileUrl}
                            >
                              VIEW ONLINE
                            </button>
                            
                            {/* Vertical divider */}
                            <div className="h-3 w-px" style={{ backgroundColor: '#9ca3af' }}></div>
                            
                            {/* DOWNLOAD PDF Link */}
                            <button
                              onClick={() => {
                                const pdfUrlField = brochure.pdf_path || brochure.file_url || brochure.fileUrl;
                                if (pdfUrlField) {
                                  let pdfUrl = pdfUrlField;
                                  if (!pdfUrl.startsWith('http')) {
                                    if (pdfUrl.startsWith('/')) {
                                      pdfUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com${pdfUrl}`;
                                    } else {
                                      pdfUrl = `https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/${pdfUrl}`;
                                    }
                                  }
                                  const link = document.createElement('a');
                                  link.href = pdfUrl;
                                  link.download = `${brochure.title || brochure.name || 'brochure'}.pdf`;
                                  link.target = '_blank';
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                              } else {
                                alert('PDF file not available for this brochure');
                              }
                            }}
                              className="text-xs sm:text-sm font-medium hover:underline transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ color: '#2d2d2d' }}
                              disabled={!brochure.pdf_path && !brochure.file_url && !brochure.fileUrl}
                          >
                              DOWNLOAD PDF
                          </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Show fallback message if no brochures */}
                    {(!brochuresData || !Array.isArray(brochuresData) || brochuresData.length === 0) && (!Array.isArray(finalProducts.brochures) || finalProducts.brochures.length === 0) && (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No brochures available at the moment.</p>
                        <p className="text-gray-400 text-sm mt-2">Please check back later or contact us for more information.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Show error message if brochures failed to load */}
                {brochuresError && (
                  <div className="text-center py-12">
                    <p className="text-red-500 text-lg">Failed to load brochures.</p>
                    <p className="text-gray-400 text-sm mt-2">Please try refreshing the page or contact support.</p>
                  </div>
                )}
              </div>
        ) : (
          /* Regular Products Grid for Blinds and Curtains - Mobile Optimized */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {(finalProducts[selectedCategory] || []).map((product: any) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  if (product.productId && (selectedCategory === 'blinds' || selectedCategory === 'curtains' || selectedCategory === 'commercial')) {
                    setLocation(`/products/${product.productId}`);
                  }
                }}
              >
                    {/* Image Section */}
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg bg-gray-100 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          const currentSrc = target.src;
                          
                          console.error(`[Products] Image failed to load for "${product.name}":`, currentSrc);
                          
                          // If it's the S3 URL with 's', try without 's'
                          if (currentSrc.includes('jgi-menteetrackers')) {
                            const altUrl = currentSrc.replace('jgi-menteetrackers', 'jgi-menteetracker');
                            console.log(`[Products] Trying alternative bucket URL:`, altUrl);
                            target.src = altUrl;
                            target.onerror = null;
                            return;
                          }
                          
                          // If it's the S3 URL without 's', try with 's' (for motorized or panel/pleated)
                          if (currentSrc.includes('jgi-menteetracker') && (currentSrc.includes('motorized_automated') || currentSrc.includes('panel_blinds'))) {
                            const altUrl = currentSrc.replace('jgi-menteetracker', 'jgi-menteetrackers');
                            console.log(`[Products] Trying alternative bucket URL:`, altUrl);
                            target.src = altUrl;
                            target.onerror = null;
                            return;
                          }
                          
                          // Try fallback image based on product name/category
                          const fallbackImage = getProductImage(product.name || '', product.category || '');
                          
                          // Only set fallback if we haven't already tried it
                          if (target.src !== fallbackImage && !target.src.includes('LOGO PNG')) {
                            console.log(`[Products] Trying fallback image for "${product.name}":`, fallbackImage);
                            target.src = fallbackImage;
                            target.className = 'w-full h-full object-cover transition-all duration-700 hover:scale-105';
                            target.onerror = null; // Reset error handler to prevent infinite loop
                          } else {
                            // If fallback also fails, show logo
                            console.log(`[Products] All fallbacks failed for "${product.name}", showing logo`);
                            target.src = '/assets/LOGO PNG.png';
                            target.className = 'w-full h-full object-contain p-4 transition-all duration-700 hover:scale-105';
                            target.onerror = null; // Prevent infinite loop
                          }
                        }}
                        onLoad={() => {
                          console.log(`[Products] ✅ Image loaded successfully for "${product.name}":`, product.image);
                        }}
                        onLoadStart={() => {
                          console.log(`[Products] 🔄 Attempting to load image for "${product.name}":`, product.image);
                        }}
                      />
                    </div>
                
                {/* Content Section - Mobile Optimized */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
                      {product.description}
                    </p>
                  )}
                  
                  {/* Features List */}
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-1 sm:space-y-2">
                      {product.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <span className="text-gray-400 mr-2 mt-0.5">›</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Price if available */}
                  {product.price && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                      <p className="text-base sm:text-lg font-bold text-gray-900">
                        £{product.price}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
