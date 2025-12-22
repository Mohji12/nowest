import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const BLACKOUT_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ortega-Cranberry-Haven-Sky.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Verdant-Teal-Haven-Lipstick.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Lush-Maya-1-600x545.jpg',
];

export default function BlackoutCurtains() {
  return (
    <ProductDetailLayout
      name="Blackout Curtains"
      subheading="COMPLETE LIGHT CONTROL & PRIVACY"
      description={[
        'Blackout curtains provide complete light control and privacy with luxurious fabrics that offer superior insulation and sophisticated aesthetics. These premium window treatments are designed to block out all external light, creating a dark, peaceful environment perfect for bedrooms, home theaters, and spaces where complete darkness is desired.',
        'The thick, dense fabric construction not only blocks light but also provides excellent thermal insulation, helping to keep your home warm in winter and cool in summer. This energy-efficient feature can significantly reduce heating and cooling costs while creating a comfortable living environment.',
        'Available in a wide range of colors, patterns, and styles, blackout curtains combine functionality with aesthetic appeal. From elegant solids to sophisticated patterns, these curtains enhance your interior design while providing essential light control and privacy for restful sleep and comfortable living.'
      ]}
      features={[
        'Complete light control',
        'Superior insulation',
        'Luxurious fabrics',
        'Sophisticated aesthetics'
      ]}
      heroImage={BLACKOUT_CURTAINS_S3_IMAGES[0]}
      images={BLACKOUT_CURTAINS_S3_IMAGES}
    />
  );
}

