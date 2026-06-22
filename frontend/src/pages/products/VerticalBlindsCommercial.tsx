import ProductDetailLayout from '@/components/ProductDetailLayout';

const VERTICAL_BLINDS_COMMERCIAL_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/vertical+commercial';

// S3 Images from Nowest_Image folder
const VERTICAL_BLINDS_COMMERCIAL_S3_IMAGES = [
  `${VERTICAL_BLINDS_COMMERCIAL_BASE}/A_vast_and_impressively_scaled_202606220610.jpeg`,
  `${VERTICAL_BLINDS_COMMERCIAL_BASE}/A_dramatically_imposing_and_architecturally_202606220534.jpeg`,
  `${VERTICAL_BLINDS_COMMERCIAL_BASE}/ChatGPT Image Jun 22, 2026, 05_33_53 AM.png`,
];
const VERTICAL_BLINDS_COMMERCIAL_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/vertical+commercial/ChatGPT+Image+Jun+22%2C+2026%2C+05_34_15+AM.png';

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
      heroImage={VERTICAL_BLINDS_COMMERCIAL_HERO_IMAGE}
      images={VERTICAL_BLINDS_COMMERCIAL_S3_IMAGES}
    />
  );
}

