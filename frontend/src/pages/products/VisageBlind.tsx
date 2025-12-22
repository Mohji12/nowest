import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const VISAGE_BLIND_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
];

export default function VisageBlind() {
  return (
    <ProductDetailLayout
      name="Visage Blind"
      subheading="INNOVATIVE PRIVACY & VIEW"
      description={[
        'Visage blinds feature cutting-edge fabric technology that provides privacy while maintaining an unobstructed view. This revolutionary design allows you to see out clearly while preventing others from seeing in during daylight hours. Perfect for ground floor windows, offices, and spaces where you want natural light without compromising privacy.',
        'The innovative micro-perforated fabric creates a one-way vision effect that ensures complete privacy during the day. Whether you\'re working from home, relaxing in your living room, or enjoying time in your kitchen, Visage blinds allow you to enjoy the view outside while keeping your interior private.',
        'Available in a range of colors and styles, Visage blinds can be motorised for added convenience. The combination of advanced technology and elegant design makes these blinds an ideal choice for modern homes where both style and functionality are essential.'
      ]}
      features={[
        'Privacy with unobstructed view',
        'Innovative fabric technology',
        'Perfect for ground floor windows',
        'Available in multiple colours'
      ]}
      heroImage={VISAGE_BLIND_S3_IMAGES[0]}
      images={VISAGE_BLIND_S3_IMAGES}
    />
  );
}

