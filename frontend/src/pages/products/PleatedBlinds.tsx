import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PLEATED_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/panel_blinds_sliding_0c1c0c07.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
];

export default function PleatedBlinds() {
  return (
    <ProductDetailLayout
      name="Pleated Blinds"
      subheading="SPACE-SAVING & THERMAL EFFICIENT"
      description={[
        'Space-saving pleated blinds with thermal efficiency. Ideal for conservatories, skylights, and modern homes. Available in various colours and textures. The unique pleated design creates a compact solution that takes up minimal space when raised, making them perfect for windows where space is at a premium.',
        'The thermal efficiency of pleated blinds helps regulate temperature in your home, keeping it warm in winter and cool in summer. The pleated fabric structure traps air, creating a natural insulation barrier that reduces energy costs and enhances comfort throughout the year.',
        'Perfect for conservatories, skylights, and modern homes where both style and functionality are important. The versatile design and wide range of color options ensure that pleated blinds can be customized to complement any interior design while providing practical benefits.'
      ]}
      features={[
        'Thermal efficient',
        'Space-saving design',
        'Ideal for conservatories and skylights',
        'Available in various colours and textures'
      ]}
      heroImage={PLEATED_BLINDS_S3_IMAGES[0]}
      images={PLEATED_BLINDS_S3_IMAGES}
    />
  );
}

