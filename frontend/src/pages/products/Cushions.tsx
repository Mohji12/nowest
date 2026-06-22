import ProductDetailLayout from '@/components/ProductDetailLayout';

const CUSHIONS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/cushions';
// S3 Images from Nowest_Image folder
const CUSHIONS_S3_IMAGES = [
  `${CUSHIONS_BASE}/ChatGPT Image Jun 22, 2026, 08_22_19 AM.png `,
  `${CUSHIONS_BASE}/ChatGPT Image Jun 22, 2026, 08_23_33 AM.png `,
  `${CUSHIONS_BASE}/An_ultra-realistic_premium_product_photography_202606220821.jpeg `,
];

const CUSHIONS_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/cushions/ChatGPT+Image+Jun+22%2C+2026%2C+08_22_03+AM.png';

export default function Cushions() {
  return (
    <ProductDetailLayout
      name="Cushions"
      subheading="HANDCRAFTED FINISHING TOUCH FOR YOUR INTERIOR"
      description={[
        'Add a finishing touch to your interior with our handcrafted cushions, individually designed to complement your colour scheme. Each cushion is carefully crafted with attention to detail, ensuring both aesthetic appeal and comfort.',
        'Our standard size is 40cm x 40cm, but custom sizes are available to meet your specific requirements. Whether you need small accent cushions or large statement pieces, we can create cushions that perfectly match your interior design vision.',
        'Available in a wide range of fabrics, colors, and patterns, our cushions can be customized to coordinate with your curtains, furniture, and overall interior design. From luxurious velvets and silks to practical cottons and linens, each cushion is designed to enhance your living space.'
      ]}
      features={[
        'Handcrafted design',
        'Complement colour scheme',
        '40cm x 40cm standard',
        'Custom sizes available'
      ]}
      heroImage={CUSHIONS_HERO_IMAGE}
      images={CUSHIONS_S3_IMAGES}
    />
  );
}

