export const NOWEST_S3_BASE_URL = 'https://nowest.s3.ap-south-1.amazonaws.com';
export const PORTFOLIO_S3_FOLDER = 'collection';
export const PORTFOLIO_NEW_IMAGES_FOLDER = 'New_images';

export const PORTFOLIO_HERO_IMAGE =
  `${NOWEST_S3_BASE_URL}/${PORTFOLIO_S3_FOLDER}/Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp`;

const LEGACY_BUCKET_PATTERN = /jgi-menteetracker(?:s)?\.s3\.ap-south-1\.amazonaws\.com/i;

function extractFilename(path: string): string {
  const withoutQuery = path.split('?')[0];
  return withoutQuery.split('/').pop() || withoutQuery;
}

function buildCollectionUrl(relativePath: string): string {
  return `${NOWEST_S3_BASE_URL}/${PORTFOLIO_S3_FOLDER}/${relativePath}`;
}

export function getPortfolioImageCandidates(imagePath: string): string[] {
  const filename = extractFilename(imagePath);

  if (imagePath.startsWith('http') && imagePath.includes('nowest.s3.ap-south-1.amazonaws.com')) {
    if (imagePath.includes(`/${PORTFOLIO_NEW_IMAGES_FOLDER}/`)) {
      return [imagePath];
    }
    return [
      buildCollectionUrl(`${PORTFOLIO_NEW_IMAGES_FOLDER}/${filename}`),
      buildCollectionUrl(filename),
      imagePath,
    ];
  }

  if (imagePath.startsWith('http') && LEGACY_BUCKET_PATTERN.test(imagePath)) {
    return [
      buildCollectionUrl(`${PORTFOLIO_NEW_IMAGES_FOLDER}/${filename}`),
      buildCollectionUrl(filename),
    ];
  }

  if (imagePath.startsWith('http')) {
    return [imagePath];
  }

  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  const pathWithoutFolder = cleanPath.startsWith(`${PORTFOLIO_S3_FOLDER}/`)
    ? cleanPath.slice(PORTFOLIO_S3_FOLDER.length + 1)
    : cleanPath;

  if (pathWithoutFolder.startsWith(`${PORTFOLIO_NEW_IMAGES_FOLDER}/`)) {
    return [buildCollectionUrl(pathWithoutFolder)];
  }

  return [
    buildCollectionUrl(`${PORTFOLIO_NEW_IMAGES_FOLDER}/${pathWithoutFolder}`),
    buildCollectionUrl(pathWithoutFolder),
  ];
}

export function rewriteLegacyPortfolioUrl(url: string): string {
  return getPortfolioImageCandidates(url)[0] || url;
}

export function getPortfolioImageUrl(imagePath?: string | null): string | undefined {
  if (!imagePath) return undefined;
  return getPortfolioImageCandidates(imagePath)[0];
}
