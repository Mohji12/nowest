import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const COMMERCIAL_METAL_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
];

export default function CommercialMetal() {
  return (
    <ProductDetailLayout
      name="Commercial Metal"
      subheading="DURABLE METAL WINDOW TREATMENTS"
      description={[
        'Commercial Metal window treatments are premium metal solutions designed specifically for commercial applications. These durable, low-maintenance blinds are perfect for high-traffic commercial environments where reliability and longevity are essential. The metal construction ensures years of trouble-free operation even in demanding commercial settings.',
        'Available in various metal finishes including aluminum, steel, and powder-coated options, commercial metal blinds offer both functionality and aesthetic appeal. The metal slats provide excellent light control and privacy while maintaining a professional appearance that complements modern commercial interiors.',
        'Ideal for offices, retail stores, schools, and other commercial spaces, these metal blinds are designed to withstand constant use and maintain their appearance over time. Easy to clean and maintain, commercial metal blinds are a practical and cost-effective solution for commercial window treatments.'
      ]}
      features={[
        'Durable metal construction',
        'Low maintenance',
        'Commercial grade',
        'High-traffic durability'
      ]}
      heroImage={COMMERCIAL_METAL_S3_IMAGES[0]}
      images={COMMERCIAL_METAL_S3_IMAGES}
    />
  );
}

