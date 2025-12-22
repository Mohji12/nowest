import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const MOTORIZED_CURTAINS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Flock-Melody-2-780x780.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Mythic-Ecru.jpg',
];

export default function MotorizedCurtains() {
  return (
    <ProductDetailLayout
      name="Motorized Curtains"
      subheading="SMART AUTOMATION MEETS LUXURY DESIGN"
      description={[
        'Motorized curtains combine smart automation with luxury design, allowing you to control your curtains with precision using advanced motorization technology. Perfect for hard-to-reach windows, large windows, or anyone who wants the ultimate convenience in window treatments.',
        'Control your motorized curtains with a remote, smartphone app, or voice commands for seamless operation. The automation system can be programmed to open and close at specific times, helping to regulate temperature, save energy, and create the perfect ambiance throughout the day.',
        'Available with rechargeable batteries or hardwired options, motorized curtains can be integrated into existing smart home systems. Whether you use Amazon Alexa, Google Home, or Apple HomeKit, these curtains seamlessly connect to your home automation ecosystem for complete control at your fingertips.'
      ]}
      features={[
        'Smart automation',
        'Remote and app control',
        'Voice command compatible',
        'Programmable operation'
      ]}
      heroImage={MOTORIZED_CURTAINS_S3_IMAGES[0]}
      images={MOTORIZED_CURTAINS_S3_IMAGES}
    />
  );
}

