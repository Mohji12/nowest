import RoomDetailLayout from '@/components/RoomDetailLayout';

const KITCHEN_BASE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/kitchen';

const KITCHEN_IMAGES = [
  `${KITCHEN_BASE}/A_bright_cheerful_kitchen_with_202606230239.jpeg`,
  `${KITCHEN_BASE}/A_Scandinavian-style_kitchen_with_minimalist_202606230234.jpeg`,
  `${KITCHEN_BASE}/A_bright_modern_kitchen_with_202606230233.jpeg`,
  `${KITCHEN_BASE}/A_colourful_family_kitchen_with_202606230238.jpeg`,
  `${KITCHEN_BASE}/A_cosy_farmhouse_kitchen_with_202606230233.jpeg`,
  `${KITCHEN_BASE}/A_rustic_kitchen_with_exposed_202606230239.jpeg`,
  `${KITCHEN_BASE}/A_sleek_contemporary_kitchen_with_202606230233.jpeg`,
  `${KITCHEN_BASE}/A_sophisticated_kitchen_with_gold_202606230239.jpeg`,
  `${KITCHEN_BASE}/ChatGPT+Image+Jun+23%2C+2026%2C+02_41_53+AM.png`,
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
