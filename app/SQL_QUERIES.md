# SQL Queries for Nowest Interior Database

## All CREATE TABLE Statements

### 1. Admins Table
```sql
CREATE TABLE IF NOT EXISTS `admins` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Products Table
```sql
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
```

### 3. Portfolio Table
```sql
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
```

### 4. Leads Table
```sql
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
```

### 5. SEO Settings Table
```sql
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
```

### 6. Page Views Table (Analytics)
```sql
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
```

### 7. Brochures Table
```sql
CREATE TABLE IF NOT EXISTS `brochures` (
    `id` CHAR(36) NOT NULL PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `pdf_path` VARCHAR(500) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## Quick Reference

### Table List
1. `admins` - Admin users for authentication
2. `products` - Product catalog (blinds, curtains, commercial)
3. `portfolio` - Portfolio projects showcase
4. `leads` - Customer inquiries and leads
5. `seo_settings` - SEO metadata for pages
6. `page_views` - Analytics tracking
7. `brochures` - Downloadable PDF brochures

### Common Queries

#### View All Tables
```sql
SHOW TABLES;
```

#### View Table Structure
```sql
DESCRIBE table_name;
-- or
SHOW CREATE TABLE table_name;
```

#### Count Records
```sql
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM leads;
SELECT COUNT(*) FROM portfolio;
```

#### View Recent Leads
```sql
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;
```

#### View Products by Category
```sql
SELECT * FROM products WHERE category = 'blinds';
SELECT * FROM products WHERE category = 'curtains';
SELECT * FROM products WHERE category = 'commercial';
```

#### View Page Views Statistics
```sql
SELECT page, COUNT(*) as views 
FROM page_views 
GROUP BY page 
ORDER BY views DESC;
```

---

## Drop All Tables (Use with Caution!)

```sql
DROP TABLE IF EXISTS `page_views`;
DROP TABLE IF EXISTS `brochures`;
DROP TABLE IF EXISTS `seo_settings`;
DROP TABLE IF EXISTS `leads`;
DROP TABLE IF EXISTS `portfolio`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `admins`;
```

---

## How to Use

1. **Connect to your MySQL database:**
   ```bash
   mysql -h menteetracker.cfiuwyek2vbk.ap-south-1.rds.amazonaws.com -u admin -p
   ```

2. **Select the database:**
   ```sql
   USE nowest_interior;
   ```

3. **Run the SQL file:**
   ```bash
   mysql -h menteetracker.cfiuwyek2vbk.ap-south-1.rds.amazonaws.com -u admin -p nowest_interior < database_setup.sql
   ```

   Or copy and paste the CREATE TABLE statements into your MySQL client.








