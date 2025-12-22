import RoomDetailLayout from '@/components/RoomDetailLayout';

// S3 Images from Nowest_Image folder - Bedroom related images
const BEDROOM_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Portrait-size-Natural_Grey_Cameo_Fabric.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/cielo-amethyst-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/flores-mineral-2-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/folina-slate-2-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/pavo-teal-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/verdant-teal-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
];

export default function Bedroom() {
  return (
    <RoomDetailLayout
      roomName="bedroom"
      subheading="THE"
      description={[
        'Transform your bedroom into a peaceful retreat with our luxurious window treatments.',
        'Our bedroom blinds and curtains offer complete light control for restful sleep, with blackout options available. Choose from elegant fabrics that complement your bedroom decor and create the perfect ambiance for relaxation.',
        'Explore our bedroom collection below for inspiration.'
      ]}
      images={BEDROOM_IMAGES}
    />
  );
}



