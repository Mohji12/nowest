import RoomDetailLayout from '@/components/RoomDetailLayout';

// S3 Images from Nowest_Image folder - Living Room related images
const LIVING_ROOM_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Portrait-size-Natural_Grey_Cameo_Fabric.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Picture2.png',
];

export default function LivingRoom() {
  return (
    <RoomDetailLayout
      roomName="living room"
      subheading="THE"
      description={[
        'Make a statement in your living room with our elegant window treatments.',
        'Our living room blinds and curtains are designed to enhance your space with style and functionality. From sheer fabrics that filter natural light to blackout options for complete privacy, we have the perfect solution for every living room.',
        'Discover our living room collection below.'
      ]}
      images={LIVING_ROOM_IMAGES}
    />
  );
}

