import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const CONSERVATORY_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
];

export default function ConservatoryBlinds() {
  return (
    <ProductDetailLayout
      name="Conservatory Blinds"
      subheading="SPECIALIZED FOR CONSERVATORIES"
      description={[
        'Conservatory blinds are specially designed for conservatories and sunrooms, providing effective heat and light control in glass extensions. These specialized blinds help regulate temperature, reduce glare, and protect furniture from UV damage. The unique challenges of conservatory spaces require window treatments that can handle extreme temperature variations and intense sunlight.',
        'Available in various styles including roof blinds, side blinds, and combination systems, conservatory blinds are essential for creating a comfortable living space in your conservatory year-round. Roof blinds are particularly important for controlling overhead sunlight, while side blinds provide privacy and additional temperature control.',
        'The combination of effective insulation and light control means your conservatory can be enjoyed in all seasons, from bright summer days to cold winter evenings. These blinds transform your conservatory from a seasonal space into a year-round living area.'
      ]}
      features={[
        'Specialized for conservatories',
        'Effective heat control',
        'UV protection',
        'Multiple installation options'
      ]}
      heroImage={CONSERVATORY_BLINDS_S3_IMAGES[0]}
      images={CONSERVATORY_BLINDS_S3_IMAGES}
    />
  );
}

