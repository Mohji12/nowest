import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const URBAN_SHUTTERS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
];

export default function UrbanShuttersLouvolite() {
  return (
    <ProductDetailLayout
      name="Urban Shutters by Louvolite"
      subheading="CLASSICAL ELEGANCE"
      description={[
        'Urban Shutters by Louvolite transform your home with a classical selection of made-to-measure frames and door styles to suit any interior. These premium shutters offer timeless elegance and exceptional quality, providing excellent light control and privacy. The craftsmanship and attention to detail in every shutter ensure that you receive a product that not only looks beautiful but also performs flawlessly.',
        'Available in various styles including full-height, tier-on-tier, and café style, Urban Shutters can be customized to match your exact requirements and interior design preferences. Each style offers unique benefits - full-height shutters provide complete coverage, tier-on-tier offers flexibility with independent upper and lower sections, and café style maintains privacy while allowing light in through the top portion.',
        'The premium materials and construction mean that Urban Shutters are built to last, providing years of reliable service while maintaining their elegant appearance. These shutters are an investment in both style and functionality that will enhance your home for decades to come.'
      ]}
      features={[
        'Made-to-measure frames',
        'Classical design',
        'Multiple style options',
        'Louvolite quality guarantee'
      ]}
      heroImage={URBAN_SHUTTERS_S3_IMAGES[0]}
      images={URBAN_SHUTTERS_S3_IMAGES}
    />
  );
}

