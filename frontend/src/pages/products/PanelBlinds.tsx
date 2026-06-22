import ProductDetailLayout from '@/components/ProductDetailLayout';

const PANEL_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/panel+blinds/ChatGPT+Image+Jun+22%2C+2026%2C+04_27_43+AM.png';

const PANEL_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/panel+blinds';

// S3 Images from Nowest_Image folder
const PANEL_BLINDS_S3_IMAGES = [
  `${PANEL_BLINDS_BASE}/A_serene_and_airy_Scandinavian-inspired_202606220428.jpeg`,
  `${PANEL_BLINDS_BASE}/An_ultra-realistic_interior_photography_image_202606220428.jpeg`,
  `${PANEL_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+04_27_43+AM.png`,
];

export default function PanelBlinds() {
  return (
    <ProductDetailLayout
      name="Panel Blinds"
      subheading="MODERN & CONTEMPORARY"
      description={[
        'Panel blinds feature modern sliding panels perfect for large windows and contemporary spaces. With a sleek design and smooth operation, they offer an elegant solution for wide windows and sliding doors. The minimalist aesthetic of panel blinds makes them ideal for modern architectural designs.',
        'Available in a variety of fabrics and colors, panel blinds can be customized to match any interior style. From neutral tones that blend seamlessly with your decor to bold colors that make a statement, the customization options are virtually limitless.',
        'Their minimalist design makes them ideal for modern homes and offices where clean lines and functionality are essential. The smooth sliding mechanism ensures quiet operation, while the large panels provide excellent coverage for expansive windows and glass doors.'
      ]}
      features={[
        'Modern sliding panel design',
        'Perfect for large windows',
        'Smooth operation',
        'Contemporary style'
      ]}
      heroImage={PANEL_HERO_IMAGE}
      images={PANEL_BLINDS_S3_IMAGES}
    />
  );
}

