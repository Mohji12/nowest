import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const Sheer_blind_roller =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/Sheer+Roller+Blinds';

const SHEER_HERO_IMAGE =
  `${Sheer_blind_roller}/An_ultra-detailed_macro_product_photography_202606220312.jpeg`;

const SHEER_S3_IMAGES = [
  `${Sheer_blind_roller}/A_single_ultra-realistic_luxury_interior_202606220253.jpeg`,
  `${Sheer_blind_roller}/An_ultra-realistic_cinematic_interior_photograph_202606220255.jpeg`,
  `${Sheer_blind_roller}/ChatGPT+Image+Jun+22%2C+2026%2C+02_53_57+AM.png`,
];

export default function SheerRollerBlinds() {
  return (
    <ProductDetailLayout
      name="Sheer Roller Blinds"
      subheading="SOFT LIGHT FILTERING & PRIVACY"
      description={[
        'Soft light-filtering roller blinds designed for living rooms, bedrooms, and lounges. Provide privacy while keeping the room bright. These elegant blinds feature translucent fabric that allows natural light to filter through while maintaining a sense of privacy and intimacy.',
        'The sheer fabric creates a beautiful diffused light effect that enhances the ambiance of any room. Perfect for spaces where you want to enjoy natural daylight without the harsh glare, sheer roller blinds offer the perfect balance between light control and privacy.',
        'Available in a variety of colors and textures, sheer roller blinds can be customized to match any interior design. From neutral tones that blend seamlessly with your decor to subtle patterns that add visual interest, these blinds combine functionality with aesthetic appeal.'
      ]}
      features={[
        'Soft light filtering',
        'Privacy friendly',
        'Perfect for living rooms and bedrooms',
        'Maintains room brightness'
      ]}
      heroImage={SHEER_HERO_IMAGE}
      images={SHEER_S3_IMAGES}
    />
  );
}

