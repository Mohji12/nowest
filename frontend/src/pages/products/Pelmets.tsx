import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PELMETS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
];

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
      heroImage={PELMETS_S3_IMAGES[0]}
      images={PELMETS_S3_IMAGES}
    />
  );
}

