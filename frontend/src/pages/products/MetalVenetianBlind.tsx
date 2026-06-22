import ProductDetailLayout from '@/components/ProductDetailLayout';

const METAL_VENETIAN_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/Metal+Venetian+Blind';

const METAL_VENETIAN_BLINDS_S3_IMAGES = [
  `${METAL_VENETIAN_BLINDS_BASE}/A_single_ultra-realistic_cinematic_dramatic_202606220240.jpeg`,
  `${METAL_VENETIAN_BLINDS_BASE}/A_single_ultra-realistic_luxury_interior_202606220238.jpeg`,
  `${METAL_VENETIAN_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+02_42_20+AM.png`,
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
