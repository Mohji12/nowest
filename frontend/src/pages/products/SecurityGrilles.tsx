import ProductDetailLayout from '@/components/ProductDetailLayout';

const SECURITY_GRILLES_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/security+grilles';

// S3 Images from Nowest_Image folder
const SECURITY_GRILLES_S3_IMAGES = [
  `${SECURITY_GRILLES_BASE}/
Name
	
Folder
	
Type
	
Size
	
Status
	
Error

ChatGPT Image Jun 22, 2026, 06_26_28 AM.png 
-
image/png
2.0 MB
Succeeded
-
Generate_a_detailed_industrial_scene_202606220624.jpeg`,
  `${SECURITY_GRILLES_BASE}/ChatGPT Image Jun 22, 2026, 06_26_02 AM.png`,
  `${SECURITY_GRILLES_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+06_24_20+AM.png`,
];
const SECURITY_GRILLES_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/security+grilles/ChatGPT+Image+Jun+22%2C+2026%2C+06_26_28+AM.png';

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
      heroImage={SECURITY_GRILLES_HERO_IMAGE}
      images={SECURITY_GRILLES_S3_IMAGES}
    />
  );
}

