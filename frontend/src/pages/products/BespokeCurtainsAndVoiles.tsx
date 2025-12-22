import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const BESPOKE_CURTAINS_VOILES_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
];

export default function BespokeCurtainsAndVoiles() {
  return (
    <ProductDetailLayout
      name="Bespoke Curtains and Voiles"
      subheading="PREMIUM COMMERCIAL-GRADE SOLUTIONS"
      description={[
        'Bespoke Curtains and Voiles are premium commercial-grade window treatments designed specifically for hotels, offices, and professional environments. These high-quality curtains and voiles are crafted with durable fabrics that meet commercial standards, including fire-retardant options for enhanced safety in public and commercial spaces.',
        'Our commercial curtains are available in a wide range of fabrics, from luxurious velvets and silks to practical cottons and linens, all meeting strict fire safety regulations. The voiles provide elegant light filtering while maintaining privacy, perfect for hotel rooms, conference centers, and office spaces where both aesthetics and functionality are essential.',
        'Professional installation ensures a perfect fit and flawless finish. Our experienced team works closely with architects, interior designers, and facility managers to create custom solutions that meet exact specifications, building codes, and design requirements for commercial projects of any scale.'
      ]}
      features={[
        'Fire-retardant options',
        'Hotel & office grade',
        'Professional installation',
        'Durable fabrics'
      ]}
      heroImage={BESPOKE_CURTAINS_VOILES_S3_IMAGES[0]}
      images={BESPOKE_CURTAINS_VOILES_S3_IMAGES}
    />
  );
}

