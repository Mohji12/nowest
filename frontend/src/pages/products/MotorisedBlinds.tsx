import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const MOTORISED_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_automated__978f737d.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
];

export default function MotorisedBlinds() {
  return (
    <ProductDetailLayout
      name="Motorised Blinds"
      subheading="SMART & CONVENIENT"
      description={[
        'Motorised blinds offer the ultimate in convenience and smart home integration. Control your blinds with a remote, smartphone app, or voice commands for seamless operation. Perfect for hard-to-reach windows, large windows, or anyone who wants the convenience of automated window treatments.',
        'Motorised blinds can be programmed to open and close at specific times, helping to regulate temperature and save energy. This automation not only adds convenience but also contributes to energy efficiency by optimizing natural light and temperature control throughout the day.',
        'Available with rechargeable batteries or hardwired options, motorised blinds can be integrated into existing smart home systems. Whether you use Amazon Alexa, Google Home, or Apple HomeKit, these blinds seamlessly connect to your home automation ecosystem for complete control at your fingertips.'
      ]}
      features={[
        'Smart home integration',
        'Remote and app control',
        'Voice command compatible',
        'Programmable operation'
      ]}
      heroImage={MOTORISED_BLINDS_S3_IMAGES[0]}
      images={MOTORISED_BLINDS_S3_IMAGES}
    />
  );
}

