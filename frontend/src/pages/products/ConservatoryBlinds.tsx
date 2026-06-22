import ProductDetailLayout from '@/components/ProductDetailLayout';

const CONSERVATORY_BLINDS_BASE =
  'https://nowest.s3.ap-south-1.amazonaws.com/collection/conservatory+blinds';

export const CONSERVATORY_BLINDS_HERO_IMAGE =
  `${CONSERVATORY_BLINDS_BASE}/A_spacious_and_airy_Edwardian_202606220345.jpeg`;

export const CONSERVATORY_BLINDS_S3_IMAGES = [
  CONSERVATORY_BLINDS_HERO_IMAGE,
  `${CONSERVATORY_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+03_45_18+AM.png`,
  `${CONSERVATORY_BLINDS_BASE}/ChatGPT+Image+Jun+22%2C+2026%2C+03_46_51+AM.png`,
];

export default function ConservatoryBlinds() {
  return (
    <ProductDetailLayout
      name="Conservatory Blinds"
      subheading="SPECIALIZED FOR CONSERVATORIES"
      description={[
        'Conservatory blinds are specially designed for conservatories and sunrooms, providing effective heat and light control in glass extensions. These specialized blinds help regulate temperature, reduce glare, and protect furniture from UV damage. The unique challenges of conservatory spaces require window treatments that can handle extreme temperature variations and intense sunlight.',
        'Available in various styles including roof blinds, side blinds, and combination systems, conservatory blinds are essential for creating a comfortable living space in your conservatory year-round. Roof blinds are particularly important for controlling overhead sunlight, while side blinds provide privacy and additional temperature control.',
        'Made-to-measure blinds that control light and heat while enhancing style. Perfect Fit® options provide child-safe, gap-free installation ideal for uPVC windows. The combination of effective insulation and light control means your conservatory can be enjoyed in all seasons, from bright summer days to cold winter evenings.'
      ]}
      features={[
        'Specialized for conservatories and sunrooms',
        'Effective heat and light control',
        'UV protection for furnishings',
        'Roof, side and door installation options',
        'Perfect Fit® child-safe options available'
      ]}
      heroImage={CONSERVATORY_BLINDS_HERO_IMAGE}
      images={CONSERVATORY_BLINDS_S3_IMAGES}
    />
  );
}
