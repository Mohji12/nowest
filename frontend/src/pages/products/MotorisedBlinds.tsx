import ProductDetailLayout from '@/components/ProductDetailLayout';

const MOTORISED_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/motorised+blinds/ChatGPT+Image+Jun+22%2C+2026%2C+04_51_30+AM.png';

const MOTORISED_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/motorised+blinds';
// S3 Images from Nowest_Image folder
const MOTORISED_BLINDS_S3_IMAGES = [
  `${MOTORISED_BLINDS_BASE}/A_sleek_and_powerful_executive_202606220451.jpeg`,
  `${MOTORISED_BLINDS_BASE}/An_ultra-realistic_luxury_bathroom_photography_202606220451.jpeg`,
  `${MOTORISED_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+04_51_47+AM.png`,
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
      heroImage={MOTORISED_HERO_IMAGE}
      images={MOTORISED_BLINDS_S3_IMAGES}
    />
  );
}

