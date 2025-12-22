import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const WOOD_VENETIAN_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
];

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
      heroImage={WOOD_VENETIAN_BLINDS_S3_IMAGES[0]}
      images={WOOD_VENETIAN_BLINDS_S3_IMAGES}
    />
  );
}

