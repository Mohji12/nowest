import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PINCH_PLEAT_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ortega-Cranberry-Haven-Sky.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Verdant-Teal-Haven-Lipstick.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Lush-Maya-1-600x545.jpg',
];

export default function PinchPleatCurtains() {
  return (
    <ProductDetailLayout
      name="Pinch Pleat Curtains"
      subheading="ELEGANT PLEATS WITH PREMIUM FINISH"
      description={[
        'Pinch pleat curtains feature evenly spaced gathers for a smart, tailored finish. These elegant curtains offer excellent light reduction, noise insulation, and a sophisticated appearance that enhances any interior design.',
        'The carefully crafted pleats create a structured, formal look that works beautifully in traditional and classic interiors. The evenly spaced gathers ensure uniform fullness and drape, creating a luxurious appearance while providing practical benefits like light control and sound dampening.',
        'Available in premium fabrics and a wide range of colors, pinch pleat curtains add elegance and sophistication to any room. Perfect for formal living rooms, dining rooms, and bedrooms where you want a refined, tailored appearance combined with excellent functionality.'
      ]}
      features={[
        'Elegant pleats',
        'Premium finish',
        'Light reduction',
        'Noise insulation'
      ]}
      heroImage={PINCH_PLEAT_CURTAINS_S3_IMAGES[0]}
      images={PINCH_PLEAT_CURTAINS_S3_IMAGES}
    />
  );
}

