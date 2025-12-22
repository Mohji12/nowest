import RoomDetailLayout from '@/components/RoomDetailLayout';

// S3 Images from Nowest_Image folder - Bathroom related images
const BATHROOM_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Bamboo_pacific-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Verdant-Teal-Haven-Lipstick.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/voile-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Lush-Maya-1-600x545.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/belle-peony-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/calista-mineral-300x300.jpg',
];

export default function Bathroom() {
  return (
    <RoomDetailLayout
      roomName="bathroom"
      subheading="THE"
      description={[
        'Create a serene and private sanctuary in your bathroom.',
        'Our bathroom blinds are designed to withstand moisture while providing privacy and light control. Choose from our range of water-resistant fabrics and materials that are perfect for bathroom environments.',
        'Browse our collection below to find the perfect window treatment for your bathroom.'
      ]}
      images={BATHROOM_IMAGES}
    />
  );
}



