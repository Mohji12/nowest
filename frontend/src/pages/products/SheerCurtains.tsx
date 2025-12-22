import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const SHEER_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/voile-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
];

export default function SheerCurtains() {
  return (
    <ProductDetailLayout
      name="Sheer Curtains"
      subheading="ELEGANT TRANSLUCENT FABRICS"
      description={[
        'Sheer curtains allow soft daylight into your home while adding elegance and privacy. Available in multiple textures, these delicate window treatments create a beautiful, airy atmosphere that enhances any interior design style.',
        'The translucent fabric filters natural light, creating a soft, diffused glow that brightens your space without harsh glare. Perfect for living rooms, bedrooms, and spaces where you want to enjoy natural daylight while maintaining a sense of privacy during daylight hours.',
        'Available in a variety of colors, patterns, and textures, sheer curtains can be layered with other window treatments for added versatility. Whether used alone for a light, airy feel or paired with blackout curtains for complete light control, sheer curtains add sophistication and style to any room.'
      ]}
      features={[
        'Soft daylight',
        'Elegant look',
        'Privacy layer',
        'Texture options'
      ]}
      heroImage={SHEER_CURTAINS_S3_IMAGES[0]}
      images={SHEER_CURTAINS_S3_IMAGES}
    />
  );
}

