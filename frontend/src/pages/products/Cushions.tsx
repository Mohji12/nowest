import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const CUSHIONS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/belle-peony-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/calista-mineral-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/cielo-amethyst-1-300x300.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/flores-mineral-2-1-300x300.jpg',
];

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
      heroImage={CUSHIONS_S3_IMAGES[0]}
      images={CUSHIONS_S3_IMAGES}
    />
  );
}

