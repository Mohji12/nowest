import ProductDetailLayout from '@/components/ProductDetailLayout'

const VISION_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/vision+blinds/A_sweeping_and_elegant_open-plan_202606220500.jpeg';

const VISION_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/vision+blinds';

// S3 Images from Nowest_Image folder
const VISION_BLINDS_S3_IMAGES = [
  `${VISION_BLINDS_BASE}/A_beautifully_composed_modern_ground_202606220500.jpeg`,
  `${VISION_BLINDS_BASE}/ChatGPT Image Jun 22, 2026, 05_00_06 AM.png`,
  `${VISION_BLINDS_BASE}/ChatGPT Image Jun 22, 2026, 05_00_24 AM.png`,
];

export default function VisionBlinds() {
  return (
    <ProductDetailLayout
      name="Vision® Blinds"
      subheading="PRIVACY WITH A VIEW"
      description={[
        'Vision® blinds feature innovative fabric technology that offers privacy while maintaining an unobstructed view. This revolutionary fabric allows you to see out while preventing others from seeing in during daylight hours. The unique micro-perforated design creates a one-way vision effect that provides complete privacy without sacrificing natural light.',
        'Perfect for ground floor windows and rooms where you want natural light without compromising privacy. Whether you\'re working from home, relaxing in your living room, or enjoying breakfast in the kitchen, Vision® blinds ensure you can see the world outside while keeping your interior private.',
        'Vision® blinds are available in a range of colors and can be motorised for added convenience. The combination of cutting-edge technology and elegant design makes these blinds an ideal choice for modern homes where style and functionality are equally important.'
      ]}
      features={[
        'Privacy with unobstructed view',
        'Innovative fabric technology',
        'Perfect for ground floor windows',
        'Available in multiple colours'
      ]}
      heroImage={VISION_HERO_IMAGE}
      images={VISION_BLINDS_S3_IMAGES}
    />
  );
}

