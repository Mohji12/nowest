-- ============================================================================
-- Complete SQL Script to Update Product Image URLs in the Products Table
-- ============================================================================
-- This script replaces old S3 URLs with new S3 URLs
-- Run this script on your MySQL database
-- ============================================================================

-- Start transaction for safety (can rollback if needed)
START TRANSACTION;

-- ============================================================================
-- UPDATE STATEMENTS
-- ============================================================================

-- 1. Update pencil-pleat-curtains.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp',
    updated_at = NOW()
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/pencil-pleat-curtains.jpg';

-- 2. Update wave-curtains.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp',
    updated_at = NOW()
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/wave-curtains.jpg';

-- 3. Update eyelet-curtains-150x150.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
    updated_at = NOW()
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/eyelet-curtains-150x150.jpg';

-- 4. Update 5-panel-curtains-1536x1536.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp',
    updated_at = NOW()
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/5-panel-curtains-1536x1536.jpg';

-- 5. Update pelmets_window_trea_eebc04a4.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
    updated_at = NOW()
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/pelmets_window_trea_eebc04a4.jpg';

-- 6. Update fire-retardant-curtains.jpg
UPDATE products 
SET image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg',
    updated_at = NOW()
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/fire-retardant-curtains.jpg';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check how many products were updated with each new URL
SELECT 
    'Landscape-PF3.jpg.webp' AS new_image_name,
    COUNT(*) AS product_count
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-PF3.jpg.webp'

UNION ALL

SELECT 
    'Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp' AS new_image_name,
    COUNT(*) AS product_count
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp'

UNION ALL

SELECT 
    'Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp' AS new_image_name,
    COUNT(*) AS product_count
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp'

UNION ALL

SELECT 
    'Landscape_Petal_White_Liv-1024x731.jpg.webp' AS new_image_name,
    COUNT(*) AS product_count
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp'

UNION ALL

SELECT 
    'Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp' AS new_image_name,
    COUNT(*) AS product_count
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp'

UNION ALL

SELECT 
    'Landscape-size-Birdsong-Colour-Crush_Kit.jpg' AS new_image_name,
    COUNT(*) AS product_count
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg';

-- Show all products with the new image URLs (detailed view)
SELECT 
    id,
    name,
    category,
    image,
    updated_at
FROM products 
WHERE image LIKE '%Nowest_Image/Landscape-PF3.jpg.webp%'
   OR image LIKE '%Nowest_Image/Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp%'
   OR image LIKE '%Nowest_Image/Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp%'
   OR image LIKE '%Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp%'
   OR image LIKE '%Nowest_Image/Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp%'
   OR image LIKE '%Nowest_Image/Landscape-size-Birdsong-Colour-Crush_Kit.jpg%'
ORDER BY updated_at DESC;

-- Check if any old URLs still exist (should return 0 rows if all updates were successful)
SELECT 
    id,
    name,
    image,
    'OLD URL STILL EXISTS' AS status
FROM products 
WHERE image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/pencil-pleat-curtains.jpg'
   OR image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/wave-curtains.jpg'
   OR image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/eyelet-curtains-150x150.jpg'
   OR image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/5-panel-curtains-1536x1536.jpg'
   OR image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/pelmets_window_trea_eebc04a4.jpg'
   OR image = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/fire-retardant-curtains.jpg';

-- ============================================================================
-- COMMIT OR ROLLBACK
-- ============================================================================
-- If everything looks good, commit the changes:
-- COMMIT;

-- If you need to rollback (undo the changes), use:
-- ROLLBACK;

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- This script updates 6 different image URLs in the products table:
-- 
-- 1. pencil-pleat-curtains.jpg → Landscape-PF3.jpg.webp
-- 2. wave-curtains.jpg → Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp
-- 3. eyelet-curtains-150x150.jpg → Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp
-- 4. 5-panel-curtains-1536x1536.jpg → Landscape_Petal_White_Liv-1024x731.jpg.webp
-- 5. pelmets_window_trea_eebc04a4.jpg → Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp
-- 6. fire-retardant-curtains.jpg → Landscape-size-Birdsong-Colour-Crush_Kit.jpg
-- ============================================================================













