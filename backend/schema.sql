-- Sector-17 Store Database Schema
-- MySQL 8.0
-- Created: 2025

-- Drop database if exists (use with caution)
-- DROP DATABASE IF EXISTS sector17_store;

-- Create database
CREATE DATABASE IF NOT EXISTS sector17_store
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

USE sector17_store;

-- ============================================
-- Table: categories
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: users (Admin users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: shops
-- ============================================
CREATE TABLE IF NOT EXISTS shops (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    address VARCHAR(500) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    image_url VARCHAR(1000),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_shop_name (name),
    INDEX idx_shop_category (category),
    FULLTEXT idx_shop_search (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: products
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shop_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(1000),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    CONSTRAINT fk_product_shop
        FOREIGN KEY (shop_id) 
        REFERENCES shops(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    -- Indexes for performance
    INDEX idx_product_shop (shop_id),
    INDEX idx_product_category (category),
    INDEX idx_product_price (price),
    FULLTEXT idx_product_search (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert default categories
-- ============================================
INSERT INTO categories (name) VALUES
('Clothing'),
('Electronics'),
('Food'),
('Books'),
('Footwear'),
('Accessories'),
('Home Decor')
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- Insert default admin user
-- Password: admin123 (hashed with bcrypt)
-- ============================================
INSERT INTO users (email, password_hash, full_name) VALUES
('admin@sector17.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5oo5h8OJgUpQu', 'Admin User')
ON DUPLICATE KEY UPDATE email=email;

-- ============================================
-- Insert sample shops
-- ============================================
INSERT INTO shops (name, category, description, address, contact, image_url) VALUES
('Gupta Garments', 'Clothing', 'Premium ethnic and western wear for all occasions. Family-owned business since 1985.', 'Shop 15, Sector-17, Chandigarh', '+91-9876543210', 'https://images.unsplash.com/photo-1571854003494-ab1b14c21249?w=800'),
('Tech Galaxy', 'Electronics', 'Latest gadgets, smartphones, and electronics at competitive prices.', 'Shop 22, Sector-17, Chandigarh', '+91-9876543211', 'https://images.unsplash.com/photo-1660224319984-4af12c1a469b?w=800'),
('Sharma Sweets', 'Food', 'Traditional Indian sweets and snacks. Famous for our ladoos and barfis.', 'Shop 8, Sector-17, Chandigarh', '+91-9876543212', 'https://images.unsplash.com/photo-1640720707320-af5502f2a3f5?w=800'),
('Book Haven', 'Books', 'Vast collection of fiction, non-fiction, and academic books.', 'Shop 31, Sector-17, Chandigarh', '+91-9876543213', 'https://images.unsplash.com/photo-1740064038378-b3b049c98c39?w=800'),
('Footwear Palace', 'Footwear', 'Branded shoes, sandals, and sports footwear for men, women, and kids.', 'Shop 19, Sector-17, Chandigarh', '+91-9876543214', 'https://images.unsplash.com/photo-1571854003494-ab1b14c21249?w=800'),
('Style Studio', 'Accessories', 'Trendy accessories including bags, watches, jewelry, and sunglasses.', 'Shop 27, Sector-17, Chandigarh', '+91-9876543215', 'https://images.unsplash.com/photo-1660224319984-4af12c1a469b?w=800')
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- Insert sample products
-- ============================================
INSERT INTO products (shop_id, name, description, price, category, image_url) VALUES
-- Gupta Garments (shop_id: 1)
(1, 'Cotton Kurta Set', 'Comfortable cotton kurta with matching pajama. Perfect for summer.', 1499.00, 'Clothing', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500'),
(1, 'Silk Saree', 'Elegant silk saree with traditional border work.', 3999.00, 'Clothing', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500'),
(1, 'Formal Shirt', 'Premium quality formal shirt for office wear.', 1199.00, 'Clothing', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500'),

-- Tech Galaxy (shop_id: 2)
(2, 'Wireless Earbuds', 'Premium sound quality with active noise cancellation.', 2999.00, 'Electronics', 'https://images.unsplash.com/photo-1590658165737-15a047b7a0b8?w=500'),
(2, 'Smartphone', 'Latest model with 128GB storage and 48MP camera.', 24999.00, 'Electronics', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'),
(2, 'Bluetooth Speaker', 'Portable wireless speaker with 12-hour battery life.', 1899.00, 'Electronics', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'),

-- Sharma Sweets (shop_id: 3)
(3, 'Kaju Katli (500g)', 'Premium cashew sweets made with pure ghee.', 450.00, 'Food', 'https://images.unsplash.com/photo-1640720707320-af5502f2a3f5?w=500'),
(3, 'Gulab Jamun Box', 'Soft and delicious gulab jamuns, pack of 12.', 180.00, 'Food', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500'),
(3, 'Samosa (6 pcs)', 'Crispy samosas filled with spiced potatoes.', 60.00, 'Food', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500'),

-- Book Haven (shop_id: 4)
(4, 'The Great Gatsby', 'Classic novel by F. Scott Fitzgerald.', 299.00, 'Books', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'),
(4, 'Atomic Habits', 'Bestselling self-help book by James Clear.', 450.00, 'Books', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500'),

-- Footwear Palace (shop_id: 5)
(5, 'Running Shoes', 'Lightweight sports shoes with excellent grip.', 2499.00, 'Footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'),
(5, 'Casual Sneakers', 'Trendy sneakers for everyday wear.', 1799.00, 'Footwear', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'),

-- Style Studio (shop_id: 6)
(6, 'Leather Wallet', 'Genuine leather wallet with multiple card slots.', 899.00, 'Accessories', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500'),
(6, 'Designer Sunglasses', 'UV protection sunglasses with polarized lenses.', 1299.00, 'Accessories', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500')
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- Verify data
-- ============================================
SELECT 'Database setup complete!' as Status;
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_users FROM users;
SELECT COUNT(*) as total_shops FROM shops;
SELECT COUNT(*) as total_products FROM products;

-- ============================================
-- Useful queries for testing
-- ============================================

-- View all shops with product count
-- SELECT s.id, s.name, s.category, COUNT(p.id) as product_count
-- FROM shops s
-- LEFT JOIN products p ON s.id = p.shop_id
-- GROUP BY s.id
-- ORDER BY s.name;

-- Search products (example)
-- SELECT p.*, s.name as shop_name
-- FROM products p
-- JOIN shops s ON p.shop_id = s.id
-- WHERE MATCH(p.name, p.description) AGAINST('shoes' IN NATURAL LANGUAGE MODE)
-- OR p.category = 'Footwear';

-- Get shop with all products
-- SELECT s.*, p.id as product_id, p.name as product_name, p.price
-- FROM shops s
-- LEFT JOIN products p ON s.id = p.shop_id
-- WHERE s.id = 1;
