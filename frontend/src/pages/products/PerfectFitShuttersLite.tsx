import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PERFECT_FIT_SHUTTERS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/PFNG-Image.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
];

export default function PerfectFitShuttersLite() {
  return (
    <ProductDetailLayout
      name="Perfect Fit Shutters Lite"
      subheading="LIGHTWEIGHT & PERFECT FIT"
      description={[
        'Perfect Fit Shutters Lite are lightweight shutters that fit perfectly inside your window frame without drilling. These innovative shutters offer the classic look of traditional shutters with the convenience of easy installation. The lightweight design makes them easy to handle during installation while maintaining the durability and functionality of traditional shutters.',
        'Perfect for any window size and style, they provide excellent light control and privacy while maintaining a neat, professional appearance. The precision fit ensures that each shutter sits perfectly within the window recess, creating a seamless, integrated look that enhances your windows.',
        'Ideal for uPVC windows and rental properties where a non-invasive solution is required. The easy installation and removal process means you can enjoy the benefits of shutters without making permanent alterations to your property, making them perfect for tenants or homeowners who prefer reversible installations.'
      ]}
      features={[
        'No drilling required',
        'Lightweight design',
        'Perfect fit installation',
        'Easy to install and remove'
      ]}
      heroImage={PERFECT_FIT_SHUTTERS_S3_IMAGES[0]}
      images={PERFECT_FIT_SHUTTERS_S3_IMAGES}
    />
  );
}

