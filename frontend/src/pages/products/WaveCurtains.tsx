import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const WAVE_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/voile-780x780.jpg',
];

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
      heroImage={WAVE_CURTAINS_S3_IMAGES[0]}
      images={WAVE_CURTAINS_S3_IMAGES}
    />
  );
}

