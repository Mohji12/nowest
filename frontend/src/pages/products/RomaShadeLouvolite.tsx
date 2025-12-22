import ProductDetailLayout from '@/components/ProductDetailLayout';

// S3 Images from Nowest_Image folder
const ROMA_SHADE_S3_IMAGES = [
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/strata-curtain.jpg',
  'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Ella-Tilla-2.jpg',
];

export default function RomaShadeLouvolite() {
  return (
    <ProductDetailLayout
      name="RomaShade® by Louvolite"
      subheading="ELEGANT ROMAN DESIGN"
      description={[
        'RomaShade® by Louvolite features an elegant Roman shade design with smooth, precise operation. These beautiful blinds create soft, cascading folds when raised and lie flat when lowered, offering excellent light control and privacy. The graceful folds add texture and visual interest to your windows while maintaining a clean, sophisticated appearance.',
        'Available in a stunning range of fabrics and colors, RomaShade® blinds add sophistication and style to any room. From luxurious silks and velvets to practical cottons and linens, the fabric options ensure you can find the perfect match for your interior design vision.',
        'Perfect for bedrooms, living rooms, and dining areas where you want a touch of elegance. The combination of beautiful design and practical functionality makes RomaShade® blinds an excellent choice for any room where style and performance are equally important.'
      ]}
      features={[
        'Elegant Roman shade design',
        'Smooth operation',
        'Beautiful fabric options',
        'Louvolite quality'
      ]}
      heroImage={ROMA_SHADE_S3_IMAGES[0]}
      images={ROMA_SHADE_S3_IMAGES}
    />
  );
}

