import RoomDetailLayout from '@/components/RoomDetailLayout';

const BEDROOM_BASE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/bedroom';

const BEDROOM_IMAGES = [
  `${BEDROOM_BASE}/A_bold_modern_maximalist_bedroom_202606230317.jpeg`,
  `${BEDROOM_BASE}/A_bright_Scandinavian_style_bedroom_202606230316.jpeg`,
  `${BEDROOM_BASE}/A_bright_bohemian_bedroom_with_202606230316.jpeg`,
  `${BEDROOM_BASE}/A_charming_vintage_cottage_bedroom_202606230317.jpeg`,
  `${BEDROOM_BASE}/A_glamorous_Art_Deco_bedroom_202606230317.jpeg`,
  `${BEDROOM_BASE}/A_luxurious_master_bedroom_with_202606230316.jpeg`,
  `${BEDROOM_BASE}/A_peaceful_Japanese_minimalist_bedroom_202606230317.jpeg`,
  `${BEDROOM_BASE}/A_serene_coastal_bedroom_with_202606230317.jpeg`,
  `${BEDROOM_BASE}/A_stunning_luxury_bedroom_with_202606230317.jpeg`,
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
