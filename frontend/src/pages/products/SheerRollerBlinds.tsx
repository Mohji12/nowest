import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const SHEER_ROLLER_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/voile-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
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
      heroImage={SHEER_ROLLER_BLINDS_S3_IMAGES[0]}
      images={SHEER_ROLLER_BLINDS_S3_IMAGES}
    />
  );
}

