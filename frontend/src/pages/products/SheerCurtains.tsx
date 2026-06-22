import ProductDetailLayout from '@/components/ProductDetailLayout';

const SHEER_CURTAINS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/sheer+curtains';

// S3 Images from Nowest_Image folder
const SHEER_CURTAINS_S3_IMAGES = [
  `${SHEER_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 06_35_50 AM.png`,
  `${SHEER_CURTAINS_BASE}/Generate_a_high-resolution_image_of_202606220636.jpeg`,
  `${SHEER_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 06_36_15 AM.png `,
];

const SHEER_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/sheer+curtains/ChatGPT+Image+Jun+22%2C+2026%2C+06_36_27+AM.png';
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
      heroImage={SHEER_HERO_IMAGE}
      images={SHEER_CURTAINS_S3_IMAGES}
    />
  );
}

