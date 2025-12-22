import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const VERTICAL_BLINDS_COMMERCIAL_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Bamboo_pacific-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
];

export default function VerticalBlindsCommercial() {
  return (
    <ProductDetailLayout
      name="Vertical Commercial"
      subheading="DURABLE & FUNCTIONAL FOR COMMERCIAL BUILDINGS"
      description={[
        'Vertical Blinds Commercial are durable and functional window treatments specifically designed for offices, schools, and commercial buildings. These heavy-duty vertical blinds provide excellent glare and privacy control, making them ideal for large windows and glass facades commonly found in commercial environments.',
        'The commercial-grade materials and construction ensure these blinds can withstand the rigors of high-traffic commercial spaces. The vertical slats can be rotated to control glare from sunlight, protecting computer screens and creating comfortable working conditions, while also providing privacy when needed.',
        'Easy to maintain and clean, commercial vertical blinds are designed for long-term use in demanding environments. Available in a variety of colors and materials including fabric, PVC, and aluminum, these blinds offer both functionality and aesthetic appeal for modern commercial buildings.'
      ]}
      features={[
        'Glare control',
        'Commercial grade',
        'Durable material',
        'Easy to maintain'
      ]}
      heroImage={VERTICAL_BLINDS_COMMERCIAL_S3_IMAGES[0]}
      images={VERTICAL_BLINDS_COMMERCIAL_S3_IMAGES}
    />
  );
}

