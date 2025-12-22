import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const VERTICAL_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Bamboo_pacific-700x500-1.jpg.webp',
];

export default function VerticalBlinds() {
  return (
    <ProductDetailLayout
      name="Vertical Blinds"
      subheading="VERSATILE & ELEGANT"
      description={[
        'Vertical blinds are the perfect solution for large windows, sliding doors, and patio doors. Their elegant vertical slats can be rotated to control light and privacy with precision, or drawn to one side for an unobstructed view. This versatile design makes them ideal for both residential and commercial applications.',
        'Available in a wide range of fabrics, PVC, and aluminum materials, vertical blinds offer durability and style for any space. The variety of materials ensures you can find the perfect option for your specific needs, whether you require maximum light control, privacy, or aesthetic appeal.',
        'Perfect for modern homes and offices, they provide excellent light control while maintaining a sleek, contemporary appearance. The smooth operation and easy maintenance make vertical blinds a practical choice for busy households and commercial spaces.'
      ]}
      features={[
        'Perfect for large windows and doors',
        'Versatile light control',
        'Available in multiple materials',
        'Easy to clean and maintain'
      ]}
      heroImage={VERTICAL_BLINDS_S3_IMAGES[0]}
      images={VERTICAL_BLINDS_S3_IMAGES}
    />
  );
}

