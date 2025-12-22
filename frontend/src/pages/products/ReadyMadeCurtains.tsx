import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const READY_MADE_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flores-Biscuit.jpg',
];

export default function ReadyMadeCurtains() {
  return (
    <ProductDetailLayout
      name="Ready-made Curtains"
      subheading="QUICK & CONVENIENT"
      description={[
        'Ready-made curtains offer beautiful designs available in standard sizes for immediate style transformation. Perfect for those who want quick delivery and easy installation without the wait of custom manufacturing. Our ready-made collection features a wide range of fabrics, colors, and patterns to suit any interior style.',
        'From elegant sheers to luxurious blackout options, these curtains provide an instant solution for window treatments while maintaining quality and style. Each curtain is carefully selected to ensure it meets our high standards for both aesthetics and functionality.',
        'Ideal for standard window sizes, they offer excellent value and convenience. Whether you\'re looking to refresh a single room or outfit an entire home, ready-made curtains provide a cost-effective solution without compromising on style or quality.'
      ]}
      features={[
        'Quick delivery available',
        'Standard sizes for convenience',
        'Easy installation',
        'Beautiful design options'
      ]}
      heroImage={READY_MADE_CURTAINS_S3_IMAGES[0]}
      images={READY_MADE_CURTAINS_S3_IMAGES}
    />
  );
}

