import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const COMMERCIAL_ROLLER_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp',
];

export default function CommercialRollerBlinds() {
  return (
    <ProductDetailLayout
      name="Commercial Roller Blinds"
      subheading="HEAVY-DUTY & HIGH-TRAFFIC DURABLE"
      description={[
        'Commercial Roller Blinds are heavy-duty window treatments specifically designed for schools, offices, and commercial spaces. Built to withstand high-traffic environments, these blinds feature robust mechanisms and durable fabrics that maintain their appearance and functionality even under constant use.',
        'Available with blackout and light-filtering options, commercial roller blinds provide excellent light control for various commercial applications. Blackout options are perfect for conference rooms, theaters, and spaces requiring complete darkness, while light-filtering options maintain natural light in offices and common areas.',
        'The heavy-duty construction ensures years of reliable operation in demanding commercial environments. From schools requiring frequent adjustments to offices needing consistent light control, these blinds are engineered to meet the rigorous demands of commercial use while maintaining a professional appearance.'
      ]}
      features={[
        'Heavy-duty mechanisms',
        'Schools & offices',
        'Blackout options',
        'High-traffic durability'
      ]}
      heroImage={COMMERCIAL_ROLLER_BLINDS_S3_IMAGES[0]}
      images={COMMERCIAL_ROLLER_BLINDS_S3_IMAGES}
    />
  );
}

