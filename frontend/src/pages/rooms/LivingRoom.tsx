import RoomDetailLayout from '@/components/RoomDetailLayout';

const LIVING_ROOM_BASE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/living+room';

const LIVING_ROOM_IMAGES = [
  `${LIVING_ROOM_BASE}/A_bright_contemporary_living_room_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_bright_playful_retro_70s_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_dreamy_romantic_living_room_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_grand_traditional_living_room_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_serene_Japandi_living_room_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_sophisticated_Art_Deco_living_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_stunning_modern_tropical_living_202606230345.jpeg`,
  `${LIVING_ROOM_BASE}/A_vibrant_eclectic_living_room_202606230333.jpeg`,
  `${LIVING_ROOM_BASE}/A_warm_rustic_farmhouse_living_202606230333.jpeg`,
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
