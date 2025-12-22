import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const MADE_TO_MEASURE_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ortega-Cranberry-Haven-Sky.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Verdant-Teal-Haven-Lipstick.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Lush-Maya-1-600x545.jpg',
];

export default function MadeToMeasureCurtains() {
  return (
    <ProductDetailLayout
      name="Made-to-measure Curtains"
      subheading="BESPOKE & PERFECT FIT"
      description={[
        'Made-to-measure curtains are bespoke window treatments tailored to your exact requirements. Every detail is customized to ensure a perfect fit and professional finish guaranteed. From precise measurements to fabric selection, heading styles, and finishing touches, our made-to-measure service creates curtains that are uniquely yours.',
        'Available in premium materials including silk, velvet, linen, and cotton, these curtains are crafted with attention to detail and professional expertise. Our experienced team works closely with you to understand your vision and bring it to life, ensuring every aspect of your curtains reflects your personal style and functional needs.',
        'Perfect for any window size or shape, including bay windows, arched windows, and unusual configurations. Whether you have a traditional Victorian bay window or a modern floor-to-ceiling glass wall, our made-to-measure service ensures a flawless fit that enhances both the window and the room.'
      ]}
      features={[
        'Perfect fit guaranteed',
        'Custom sizing for any window',
        'Professional finish',
        'Premium materials available'
      ]}
      heroImage={MADE_TO_MEASURE_CURTAINS_S3_IMAGES[0]}
      images={MADE_TO_MEASURE_CURTAINS_S3_IMAGES}
    />
  );
}

