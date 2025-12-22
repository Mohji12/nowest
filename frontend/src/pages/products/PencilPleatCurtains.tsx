import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PENCIL_PLEAT_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flores-Biscuit.jpg',
];

export default function PencilPleatCurtains() {
  return (
    <ProductDetailLayout
      name="Pencil Pleat Curtains"
      subheading="VERSATILE & CLASSIC DESIGN"
      description={[
        'Pencil pleat curtains feature versatile narrow folds that fit both tracks and poles, making them suitable for any room style. This classic heading style creates elegant, uniform gathers that provide a timeless look while offering excellent light control and privacy.',
        'The narrow pleats create a neat, tailored appearance that works beautifully in both traditional and contemporary interiors. Available in a wide range of fabrics, colors, and patterns, pencil pleat curtains can be customized to match any interior design scheme.',
        'Perfect for living rooms, bedrooms, dining rooms, and any space where you want classic elegance combined with practical functionality. The versatile design ensures these curtains work seamlessly with various window sizes and styles, from standard windows to bay windows and beyond.'
      ]}
      features={[
        'Fits tracks & poles',
        'Narrow folds',
        'Classic look',
        'Room versatile'
      ]}
      heroImage={PENCIL_PLEAT_CURTAINS_S3_IMAGES[0]}
      images={PENCIL_PLEAT_CURTAINS_S3_IMAGES}
    />
  );
}

