import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PRECISION_ROLLER_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp',
];

export default function PrecisionRollerBlindLouvolite() {
  return (
    <ProductDetailLayout
      name="Precision Roller Blind by Louvolite"
      subheading="PRECISION ENGINEERING"
      description={[
        'Precision Roller Blinds by Louvolite represent the pinnacle of roller blind engineering. With superior quality and performance, these premium blinds offer precise operation and exceptional durability. Every component is engineered to exacting standards, ensuring smooth, reliable operation that stands the test of time.',
        'Featuring high-quality fabrics and precision mechanisms, Precision Roller Blinds are designed for those who demand the very best in window treatments. The fabrics are carefully selected for their durability, light-filtering properties, and aesthetic appeal, while the mechanisms are engineered for years of trouble-free operation.',
        'Available in a wide range of colors and patterns, they combine style with unmatched functionality. Whether you prefer subtle neutrals that blend seamlessly with your decor or bold patterns that make a statement, Precision Roller Blinds offer options to suit every taste and interior design style.'
      ]}
      features={[
        'Precision engineering',
        'Superior quality',
        'Exceptional durability',
        'Louvolite brand guarantee'
      ]}
      heroImage={PRECISION_ROLLER_BLINDS_S3_IMAGES[0]}
      images={PRECISION_ROLLER_BLINDS_S3_IMAGES}
    />
  );
}

