import ProductDetailLayout from '@/components/ProductDetailLayout';

const WOOD_VENETIAN_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/wood+venetian+blinds';

// S3 Images from Nowest_Image folder
const WOOD_VENETIAN_BLINDS_S3_IMAGES = [
  `${WOOD_VENETIAN_BLINDS_BASE}/A_magnificent_and_dramatically_atmospheric_202606220508.jpeg `,
  `${WOOD_VENETIAN_BLINDS_BASE}/An_ultra-realistic_interior_photography_image_202606220508.jpeg `,
  `${WOOD_VENETIAN_BLINDS_BASE}/ChatGPT Image Jun 22, 2026, 05_08_21 AM.png `,
];

const WOOD_VENETIAN_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/wood+venetian+blinds/ChatGPT+Image+Jun+22%2C+2026%2C+05_08_49+AM.png';
export default function WoodVenetianBlinds() {
  return (
    <ProductDetailLayout
      name="Wood Venetian Blinds"
      subheading="NATURAL ELEGANCE & WARMTH"
      description={[
        'Wood Venetian blinds bring natural elegance and warmth to any interior space. Crafted from premium wood materials, these blinds offer the perfect combination of style and functionality. The natural grain patterns and rich wood tones create a sophisticated aesthetic that complements both traditional and contemporary decor.',
        'Available in a variety of wood species including basswood, oak, and bamboo, wood Venetian blinds provide excellent light control and privacy. The horizontal slats can be adjusted to any angle, allowing you to control the amount of natural light entering your space while maintaining privacy.',
        'The natural insulating properties of wood help regulate temperature, keeping your home comfortable year-round. Easy to maintain and clean, wood Venetian blinds are an investment in both style and functionality that will enhance your home for years to come.'
      ]}
      features={[
        'Natural wood materials',
        'Excellent light control',
        'Natural insulation properties',
        'Timeless elegance'
      ]}
      heroImage={WOOD_VENETIAN_HERO_IMAGE}
      images={WOOD_VENETIAN_BLINDS_S3_IMAGES}
    />
  );
}

