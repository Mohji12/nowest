import ProductDetailLayout from '@/components/ProductDetailLayout';

const PENCIL_PLEAT_CURTAINS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/pencil+pleat+curtains';

// S3 Images from Nowest_Image folder
const PENCIL_PLEAT_CURTAINS_S3_IMAGES = [
  `${PENCIL_PLEAT_CURTAINS_BASE}/Generate_a_high-resolution_image_of_202606220651.jpeg 
`,
  `${PENCIL_PLEAT_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 06_51_22 AM.png `,
  `${PENCIL_PLEAT_CURTAINS_BASE}/ChatGPT Image Jun 22, 2026, 06_49_58 AM.png`,
];
const PENCIL_PLEAT_CURTAINS_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/pencil+pleat+curtains/ChatGPT+Image+Jun+22%2C+2026%2C+06_51_32+AM.png';

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
      heroImage={PENCIL_PLEAT_CURTAINS_HERO_IMAGE}
      images={PENCIL_PLEAT_CURTAINS_S3_IMAGES}
    />
  );
}

