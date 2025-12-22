import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const VENETIAN_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
];

export default function VenetianBlinds() {
  return (
    <ProductDetailLayout
      name="Venetian Blinds"
      subheading="CLASSIC & TIMELESS"
      description={[
        'Venetian blinds feature classic horizontal slats that provide versatile light control and privacy. Available in wood, aluminum, and faux wood finishes, they offer a timeless style that suits any interior. The adjustable slats allow you to control the amount of light entering the room while maintaining privacy.',
        'The precision tilt mechanism gives you complete control over light direction and intensity. You can angle the slats to direct light upward for ambient lighting, downward for task lighting, or close them completely for maximum privacy. This versatility makes Venetian blinds suitable for any room in your home.',
        'Easy to clean and maintain, Venetian blinds are perfect for any room where you want classic elegance combined with practical functionality. The durable materials and simple design ensure that these blinds will continue to look great and function perfectly for years to come.'
      ]}
      features={[
        'Versatile light control',
        'Multiple material options',
        'Timeless style',
        'Easy maintenance'
      ]}
      heroImage={VENETIAN_BLINDS_S3_IMAGES[0]}
      images={VENETIAN_BLINDS_S3_IMAGES}
    />
  );
}

