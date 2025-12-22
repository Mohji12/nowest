import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const EYELET_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flores-Biscuit.jpg',
];

export default function EyeletCurtains() {
  return (
    <ProductDetailLayout
      name="Eyelet Curtains"
      subheading="MODERN DESIGN WITH WAVE-LIKE FALL"
      description={[
        'Modern eyelet curtains feature a smooth wave-like fall that creates an elegant, contemporary appearance. Easy to open, close, and maintain, these curtains are suitable for contemporary interior designs where simplicity and style are equally important.',
        'The eyelet heading system uses metal rings that slide smoothly over curtain poles, creating beautiful, uniform folds. This design eliminates the need for hooks and makes installation and operation incredibly simple, while the wave-like fall creates a sophisticated, modern aesthetic.',
        'Perfect for modern homes, apartments, and contemporary spaces, eyelet curtains offer both aesthetic appeal and practical benefits. The easy operation and low maintenance make them ideal for busy households where convenience and style go hand in hand.'
      ]}
      features={[
        'Wave-like fall',
        'Modern design',
        'Easy operation',
        'Low maintenance'
      ]}
      heroImage={EYELET_CURTAINS_S3_IMAGES[0]}
      images={EYELET_CURTAINS_S3_IMAGES}
    />
  );
}

