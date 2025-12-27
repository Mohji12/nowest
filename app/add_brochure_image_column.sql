-- Add image column to brochures table
-- This allows brochures to have associated images from S3 bucket

ALTER TABLE brochures 
ADD COLUMN image VARCHAR(500) NULL 
AFTER pdf_path;

-- Update existing brochures with S3 image URLs if needed
-- Example: Update a brochure with an image URL
-- UPDATE brochures 
-- SET image = 'https://jgi-menteetracker.s3.ap-south-1.amazonaws.com/Nowest_Image/collection/Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp'
-- WHERE title = 'Collection2024';

