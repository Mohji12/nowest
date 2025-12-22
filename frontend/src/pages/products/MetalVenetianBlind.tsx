import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const METAL_VENETIAN_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
];

export default function MetalVenetianBlind() {
  return (
    <ProductDetailLayout
      name="Metal Venetian Blind"
      subheading="PRECISE CONTROL & MODERN FINISH"
      description={[
        'Premium metal venetian blinds that allow precise control over light and privacy. Perfect for homes, offices, and commercial spaces with a clean, modern finish. The durable metal construction ensures long-lasting performance while maintaining a sleek, contemporary appearance.',
        'The horizontal slats can be adjusted to any angle, giving you complete control over the amount of light entering your space. Whether you need full privacy, diffused light, or complete darkness, metal venetian blinds provide the flexibility to create the perfect ambiance for any time of day.',
        'Available in a wide range of colors and finishes, metal venetian blinds complement any interior design style. From classic white and beige to bold colors and metallic finishes, these blinds offer both functionality and aesthetic appeal for modern living and working spaces.'
      ]}
      features={[
        'Precise light control',
        'Durable metal construction',
        'Modern clean finish',
        'Perfect for homes and offices'
      ]}
      heroImage={METAL_VENETIAN_BLINDS_S3_IMAGES[0]}
      images={METAL_VENETIAN_BLINDS_S3_IMAGES}
    />
  );
}

