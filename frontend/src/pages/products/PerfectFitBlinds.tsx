import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const PERFECT_FIT_BLINDS_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/PFNG-Image.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp',
];

export default function PerfectFitBlinds() {
  return (
    <ProductDetailLayout
      name="Perfect Fit® Blinds"
      subheading="NO DRILLING REQUIRED"
      description={[
        'Perfect Fit® blinds are designed to fit perfectly inside your window frame without any drilling required. This innovative system allows you to complement your roller, vision, and pleated/cellular blinds with a seamless installation. The unique mounting system clips directly onto your window frame, ensuring a perfect fit every time.',
        'Available in a range of styles and colors, Perfect Fit® blinds are ideal for uPVC windows and provide a neat, professional finish. The precision engineering ensures that each blind fits snugly within the window recess, creating a clean, integrated look that enhances your windows rather than detracting from them.',
        'Easy to install and remove, they are perfect for rental properties or anyone who wants a non-invasive window treatment solution. Whether you\'re a tenant who can\'t make permanent alterations or a homeowner who prefers a reversible installation, Perfect Fit® blinds offer the perfect solution.'
      ]}
      features={[
        'No drilling required',
        'Perfect fit inside window frame',
        'Easy installation and removal',
        'Ideal for uPVC windows'
      ]}
      heroImage={PERFECT_FIT_BLINDS_S3_IMAGES[0]}
      images={PERFECT_FIT_BLINDS_S3_IMAGES}
    />
  );
}

