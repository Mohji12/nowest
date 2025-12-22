import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PANEL_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/panel_blinds_sliding_0c1c0c07.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
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
      heroImage={PANEL_BLINDS_S3_IMAGES[0]}
      images={PANEL_BLINDS_S3_IMAGES}
    />
  );
}

