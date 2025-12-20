-- SQL script to update product image URLs in the products table
-- This script replaces old S3 URLs with new S3 URLs

-- Update pencil-pleat-curtains.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp'
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/pencil-pleat-curtains.jpg';

-- Update wave-curtains.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp'
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/wave-curtains.jpg';

-- Update eyelet-curtains-150x150.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp'
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/eyelet-curtains-150x150.jpg';

-- Update 5-panel-curtains-1536x1536.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp'
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/5-panel-curtains-1536x1536.jpg';

-- Update pelmets_window_trea_eebc04a4.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp'
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/pelmets_window_trea_eebc04a4.jpg';

-- Update fire-retardant-curtains.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg'
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/fire-retardant-curtains.jpg';

-- Verify the updates
SELECT id, name, image 
FROM products 
WHERE image LIKE '%Nowest_Image/Landscape-PF3.jpg.webp%'
   OR image LIKE '%Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp%'
   OR image LIKE '%Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp%'
   OR image LIKE '%Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp%'
   OR image LIKE '%Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp%'
   OR image LIKE '%Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg%';





