import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const COMMERCIAL_MOTORISED_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_automated__978f737d.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
];

export default function CommercialMotorisedBlinds() {
  return (
    <ProductDetailLayout
      name="Commercial Motorised Blinds"
      subheading="CENTRALIZED CONTROL & ENERGY MANAGEMENT"
      description={[
        'Commercial Motorised Blinds offer automated window treatments designed specifically for commercial buildings, providing centralized control and advanced energy management. Perfect for smart buildings and modern offices, these blinds integrate seamlessly with building management systems to optimize energy consumption and create comfortable working environments.',
        'The centralized control system allows facility managers to program blinds across entire buildings or floors, ensuring consistent light levels and temperature regulation. This automation not only enhances comfort but also significantly reduces energy costs by optimizing natural light usage and reducing HVAC load.',
        'Available with rechargeable batteries or hardwired options, commercial motorised blinds can be integrated into existing building automation systems. Whether you use BACnet, Modbus, or other building management protocols, these blinds seamlessly connect to your smart building infrastructure for complete control and monitoring.'
      ]}
      features={[
        'Centralized control',
        'Energy management',
        'Smart building ready',
        'Professional automation'
      ]}
      heroImage={COMMERCIAL_MOTORISED_BLINDS_S3_IMAGES[0]}
      images={COMMERCIAL_MOTORISED_BLINDS_S3_IMAGES}
    />
  );
}

