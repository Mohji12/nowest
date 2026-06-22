import ProductDetailLayout from '@/components/ProductDetailLayout';

const WAVE_CURTAINS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/wave+curtains';

// S3 Images from Nowest_Image folder
const WAVE_CURTAINS_S3_IMAGES = [
  `${WAVE_CURTAINS_BASE}/Generate_a_high-resolution_image_of_202606220744.jpeg `,
  `${WAVE_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 07_43_56 AM.png `,
  `${WAVE_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 07_42_12 AM.png `,
];


const WAVE_CURTAINS_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/wave+curtains/ChatGPT+Image+Jun+22%2C+2026%2C+07_43_49+AM.png';

export default function WaveCurtains() {
  return (
    <ProductDetailLayout
      name="Wave Curtains"
      subheading="SMOOTH UNIFORM DRAPE FOR MODERN HOMES"
      description={[
        'Wave curtains provide a smooth, uniform drape using specially designed tracks, perfect for modern homes and wide windows. The innovative wave heading creates continuous, flowing folds that give a contemporary, minimalist appearance while maintaining excellent functionality.',
        'The specially designed track system ensures the curtains hang in perfect, uniform waves from top to bottom, creating a sleek, modern aesthetic. This design is particularly effective for large windows, sliding doors, and wide openings where a clean, uninterrupted look is desired.',
        'Available in a variety of fabrics and colors, wave curtains offer both style and practicality. The smooth operation and elegant appearance make them ideal for contemporary interiors where clean lines and modern design are priorities.'
      ]}
      features={[
        'Uniform drape',
        'Modern look',
        'Wide window suitable',
        'Special track system'
      ]}
      heroImage={WAVE_CURTAINS_HERO_IMAGE}
      images={WAVE_CURTAINS_S3_IMAGES}
    />
  );
}

