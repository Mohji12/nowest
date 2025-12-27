import RoomDetailLayout from '@/components/RoomDetailLayout';

// S3 Images from Nowest_Image folder - Kitchen related images ONLY
// All images should be specifically related to kitchen/dining areas
const KITCHEN_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp', // Kitchen specific
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg.webp', // Kit = Kitchen
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp', // Dine = Dining/Kitchen
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/PFNG-Image.jpg.webp', // Perfect Fit - Kitchen suitable
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp', // Perfect Fit - Kitchen suitable
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg', // Kitchen suitable fabric
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg', // Kitchen suitable fabric
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flores-Biscuit.jpg', // Kitchen suitable fabric
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg', // Kitchen suitable fabric
];

export default function Kitchen() {
  return (
    <RoomDetailLayout
      roomName="kitchen"
      subheading="THE"
      description={[
        'The heart of the home where the family come together.',
        'Having blinds in the kitchen allows the daylight to beam through in the day and keep it cosy in the evenings. Our fabric collection is practical, moisture resistant and has a vast variety or colours & patterns for you to choose from.',
        'Check out our photography below for some inspiration!'
      ]}
      images={KITCHEN_IMAGES}
    />
  );
}







