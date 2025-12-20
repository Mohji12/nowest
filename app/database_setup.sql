-- ============================================
-- Nowest Interior Database Setup Script
-- Complete SQL for all tables
-- ============================================

-- Make sure you're using the correct database
-- USE nowest_interior;

-- ============================================
-- DROP TABLES (if you need to recreate)
-- Run this first if you want to start fresh
-- ============================================
-- DROP TABLE IF EXISTS `page_views`;
-- DROP TABLE IF EXISTS `brochures`;
-- DROP TABLE IF EXISTS `seo_settings`;
-- DROP TABLE IF EXISTS `leads`;
-- DROP TABLE IF EXISTS `portfolio`;
-- DROP TABLE IF EXISTS `products`;
-- DROP TABLE IF EXISTS `admins`;

-- ============================================
-- CREATE TABLES
-- ============================================

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Products Table
CREATE TABLE IF NOT EXISTS `products` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `category` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(500) NULL,
    `features` JSON NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_category` (`category`),
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Portfolio Table
CREATE TABLE IF NOT EXISTS `portfolio` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(500) NULL,
    `client` VARCHAR(255) NULL,
    `location` VARCHAR(255) NULL,
    `category` VARCHAR(100) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Leads Table
CREATE TABLE IF NOT EXISTS `leads` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `project_details` TEXT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'new',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_email` (`email`),
    INDEX `idx_status` (`status`),
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. SEO Settings Table
CREATE TABLE IF NOT EXISTS `seo_settings` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `page` VARCHAR(50) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `og_title` VARCHAR(255) NULL,
    `og_description` TEXT NULL,
    `keywords` JSON NULL,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_page` (`page`),
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Page Views Table (Analytics)
CREATE TABLE IF NOT EXISTS `page_views` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `page` VARCHAR(255) NOT NULL,
    `user_agent` TEXT NULL,
    `referrer` VARCHAR(500) NULL,
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_page` (`page`),
    INDEX `idx_timestamp` (`timestamp`),
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Brochures Table
CREATE TABLE IF NOT EXISTS `brochures` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `pdf_path` VARCHAR(500) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VERIFY TABLES
-- ============================================
-- Run this to see all created tables:
-- SHOW TABLES;

-- ============================================
-- SAMPLE QUERIES
-- ============================================

-- View all products
-- SELECT * FROM products;

-- View all leads
-- SELECT * FROM leads ORDER BY created_at DESC;

-- View page views count by page
-- SELECT page, COUNT(*) as views FROM page_views GROUP BY page;

-- View all admins (without passwords)
-- SELECT id, username, created_at FROM admins;








