import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const CELLULAR_PLEATED_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
];

export default function CellularPleatedBlinds() {
  return (
    <ProductDetailLayout
      name="Cellular and Pleated Blinds"
      subheading="ENERGY EFFICIENT & STYLISH"
      description={[
        'Cellular and pleated blinds feature an innovative honeycomb cell structure that provides excellent insulation and energy efficiency. This charming selection of colourways and patterns offers year-round benefits, keeping your home warm in winter and cool in summer. The unique cellular design traps air, creating a natural barrier against heat loss and gain.',
        'The honeycomb cells work like double glazing for your windows, significantly reducing energy costs while maintaining a comfortable indoor temperature. This makes cellular blinds an excellent investment for environmentally conscious homeowners who want to reduce their carbon footprint and energy bills.',
        'Available in single, double, and triple cell options, these blinds are perfect for any room where energy efficiency and style are priorities. From bedrooms to living rooms, cellular blinds provide both aesthetic appeal and practical benefits that enhance your home\'s comfort and value.'
      ]}
      features={[
        'Energy efficient honeycomb design',
        'Excellent insulation properties',
        'Wide range of colourways',
        'Year-round benefits'
      ]}
      heroImage={CELLULAR_PLEATED_BLINDS_S3_IMAGES[0]}
      images={CELLULAR_PLEATED_BLINDS_S3_IMAGES}
    />
  );
}

