import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const SECURITY_GRILLES_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
];

export default function SecurityGrilles() {
  return (
    <ProductDetailLayout
      name="Security Grilles"
      subheading="ROBUST PROTECTION FOR COMMERCIAL PROPERTIES"
      description={[
        'Security Grilles are robust security solutions designed to protect commercial and industrial properties. These heavy-duty grilles provide essential protection for storefronts, warehouses, and commercial buildings, offering both security and visibility. Easy to operate, durable, and ideal for commercial use.',
        'Constructed from high-strength materials, security grilles are designed to withstand forced entry attempts while maintaining the aesthetic appearance of your commercial property. The grilles can be manually operated or motorized for added convenience, allowing easy access during business hours while providing maximum security when closed.',
        'Perfect for retail stores, warehouses, offices, and industrial facilities, security grilles offer peace of mind by protecting your property and assets. Available in various styles and finishes, these grilles can be customized to match your building\'s design while providing essential security protection.'
      ]}
      features={[
        'High security',
        'Durable material',
        'Easy operation',
        'Ideal for commercial use'
      ]}
      heroImage={SECURITY_GRILLES_S3_IMAGES[0]}
      images={SECURITY_GRILLES_S3_IMAGES}
    />
  );
}

