import ProductDetailLayout from '@/components/ProductDetailLayout';

const PLEATED_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/Pleated+Blinds/ChatGPT+Image+Jun+22%2C+2026%2C+03_22_26+AM.png';

const PLEATED_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/Pleated+Blinds';

// S3 Images from Nowest_Image folder
const PLEATED_BLINDS_S3_IMAGES = [
  `${PLEATED_BLINDS_BASE}/A_single_ultra-realistic_luxury_interior_202606220321.jpeg`,
  `${PLEATED_BLINDS_BASE}/An_ultra-realistic_warm_and_gentle_202606220322.jpeg`,
  `${PLEATED_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+03_21_52+AM.png`,
];

export default function PleatedBlinds() {
  return (
    <ProductDetailLayout
      name="Pleated Blinds"
      subheading="SPACE-SAVING & THERMAL EFFICIENT"
      description={[
        'Space-saving pleated blinds with thermal efficiency. Ideal for conservatories, skylights, and modern homes. Available in various colours and textures. The unique pleated design creates a compact solution that takes up minimal space when raised, making them perfect for windows where space is at a premium.',
        'The thermal efficiency of pleated blinds helps regulate temperature in your home, keeping it warm in winter and cool in summer. The pleated fabric structure traps air, creating a natural insulation barrier that reduces energy costs and enhances comfort throughout the year.',
        'Perfect for conservatories, skylights, and modern homes where both style and functionality are important. The versatile design and wide range of color options ensure that pleated blinds can be customized to complement any interior design while providing practical benefits.'
      ]}
      features={[
        'Thermal efficient',
        'Space-saving design',
        'Ideal for conservatories and skylights',
        'Available in various colours and textures'
      ]}
      heroImage={PLEATED_HERO_IMAGE}
      images={PLEATED_BLINDS_S3_IMAGES}
    />
  );
}

