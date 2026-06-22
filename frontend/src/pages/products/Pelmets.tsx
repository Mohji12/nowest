import ProductDetailLayout from '@/components/ProductDetailLayout';

const PELMETS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/pelmets';
// S3 Images from Nowest_Image folder
const PELMETS_S3_IMAGES = [
  `${PELMETS_BASE}/ChatGPT Image Jun 22, 2026, 06_42_57 AM.png`,
  `${PELMETS_BASE}/ChatGPT Image Jun 22, 2026, 06_42_51 AM.png`,
  `${PELMETS_BASE}/Generate_a_high-resolution_image_of_202606220642.jpeg`,
];

const PELMETS_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/pelmets/ChatGPT+Image+Jun+22%2C+2026%2C+06_42_05+AM.png';

export default function Pelmets() {
  return (
    <ProductDetailLayout
      name="Pelmets"
      subheading="DECORATIVE & FUNCTIONAL WINDOW FINISHING"
      description={[
        'Pelmets are available in Soft Padded, Solid Board, and Bonded Rails styles, helping to manage light, glare, and privacy while adding a decorative finish to your windows and rooms. These elegant window treatments provide both aesthetic appeal and practical benefits.',
        'Soft padded pelmets offer a luxurious, upholstered appearance that adds warmth and sophistication to any room. Solid board pelmets provide a clean, structured look perfect for modern interiors, while bonded rails offer a streamlined, contemporary finish.',
        'Perfect for completing your window treatment design, pelmets hide curtain tracks and hardware while adding a polished, professional appearance. Available in a wide range of fabrics and finishes, pelmets can be customized to match your curtains and interior design perfectly.'
      ]}
      features={[
        'Soft padded',
        'Solid board',
        'Bonded rails',
        'Decorative & functional'
      ]}
      heroImage={PELMETS_HERO_IMAGE}
      images={PELMETS_S3_IMAGES}
    />
  );
}

