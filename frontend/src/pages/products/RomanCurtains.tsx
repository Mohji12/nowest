import ProductDetailLayout from '@/components/ProductDetailLayout';

const ROMAN_CURTAINS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/roman+curtains'; 

// S3 Images from Nowest_Image folder
const ROMAN_CURTAINS_S3_IMAGES = [
  `${ROMAN_CURTAINS_BASE}/Create_a_photorealistic_image_of_202606220801.jpeg `,
  `${ROMAN_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 08_00_56 AM.png `,
  `${ROMAN_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 08_01_25 AM.png `,
];

const ROMAN_CURTAINS_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/roman+curtains/ChatGPT+Image+Jun+22%2C+2026%2C+08_01_02+AM.png';

export default function RomanCurtains() {
  return (
    <ProductDetailLayout
      name="Roman Curtains"
      subheading="CLASSIC ELEGANCE WITH CLEAN HORIZONTAL FOLDS"
      description={[
        'Roman curtains combine the softness of fabric with the practicality of blinds. Perfect for bedroom and living spaces, these elegant window treatments are available in multiple styles and linings to suit your needs.',
        'The classic design features soft fabric folds that create a tailored, sophisticated appearance. When raised, the curtains form beautiful horizontal folds; when lowered, they lie flat for excellent light control and privacy. Available with blackout linings for complete darkness or standard linings for filtered light.',
        'Perfect for bedrooms where you need light control for restful sleep, and living spaces where you want elegant style. The combination of fabric softness and blind practicality makes Roman curtains an ideal choice for any room where both aesthetics and functionality are important.'
      ]}
      features={[
        'Soft fabric folds',
        'Premium styles',
        'Blackout options',
        'Ideal for bedrooms'
      ]}
      heroImage={ROMAN_CURTAINS_HERO_IMAGE}
      images={ROMAN_CURTAINS_S3_IMAGES}
    />
  );
}

