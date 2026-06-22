import ProductDetailLayout from '@/components/ProductDetailLayout';

const CURTAIN_TRACKS_POLES_BASE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/curtain+tracks+and+poles';

// S3 Images from Nowest_Image folder
const CURTAIN_TRACKS_POLES_S3_IMAGES = [
  `${CURTAIN_TRACKS_POLES_BASE}/ChatGPT Image Jun 22, 2026, 09_00_37 PM.png `,
  `${CURTAIN_TRACKS_POLES_BASE}/ChatGPT Image Jun 22, 2026, 09_00_46 PM.png `,
  `${CURTAIN_TRACKS_POLES_BASE}/Premium_product_and_interior_styling_202606222102.jpeg `,
];

const CURTAIN_TRACKS_POLES_HERO_IMAGE = 'https://nowest.s3.ap-south-1.amazonaws.com/collection/curtain+tracks+and+poles/ChatGPT+Image+Jun+22%2C+2026%2C+09_04_12+PM.png'

export default function CurtainTracksAndPoles() {
  return (
    <ProductDetailLayout
      name="Curtain Tracks and Poles"
      subheading="MADE-TO-MEASURE FROM UK'S TOP SUPPLIERS"
      description={[
        'We offer a wide selection of made-to-measure tracks and poles from the UK\'s top suppliers. Our custom options include straight and bay window solutions, heavy-duty bay window tracks, and extra-long tracks designed to meet your specific requirements.',
        'Our curtain tracks and poles are available in various styles, finishes, and materials to complement any interior design. From sleek, modern tracks that blend seamlessly with contemporary decor to elegant poles that add a decorative element, we have solutions for every window and style preference.',
        'Motorised options are available for added convenience, allowing you to control your curtains with the touch of a button. Whether you need a simple straight track or a complex bay window solution, our made-to-measure service ensures a perfect fit and professional installation.'
      ]}
      features={[
        'UK top suppliers',
        'Bay window solutions',
        'Heavy-duty options',
        'Motorised available'
      ]}
      heroImage={CURTAIN_TRACKS_POLES_HERO_IMAGE}
      images={CURTAIN_TRACKS_POLES_S3_IMAGES}
    />
  );
}

