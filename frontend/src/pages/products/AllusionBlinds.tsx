import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const ALLUSION_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Portrait-size-Natural_Grey_Cameo_Fabric.jpg.webp',
];

export default function AllusionBlinds() {
  return (
    <ProductDetailLayout
      name="Allusion® Blinds"
      subheading="ELEGANT & SOPHISTICATED"
      description={[
        'Allusion® blinds combine sheer and opaque textured fabric to create our most elegant blind yet. This unique design creates sophisticated light patterns in any room, offering the perfect balance between privacy and natural light. The alternating translucent and opaque stripes provide a contemporary aesthetic while maintaining functionality.',
        'The innovative fabric construction allows for precise light control - you can enjoy diffused natural light while maintaining privacy, or adjust the blind to create dramatic lighting effects throughout the day. This versatility makes Allusion® blinds perfect for spaces where you want both style and functionality.',
        'Available in a stunning range of colors and patterns, Allusion® blinds are perfect for living rooms, dining areas, and bedrooms where style meets practicality. Each design is carefully crafted to complement modern interiors while providing the practical benefits of effective light and privacy control.'
      ]}
      features={[
        'Sheer and opaque combination',
        'Sophisticated light patterns',
        'Contemporary aesthetic',
        'Wide range of colours and patterns'
      ]}
      heroImage={ALLUSION_BLINDS_S3_IMAGES[0]}
      images={ALLUSION_BLINDS_S3_IMAGES}
    />
  );
}

