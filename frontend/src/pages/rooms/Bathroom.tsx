import RoomDetailLayout from '@/components/RoomDetailLayout';

const BATHROOM_BASE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection';

const BATHROOM_IMAGES = [
  `${BATHROOM_BASE}/A_bright_family_bathroom_with_202606230251.jpeg`,
  `${BATHROOM_BASE}/A_bright_family_bathroom_with_202606230254.jpeg`,
  `${BATHROOM_BASE}/A_bright_family_bathroom_with_202606230255.jpeg`,
  `${BATHROOM_BASE}/A_bright_modern_bathroom_with_202606230250.jpeg`,
  `${BATHROOM_BASE}/A_cosy_vintage_bathroom_with_202606230251.jpeg`,
  `${BATHROOM_BASE}/A_cosy_vintage_bathroom_with_202606230254.jpeg`,
  `${BATHROOM_BASE}/A_sleek_contemporary_bathroom_with_202606230251.jpeg`,
  `${BATHROOM_BASE}/A_sleek_contemporary_bathroom_with_202606230255.jpeg`,
  `${BATHROOM_BASE}/A_stylish_industrial_bathroom_with_202606230257.jpeg`,
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
