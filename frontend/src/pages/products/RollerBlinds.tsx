import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const ROLLER_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp',
];

export default function RollerBlinds() {
  return (
    <ProductDetailLayout
      name="Roller Blinds"
      subheading="STYLISH, SIMPLE & MODERN"
      description={[
        'Roller blinds are a stylish and practical window shade that can be a real focal point in the home. Our Louvolite window roller blinds collection offers a diverse range of fabric blinds with lustrous weaves and textures. Choose from prints that range from bold to tastefully simple, with effective blockouts for bedrooms and living spaces.',
        'Our roller blinds feature moisture resistant and Ultra-Fresh treated fabrics, making them perfect for bathrooms and kitchens. The innovative fabric technology ensures durability and easy maintenance, while the wide range of colors and patterns allows you to match any interior design style.',
        'For the ultimate in luxury & style, you can motorise your roller blinds with Louvolite One Touch® rechargeable motors. Customize with cassettes and bottom bars to create a truly bespoke window treatment solution that combines functionality with aesthetic appeal.'
      ]}
      features={[
        'Stunning Roller blind fabric designs',
        'A tremendous collection of colours',
        'Energy saving Roller blind fabrics',
        'Can be motorised'
      ]}
      heroImage={ROLLER_BLINDS_S3_IMAGES[0]}
      images={ROLLER_BLINDS_S3_IMAGES}
    />
  );
}

