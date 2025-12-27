-- ============================================
-- Fix Invalid MySQL Datetime Values
-- This script updates all '0000-00-00 00:00:00' values to NULL
-- ============================================

USE nowest_interior;

-- Fix products table
UPDATE `products` 
SET `created_at` = NULL 
WHERE `created_at` = '0000-00-00 00:00:00' OR YEAR(`created_at`) = 0;

UPDATE `products` 
SET `updated_at` = NULL 
WHERE `updated_at` = '0000-00-00 00:00:00' OR YEAR(`updated_at`) = 0;

-- Fix portfolio table
UPDATE `portfolio` 
SET `created_at` = NULL 
WHERE `created_at` = '0000-00-00 00:00:00' OR YEAR(`created_at`) = 0;

UPDATE `portfolio` 
SET `updated_at` = NULL 
WHERE `updated_at` = '0000-00-00 00:00:00' OR YEAR(`updated_at`) = 0;

-- Fix brochures table
UPDATE `brochures` 
SET `created_at` = NULL 
WHERE `created_at` = '0000-00-00 00:00:00' OR YEAR(`created_at`) = 0;

UPDATE `brochures` 
SET `updated_at` = NULL 
WHERE `updated_at` = '0000-00-00 00:00:00' OR YEAR(`updated_at`) = 0;

-- Fix leads table
UPDATE `leads` 
SET `created_at` = NULL 
WHERE `created_at` = '0000-00-00 00:00:00' OR YEAR(`created_at`) = 0;

-- Fix seo_settings table
UPDATE `seo_settings` 
SET `updated_at` = NULL 
WHERE `updated_at` = '0000-00-00 00:00:00' OR YEAR(`updated_at`) = 0;

-- Fix page_views table
UPDATE `page_views` 
SET `timestamp` = NULL 
WHERE `timestamp` = '0000-00-00 00:00:00' OR YEAR(`timestamp`) = 0;

-- Fix admins table
UPDATE `admins` 
SET `created_at` = NULL 
WHERE `created_at` = '0000-00-00 00:00:00' OR YEAR(`created_at`) = 0;

-- Verify the fixes
SELECT 'products' as table_name, COUNT(*) as invalid_dates
FROM products 
WHERE created_at = '0000-00-00 00:00:00' OR updated_at = '0000-00-00 00:00:00'
UNION ALL
SELECT 'portfolio', COUNT(*)
FROM portfolio 
WHERE created_at = '0000-00-00 00:00:00' OR updated_at = '0000-00-00 00:00:00'
UNION ALL
SELECT 'brochures', COUNT(*)
FROM brochures 
WHERE created_at = '0000-00-00 00:00:00' OR updated_at = '0000-00-00 00:00:00';

-- If all counts are 0, the fix was successful!

















