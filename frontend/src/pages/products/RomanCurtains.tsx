import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const ROMAN_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
];

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
      heroImage={ROMAN_CURTAINS_S3_IMAGES[0]}
      images={ROMAN_CURTAINS_S3_IMAGES}
    />
  );
}

