import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const VISION_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
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
      heroImage={VISION_BLINDS_S3_IMAGES[0]}
      images={VISION_BLINDS_S3_IMAGES}
    />
  );
}

