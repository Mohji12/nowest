import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const CURTAIN_TRACKS_POLES_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/kelso-with-70mm-fascia-profile-in-black.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/sephora-sand-with-white-back-bar-1.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0158-1920x1080.jpeg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/IMG_0165-rotated.jpeg',
];

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
      heroImage={CURTAIN_TRACKS_POLES_S3_IMAGES[0]}
      images={CURTAIN_TRACKS_POLES_S3_IMAGES}
    />
  );
}

