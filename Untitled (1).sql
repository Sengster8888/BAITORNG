CREATE TABLE `provinces` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name_en` VARCHAR(100) UNIQUE NOT NULL,
  `name_km` VARCHAR(100),
  `region` VARCHAR(50)
);

CREATE TABLE `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `phone` VARCHAR(20) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255),
  `google_id` VARCHAR(255) UNIQUE,
  `facebook_id` VARCHAR(255) UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(80) UNIQUE,
  `email` VARCHAR(150) UNIQUE,
  `email_verified_at` TIMESTAMP,
  `role` ENUM ('farmer', 'middleman', 'buyer', 'admin') NOT NULL,
  `province_id` INT,
  `detailed_location` TEXT,
  `profile_photo` VARCHAR(255),
  `experience` ENUM ('lessThan1', '1to3', '3to5', '5to10', 'over10'),
  `is_active` BOOLEAN DEFAULT true,
  `is_verified` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `admins` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT UNIQUE NOT NULL,
  `last_active_at` TIMESTAMP,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `admin_sessions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `admin_id` INT NOT NULL,
  `token` VARCHAR(512) UNIQUE NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL
);

CREATE TABLE `admin_logs` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `admin_id` INT NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `target_type` VARCHAR(50),
  `target_id` INT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `sessions` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `token` VARCHAR(512) UNIQUE NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `categories` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `name_en` VARCHAR(100) NOT NULL,
  `name_km` VARCHAR(100),
  `slug` VARCHAR(100) UNIQUE NOT NULL,
  `icon` VARCHAR(50)
);

CREATE TABLE `sub_categories` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `name_km` VARCHAR(100),
  `slug` VARCHAR(100) UNIQUE NOT NULL,
  `icon` VARCHAR(50)
);

CREATE TABLE `products` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `seller_id` INT NOT NULL,
  `sub_category_id` INT NOT NULL,
  `variety` VARCHAR(150) NOT NULL,
  `price_per_unit` DECIMAL(10,2) NOT NULL,
  `unit` VARCHAR(30) NOT NULL DEFAULT 'kg',
  `quantity` DECIMAL(10,2) NOT NULL,
  `province_id` INT NOT NULL,
  `description` TEXT,
  `is_active` BOOLEAN DEFAULT true,
  `is_featured` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `product_images` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `sort_order` TINYINT DEFAULT 0
);

CREATE TABLE `demand_requests` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `buyer_id` INT NOT NULL,
  `sub_category_id` INT NOT NULL,
  `variety` VARCHAR(150) NOT NULL,
  `target_price` DECIMAL(10,2),
  `unit` VARCHAR(30) NOT NULL DEFAULT 'kg',
  `quantity_needed` DECIMAL(10,2) NOT NULL,
  `province_id` INT NOT NULL,
  `description` TEXT,
  `is_active` BOOLEAN DEFAULT true,
  `is_featured` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `matches` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `demand_id` INT NOT NULL,
  `match_score` INT DEFAULT 0,
  `province_match` ENUM ('same', 'nearby', 'different') NOT NULL,
  `status` ENUM ('pending', 'contacted', 'completed', 'expired') DEFAULT 'pending',
  `seller_notified` BOOLEAN DEFAULT false,
  `buyer_notified` BOOLEAN DEFAULT false,
  `seller_dismissed` BOOLEAN DEFAULT false,
  `buyer_dismissed` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `notifications` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `match_id` INT,
  `type` ENUM ('new_match', 'demand_near_you', 'product_near_you', 'system') NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT false,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `follows` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `follower_id` INT NOT NULL,
  `following_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `saved_posts` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `target_type` ENUM ('product', 'demand') NOT NULL,
  `target_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `comments` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `author_id` INT NOT NULL,
  `product_id` INT,
  `demand_id` INT,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `product_views` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `viewer_id` INT,
  `ip_address` VARCHAR(45),
  `viewed_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `listing_slot_requests` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `requested_limit` INT NOT NULL,
  `status` ENUM ('pending', 'approved', 'rejected') DEFAULT 'pending',
  `reviewed_by` INT,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `reports` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `reporter_id` INT NOT NULL,
  `target_type` ENUM ('product', 'demand', 'user') NOT NULL,
  `target_id` INT NOT NULL,
  `reason` VARCHAR(255) NOT NULL,
  `status` ENUM ('open', 'reviewed', 'resolved') DEFAULT 'open',
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `social_links` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `platform` VARCHAR(50) NOT NULL,
  `url` VARCHAR(500) NOT NULL
);

CREATE TABLE `user_phones` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  `label` VARCHAR(50)
);

CREATE TABLE `province_adjacency` (
  `province_id` INT NOT NULL,
  `adjacent_id` INT NOT NULL,
  `distance_score` TINYINT DEFAULT 3,
  PRIMARY KEY (`province_id`, `adjacent_id`)
);

CREATE TABLE `legal_documents` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM ('terms_conditions', 'privacy_policy') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `version` VARCHAR(20) NOT NULL,
  `is_active` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `user_legal_acceptances` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `legal_document_id` INT NOT NULL,
  `accepted_at` TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE UNIQUE INDEX `unique_match` ON `matches` (`product_id`, `demand_id`);

CREATE UNIQUE INDEX `follows_index_1` ON `follows` (`follower_id`, `following_id`);

CREATE UNIQUE INDEX `unique_user_legal_acceptance` ON `user_legal_acceptances` (`user_id`, `legal_document_id`);

ALTER TABLE `users` ADD FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE SET NULL;

ALTER TABLE `admins` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `admin_sessions` ADD FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

ALTER TABLE `admin_logs` ADD FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

ALTER TABLE `sessions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `sub_categories` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

ALTER TABLE `products` ADD FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `products` ADD FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `demand_requests` ADD FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `demand_requests` ADD FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`);

ALTER TABLE `demand_requests` ADD FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

ALTER TABLE `matches` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `matches` ADD FOREIGN KEY (`demand_id`) REFERENCES `demand_requests` (`id`) ON DELETE CASCADE;

ALTER TABLE `notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `notifications` ADD FOREIGN KEY (`match_id`) REFERENCES `matches` (`id`) ON DELETE SET NULL;

ALTER TABLE `follows` ADD FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `follows` ADD FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `saved_posts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`demand_id`) REFERENCES `demand_requests` (`id`) ON DELETE CASCADE;

ALTER TABLE `product_views` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `product_views` ADD FOREIGN KEY (`viewer_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

ALTER TABLE `listing_slot_requests` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `listing_slot_requests` ADD FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

ALTER TABLE `reports` ADD FOREIGN KEY (`reporter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `social_links` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `user_phones` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `province_adjacency` ADD FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

ALTER TABLE `province_adjacency` ADD FOREIGN KEY (`adjacent_id`) REFERENCES `provinces` (`id`);

ALTER TABLE `user_legal_acceptances` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `user_legal_acceptances` ADD FOREIGN KEY (`legal_document_id`) REFERENCES `legal_documents` (`id`) ON DELETE CASCADE;

ALTER TABLE `provinces` ADD FOREIGN KEY (`name_km`) REFERENCES `provinces` (`region`);

-- Disable foreign key checks for INSERT
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `provinces` (`name_en`, `name_km`, `region`)
VALUES
  ('Phnom Penh', 'ភ្នំពេញ', 'Central'),
  ('Kandal', 'កណ្តាល', 'Central');
INSERT INTO `categories` (`id`, `name_en`, `name_km`, `slug`)
VALUES
  (1, 'Crop', 'ដំណាំ', 'crop'),
  (2, 'Fruit', 'ផ្លែឈើ', 'fruit');
INSERT INTO `sub_categories` (`category_id`, `name_en`, `name_km`, `slug`)
VALUES
  (1, 'Rice', 'អង្ករ', 'rice'),
  (2, 'Mango', 'ស្វាយ', 'mango');

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;