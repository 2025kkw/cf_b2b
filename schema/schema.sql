-- Database Schema for B2B Product Exhibition Website
-- This schema is designed for Cloudflare D1 (SQLite)

-- Enable foreign key support
PRAGMA foreign_keys = ON;

-- Categories table - New for professional category management
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  specifications TEXT,
  image_url TEXT,
  gallery_images TEXT, -- JSON array of image URLs
  category_id INTEGER, -- New: foreign key to categories
  category TEXT, -- Legacy: keep for backward compatibility
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  country TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- admin, super_admin
  is_active INTEGER DEFAULT 1,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);

-- Insert default admin accounts
-- Password hashes for "admin123" and "staff123" using SHA-256
-- admin123 hash: 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a
-- staff123 hash: 79a8416f2655f5265206056475c62a836b1164145955d44dd81340739d232567

INSERT OR IGNORE INTO admins (username, email, password_hash, role, is_active) 
VALUES 
('admin123', 'admin@example.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a', 'super_admin', 1),
('staff', 'staff@example.com', '79a8416f2655f5265206056475c62a836b1164145955d44dd81340739d232567', 'admin', 1);

-- Insert sample categories
INSERT OR IGNORE INTO categories (name, description, sort_order, is_active) VALUES
('Electronics', 'Electronic components and devices', 1, 1),
('Machinery', 'Industrial machinery and equipment', 2, 1),
('Materials', 'Raw materials and supplies', 3, 1),
('Tools', 'Professional tools and equipment', 4, 1),
('Packaging', 'Packaging materials and solutions', 5, 1);

-- Insert sample products
INSERT OR IGNORE INTO products (name, description, detailed_description, specifications, category, is_featured, is_active) VALUES
('Industrial CNC Machine', 'High-precision CNC machining center', 'Professional CNC machining center with 5-axis capability, perfect for precision manufacturing.', 'Capacity: 1000x600x500mm\nSpeed: 12000 RPM\nAccuracy: ±0.01mm', 'Machinery', 1, 1),
('Stainless Steel Sheet', 'Premium 304 stainless steel sheets', 'High-quality 304 stainless steel sheets in various thicknesses, ideal for industrial applications.', 'Material: 304 Stainless Steel\nThickness: 0.5mm-3mm\nSize: 1000x2000mm', 'Materials', 1, 1),
('PLC Controller', 'Programmable Logic Controller', 'Advanced PLC controller with Ethernet connectivity and modular I/O system.', 'Brand: Siemens\nModel: S7-1200\nPorts: Ethernet, RS485', 'Electronics', 0, 1),
('Hydraulic Press', '500-ton hydraulic press machine', 'Heavy-duty hydraulic press for metal forming and stamping operations.', 'Capacity: 500 tons\nTable Size: 1500x1000mm\nStroke: 500mm', 'Machinery', 0, 1),
('Precision Calipers', 'Digital precision measuring calipers', 'Professional digital calipers with 0.01mm accuracy and digital display.', 'Accuracy: 0.01mm\nRange: 0-150mm\nDisplay: LCD', 'Tools', 1, 1),
('Aluminum Profile', 'Extruded aluminum profiles', 'Custom extruded aluminum profiles for structural applications.', 'Alloy: 6063-T5\nFinish: Anodized\nLength: 6m', 'Materials', 0, 1);

-- Customers table - For customer management
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  phone TEXT,
  country TEXT,
  address TEXT,
  is_active INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table - For order management
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT NOT NULL UNIQUE,
  customer_id INTEGER,
  customer_name TEXT,
  customer_email TEXT,
  customer_company TEXT,
  total_amount REAL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Order Items table - For order line items
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  product_name TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price REAL DEFAULT 0,
  total_price REAL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Favorites table - For product wishlist/favorites
CREATE TABLE IF NOT EXISTS product_favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_email TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(customer_email, product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Product Views table - For product recommendations (track views)
CREATE TABLE IF NOT EXISTS product_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  view_count INTEGER DEFAULT 1,
  last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create additional indexes
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_is_active ON customers(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_product_favorites_customer_email ON product_favorites(customer_email);
CREATE INDEX IF NOT EXISTS idx_product_favorites_product_id ON product_favorites(product_id);
CREATE INDEX IF NOT EXISTS idx_product_views_product_id ON product_views(product_id);

-- Update products to use category_id (link by name)
UPDATE products 
SET category_id = (SELECT id FROM categories WHERE categories.name = products.category)
WHERE category_id IS NULL AND category IN (SELECT name FROM categories);

-- Insert sample customers
INSERT OR IGNORE INTO customers (name, email, company, phone, country, address, is_active) VALUES
('John Smith', 'john@example.com', 'Acme Corp', '+1-555-0100', 'USA', '123 Main St, New York', 1),
('Maria Garcia', 'maria@example.com', 'Global Tech', '+1-555-0101', 'Canada', '456 Oak Ave, Toronto', 1),
('David Chen', 'david@example.com', 'Asia Trading', '+86-10-12345678', 'China', '789 Beijing Rd, Beijing', 1);

-- Insert sample orders
INSERT OR IGNORE INTO orders (order_number, customer_id, customer_name, customer_email, customer_company, total_amount, currency, status, notes) VALUES
('ORD-2024-001', 1, 'John Smith', 'john@example.com', 'Acme Corp', 15000.00, 'USD', 'confirmed', 'First sample order'),
('ORD-2024-002', 2, 'Maria Garcia', 'maria@example.com', 'Global Tech', 8500.00, 'USD', 'processing', 'Priority shipping requested');

-- Insert sample order items
INSERT OR IGNORE INTO order_items (order_id, product_id, product_name, quantity, unit_price, total_price) VALUES
(1, 1, 'Industrial CNC Machine', 1, 12000.00, 12000.00),
(1, 5, 'Precision Calipers', 10, 300.00, 3000.00),
(2, 2, 'Stainless Steel Sheet', 100, 85.00, 8500.00);
