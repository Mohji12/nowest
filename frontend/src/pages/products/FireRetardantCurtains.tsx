import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const FIRE_RETARDANT_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
];

export default function FireRetardantCurtains() {
  return (
    <ProductDetailLayout
      name="Fire Retardant Curtains"
      subheading="SAFETY-CRITICAL ENVIRONMENTS"
      description={[
        'Fire-retardant curtains are specifically designed for safety-critical environments such as hospitals, schools, hotels, and commercial spaces. These curtains are manufactured using specially treated fabrics that meet strict fire safety regulations and standards, providing essential protection in public and commercial buildings.',
        'The fire-retardant treatment ensures that the curtains will not easily ignite and will help prevent the spread of flames in the event of a fire. This makes them an essential safety feature in environments where large numbers of people gather, such as hospitals, schools, hotels, theaters, and office buildings.',
        'Available in a wide range of colors and styles, fire-retardant curtains maintain aesthetic appeal while meeting critical safety requirements. Professional installation ensures proper compliance with building codes and fire safety regulations, giving you peace of mind in safety-critical environments.'
      ]}
      features={[
        'Fire safety',
        'Commercial grade',
        'Durable fabric',
        'Regulation compliant'
      ]}
      heroImage={FIRE_RETARDANT_CURTAINS_S3_IMAGES[0]}
      images={FIRE_RETARDANT_CURTAINS_S3_IMAGES}
    />
  );
}

