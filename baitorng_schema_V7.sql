-- ================================================================
-- BAITORNG — Smart Agriculture Marketplace
-- Database Schema — FINAL VERSION (V7)
-- CookStack Team · School of Above and Beyond · 2026
-- ================================================================
-- CHANGES FROM V6 → V7 (aligned with frontend profileData.js):
--
--   CHANGE 1: users — new profile columns added
--              + username       VARCHAR(80) UNIQUE   — display handle
--              + email          VARCHAR(150) UNIQUE  — contact email
--              + detailed_location TEXT             — specific address
--              + experience_years TINYINT UNSIGNED  — years in the field
--              (followers derived via COUNT on follows table — not stored)
--
--   CHANGE 2: products — aligned with Listing entity from frontend
--              + variety        VARCHAR(150)   — specific product description
--              + is_featured    BOOLEAN        — renamed from is_boosted
--              listing_type already modelled by table separation
--              (supply = products table, demand = demand_requests table)
--
--   CHANGE 3: demand_requests — aligned with Listing entity from frontend
--              + variety        VARCHAR(150)   — specific product description
--              + is_featured    BOOLEAN        — promoted demand posts
--
--   NEW 19: social_links — user social media profiles
--              userId FK → users, platform, url
--
--   NEW 20: user_phones — additional contact numbers per user
--              userId FK → users, phone_number
-- ================================================================
-- TABLES (20 total):
--   01. users                — all platform users incl. admins
--   02. admins               — admin profile (flat, no tiers)
--   03. admin_sessions       — secure admin login tokens
--   04. admin_logs           — simple audit trail
--   05. sessions             — regular user login tokens
--   06. categories           — hierarchical product categories
--   07. products             — supply listings (type = supply)
--   08. demand_requests      — buyer demand posts (type = demand)
--   09. matches              — Smart Merge System output
--   10. notifications        — dashboard alert log
--   11. follows              — user-to-user follow relationships
--   12. favorites            — saved products or demand posts
--   13. comments             — Q&A on listings & demands
--   14. product_views        — view tracking (sole source of truth)
--   15. listing_slot_requests — seller requests for more listing slots
--   16. reports              — user-submitted flags on bad content
--   17. provinces            — all 25 Cambodian provinces
--   18. province_adjacency   — proximity map for Smart Merge ranking
--   19. social_links         — NEW: user social media links
--   20. user_phones          — NEW: additional phone numbers per user
-- ================================================================

-- ----------------------------------------------------------------
-- 01. users
-- V7: Added username, email, detailed_location, experience_years
--     (followers count is derived — SELECT COUNT(*) FROM follows
--      WHERE following_id = ? — not stored as a column)
-- ----------------------------------------------------------------
CREATE TABLE users (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    phone               VARCHAR(20)   NOT NULL UNIQUE,   -- primary phone (login)
    password_hash       VARCHAR(255)  NOT NULL,
    name                VARCHAR(100)  NOT NULL,           -- fullName from frontend
    username            VARCHAR(80)   UNIQUE,             -- display handle e.g. @sokha_farm
    email               VARCHAR(150)  UNIQUE,             -- contact email
    role                ENUM('farmer','middleman','business_owner','admin')
                        NOT NULL DEFAULT 'farmer',
    province_id         INT           DEFAULT NULL,       -- nullable for admin accounts
    detailed_location   TEXT,                             -- specific address / farm location
    profile_photo       VARCHAR(255),                     -- profilePicture from frontend
    bio                 TEXT,
    experience_years    TINYINT UNSIGNED DEFAULT 0,       -- years of field experience
    is_verified         BOOLEAN       DEFAULT FALSE,
    is_active           BOOLEAN       DEFAULT TRUE,
    listing_limit       INT           DEFAULT 10,         -- soft cap; adjustable on request
    admin_notes         TEXT,                             -- internal notes by admins only
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
                        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------
-- 02. admins
-- Extended profile for users with role = 'admin'
-- Every row here must have a matching user in users table
-- V6: Flat single-level admin — no tiers, no permission flags
-- ----------------------------------------------------------------
CREATE TABLE admins (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL UNIQUE,    -- 1-to-1 with users
    last_active_at  TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- 03. admin_sessions
-- Separate, stricter session table for admin logins
-- Recommended expiry: 2–4 hours
-- ----------------------------------------------------------------
CREATE TABLE admin_sessions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    admin_id    INT          NOT NULL,
    token       VARCHAR(512) NOT NULL UNIQUE,
    ip_address  VARCHAR(45)  NOT NULL,              -- required for admins
    device_info VARCHAR(255),
    expires_at  TIMESTAMP    NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- 04. admin_logs
-- Simple audit log — who did what to which record and when
-- V6: Removed details JSON and ip_address — kept lean and readable
-- Never UPDATE or DELETE rows here
-- ----------------------------------------------------------------
CREATE TABLE admin_logs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    admin_id    INT          NOT NULL,
    action      VARCHAR(100) NOT NULL,  -- e.g. 'deactivate_user', 'approve_slot'
    target_type VARCHAR(50),            -- 'user' | 'product' | 'report' | 'slot'
    target_id   INT,                    -- ID of the affected record
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- 05. sessions
-- Regular user login tokens (mobile browser persistence)
-- ----------------------------------------------------------------
CREATE TABLE sessions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT          NOT NULL,
    token       VARCHAR(512) NOT NULL UNIQUE,
    device_info VARCHAR(255),
    ip_address  VARCHAR(45),
    expires_at  TIMESTAMP    NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------
-- 06. categories
-- Hierarchical: top-level (crop, fruit, veg) → subcategories
-- Replaces the old ENUM for more precise Smart Merge matching
-- ----------------------------------------------------------------
CREATE TABLE categories (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    parent_id   INT          DEFAULT NULL,          -- NULL = top-level
    name_en     VARCHAR(100) NOT NULL,
    name_km     VARCHAR(100),                       -- Khmer label for UI
    slug        VARCHAR(100) NOT NULL UNIQUE,       -- URL-safe key
    icon        VARCHAR(50),                        -- emoji or icon class
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------
-- 07. products
-- Supply listings posted by farmers or middlemen
-- listing_type is implicitly 'supply' — this table = supply side
--
-- V7 CHANGES (aligned with Listing entity from frontend):
--   + variety      VARCHAR(150) — specific product description
--                  e.g. "Jasmine Rice Grade A", "Cherry Tomato"
--   + is_featured  BOOLEAN      — renamed from is_boosted for clarity
--
-- V5 CHANGES (retained):
--   - province VARCHAR(100) → province_id INT FK → provinces(id)
--   - view_count removed; use product_views as sole source
-- ----------------------------------------------------------------
CREATE TABLE products (
    id              INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    seller_id       INT            NOT NULL,
    category_id     INT            NOT NULL,
    name            VARCHAR(150)   NOT NULL,           -- product name (e.g. "Rice")
    variety         VARCHAR(150),                      -- specific variety/description
    price_per_unit  DECIMAL(10,2)  NOT NULL,
    unit            VARCHAR(30)    NOT NULL,            -- kg / ton / bag / comb / ...
    quantity        DECIMAL(10,2)  NOT NULL,            -- quantityAvailable
    province_id     INT            NOT NULL,            -- FK → provinces(id)
    description     TEXT,
    harvest_date    DATE,                               -- freshness indicator
    photo_url       VARCHAR(255),                       -- image from frontend
    is_active       BOOLEAN        DEFAULT TRUE,
    is_featured     BOOLEAN        DEFAULT FALSE,       -- featured / promoted listing
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,  -- postedTime
    updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (seller_id)   REFERENCES users(id)       ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);

-- ----------------------------------------------------------------
-- 08. demand_requests
-- Buyer demand posts — both sides of the marketplace
-- listing_type is implicitly 'demand' — this table = demand side
--
-- V7 CHANGES (aligned with Listing entity from frontend):
--   + variety      VARCHAR(150) — specific product description
--   + is_featured  BOOLEAN      — promoted demand posts
--
-- V5 CHANGES (retained):
--   - province VARCHAR(100) → province_id INT FK → provinces(id)
-- ----------------------------------------------------------------
CREATE TABLE demand_requests (
    id              INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    buyer_id        INT            NOT NULL,
    category_id     INT            NOT NULL,
    product_name    VARCHAR(150)   NOT NULL,           -- name of product needed
    variety         VARCHAR(150),                      -- specific variety/description
    quantity_needed DECIMAL(10,2)  NOT NULL,            -- quantityAvailable (needed)
    unit            VARCHAR(30)    NOT NULL,
    max_price       DECIMAL(10,2),                     -- optional budget ceiling
    province_id     INT            NOT NULL,            -- FK → provinces(id)
    description     TEXT,
    deadline        DATE,                               -- when buyer needs it by
    photo_url       VARCHAR(255),                       -- optional reference image
    is_active       BOOLEAN        DEFAULT TRUE,
    is_featured     BOOLEAN        DEFAULT FALSE,       -- promoted demand post
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,  -- postedTime
    updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
                    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (buyer_id)    REFERENCES users(id)       ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);

-- ----------------------------------------------------------------
-- 09. matches
-- Generated by the Smart Merge System
-- Links a product listing to a matching demand request
-- ----------------------------------------------------------------
CREATE TABLE matches (
    id               INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id       INT  NOT NULL,
    demand_id        INT  NOT NULL,
    match_score      INT  DEFAULT 0,                -- higher = better match
    province_match   ENUM('same','nearby','different') NOT NULL,
    status           ENUM('pending','contacted','completed','expired')
                     DEFAULT 'pending',
    seller_notified  BOOLEAN DEFAULT FALSE,
    buyer_notified   BOOLEAN DEFAULT FALSE,
    seller_dismissed BOOLEAN DEFAULT FALSE,         -- popup dismissed tracker
    buyer_dismissed  BOOLEAN DEFAULT FALSE,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                     ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id)         ON DELETE CASCADE,
    FOREIGN KEY (demand_id)  REFERENCES demand_requests(id)  ON DELETE CASCADE,
    UNIQUE KEY unique_match (product_id, demand_id)
);

-- ----------------------------------------------------------------
-- 10. notifications
-- Persistent alert log shown in each user's dashboard
-- ----------------------------------------------------------------
CREATE TABLE notifications (
    id         INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id    INT  NOT NULL,
    match_id   INT,
    type       ENUM('new_match','demand_near_you','product_near_you','system')
               NOT NULL,
    message    TEXT      NOT NULL,
    is_read    BOOLEAN   DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)  REFERENCES users(id)   ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------
-- 11. follows
-- User-to-user follow (follow a trusted seller/farmer)
-- Different from favorites — this is about a person, not a listing
-- ----------------------------------------------------------------
CREATE TABLE follows (
    id           INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    follower_id  INT  NOT NULL,
    following_id INT  NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (follower_id)  REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_follow (follower_id, following_id)
);

-- ----------------------------------------------------------------
-- 12. favorites
-- Save a specific product listing or demand post for later
-- Different from follows — this targets a listing, not a person
-- ----------------------------------------------------------------
CREATE TABLE favorites (
    id          INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id     INT  NOT NULL,
    target_type ENUM('product','demand') NOT NULL,
    target_id   INT  NOT NULL,                      -- ID of the saved listing/demand
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, target_type, target_id)
);

-- ----------------------------------------------------------------
-- 13. comments
-- Non-real-time Q&A on product listings or demand posts
-- A comment belongs to EITHER a product OR a demand, never both
-- ----------------------------------------------------------------
CREATE TABLE comments (
    id         INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id  INT  NOT NULL,
    product_id INT,
    demand_id  INT,
    content    TEXT      NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (author_id)  REFERENCES users(id)            ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)         ON DELETE CASCADE,
    FOREIGN KEY (demand_id)  REFERENCES demand_requests(id)  ON DELETE CASCADE,
    CHECK (
        (product_id IS NOT NULL AND demand_id IS NULL) OR
        (product_id IS NULL     AND demand_id IS NOT NULL)
    )
);

-- ----------------------------------------------------------------
-- 14. product_views
-- Individual view events per listing
-- SOLE source of truth for view counts (view_count column removed from products)
-- To get count: SELECT COUNT(*) FROM product_views WHERE product_id = ?
-- Powers analytics & future boosted listing monetization
-- ----------------------------------------------------------------
CREATE TABLE product_views (
    id         INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT  NOT NULL,
    viewer_id  INT,                                 -- NULL = anonymous visitor
    ip_address VARCHAR(45),
    viewed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (viewer_id)  REFERENCES users(id)    ON DELETE SET NULL
);

-- ----------------------------------------------------------------
-- 15. listing_slot_requests
-- Sellers request more than their default 10-listing cap
-- Admin reviews and approves or rejects each request
-- ----------------------------------------------------------------
CREATE TABLE listing_slot_requests (
    id              INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         INT  NOT NULL,
    requested_limit INT  NOT NULL,                  -- e.g. 20, 30, 50
    reason          TEXT,                           -- seller's explanation
    status          ENUM('pending','approved','rejected') DEFAULT 'pending',
    reviewed_by     INT,                            -- admin user_id
    reviewed_at     TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ----------------------------------------------------------------
-- 16. reports
-- Users flag suspicious listings, demands, or other users
-- Admin reviews and takes action
--
-- V5 CHANGES:
--   - Added UNIQUE KEY unique_report (reporter_id, target_type, target_id)
--     Prevents a user from filing duplicate reports on the same target
-- ----------------------------------------------------------------
CREATE TABLE reports (
    id          INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reporter_id INT  NOT NULL,
    target_type ENUM('product','demand','user') NOT NULL,
    target_id   INT  NOT NULL,
    reason      ENUM('fake_listing','wrong_price','spam',
                     'inappropriate','scam','other') NOT NULL,
    description TEXT,
    status      ENUM('open','reviewed','resolved','dismissed')
                DEFAULT 'open',
    reviewed_by INT,
    reviewed_at TIMESTAMP,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_report (reporter_id, target_type, target_id)
);

-- ----------------------------------------------------------------
-- 17. provinces
-- All 25 Cambodian provinces with Khmer names
-- ----------------------------------------------------------------
CREATE TABLE provinces (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name_en  VARCHAR(100) NOT NULL UNIQUE,
    name_km  VARCHAR(100),
    region   VARCHAR(50)  -- Central | South | Mekong | Northwest | Northeast | North
);

-- ----------------------------------------------------------------
-- 18. province_adjacency
-- Proximity map used by Smart Merge to rank "nearby" matches
-- distance_score: 3 = very close, 2 = moderate, 1 = far
-- ----------------------------------------------------------------
CREATE TABLE province_adjacency (
    province_id    INT     NOT NULL,
    adjacent_id    INT     NOT NULL,
    distance_score TINYINT DEFAULT 3,
    PRIMARY KEY (province_id, adjacent_id),
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (adjacent_id) REFERENCES provinces(id)
);

-- ----------------------------------------------------------------
-- 19. social_links                                          [NEW V7]
-- User social media profiles (Facebook, Telegram, etc.)
-- One user can have multiple social links on different platforms
-- ----------------------------------------------------------------
CREATE TABLE social_links (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT          NOT NULL,
    platform    VARCHAR(50)  NOT NULL,    -- 'Facebook' | 'Telegram' | 'TikTok' | ...
    url         VARCHAR(500) NOT NULL,    -- direct link to social profile
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_social (user_id, platform)  -- one link per platform per user
);

-- ----------------------------------------------------------------
-- 20. user_phones                                           [NEW V7]
-- Additional phone numbers per user
-- The primary phone is stored in users.phone (used for login)
-- This table holds secondary / additional contact numbers only
-- ----------------------------------------------------------------
CREATE TABLE user_phones (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT         NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    label        VARCHAR(50),             -- optional: 'WhatsApp' | 'work' | 'family' ...
    created_at   TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_phone (user_id, phone_number)
);

-- ================================================================
-- INDEXES
-- ================================================================

-- users (V7: added username and email indexes)
CREATE INDEX idx_users_role         ON users(role);
CREATE INDEX idx_users_active       ON users(is_active);
CREATE INDEX idx_users_province     ON users(province_id);
CREATE INDEX idx_users_username     ON users(username);

-- categories (V5: added parent_id index)
CREATE INDEX idx_cat_parent         ON categories(parent_id);

-- products (V7: is_featured replaces is_boosted)
CREATE INDEX idx_products_seller    ON products(seller_id);
CREATE INDEX idx_products_category  ON products(category_id);
CREATE INDEX idx_products_province  ON products(province_id);
CREATE INDEX idx_products_active    ON products(is_active);
CREATE INDEX idx_products_harvest   ON products(harvest_date);
CREATE INDEX idx_products_featured  ON products(is_featured);

-- demand_requests (V7: added is_featured index)
CREATE INDEX idx_demand_buyer       ON demand_requests(buyer_id);
CREATE INDEX idx_demand_category    ON demand_requests(category_id);
CREATE INDEX idx_demand_province    ON demand_requests(province_id);
CREATE INDEX idx_demand_active      ON demand_requests(is_active);
CREATE INDEX idx_demand_deadline    ON demand_requests(deadline);
CREATE INDEX idx_demand_featured    ON demand_requests(is_featured);

-- matches
CREATE INDEX idx_matches_product    ON matches(product_id);
CREATE INDEX idx_matches_demand     ON matches(demand_id);
CREATE INDEX idx_matches_status     ON matches(status);

-- notifications
CREATE INDEX idx_notif_user         ON notifications(user_id, is_read);

-- follows & favorites
CREATE INDEX idx_follows_follower   ON follows(follower_id);
CREATE INDEX idx_favorites_user     ON favorites(user_id);
CREATE INDEX idx_favorites_target   ON favorites(target_type, target_id);

-- comments
CREATE INDEX idx_comments_product   ON comments(product_id);
CREATE INDEX idx_comments_demand    ON comments(demand_id);

-- sessions
CREATE INDEX idx_sessions_token     ON sessions(token);
CREATE INDEX idx_sessions_user      ON sessions(user_id);

-- admin
CREATE INDEX idx_admin_sessions_tok ON admin_sessions(token);
CREATE INDEX idx_admin_logs_admin   ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_target  ON admin_logs(target_type, target_id);
CREATE INDEX idx_admin_logs_date    ON admin_logs(created_at);

-- reports & slots
CREATE INDEX idx_reports_status     ON reports(status);
CREATE INDEX idx_slots_status       ON listing_slot_requests(status);

-- product views
CREATE INDEX idx_views_product      ON product_views(product_id);

-- province adjacency
CREATE INDEX idx_adj_province       ON province_adjacency(province_id);

-- social_links (V7: new)
CREATE INDEX idx_social_user        ON social_links(user_id);

-- user_phones (V7: new)
CREATE INDEX idx_phones_user        ON user_phones(user_id);

-- ================================================================
-- SEED DATA — Cambodian Provinces
-- ================================================================
INSERT INTO provinces (name_en, name_km, region) VALUES
('Phnom Penh',       'ភ្នំពេញ',          'Central'),
('Kandal',           'កណ្តាល',           'Central'),
('Kampong Speu',     'កំពង់ស្ពឺ',       'Central'),
('Kampong Thom',     'កំពង់ធំ',         'Central'),
('Kampong Chhnang',  'កំពង់ឆ្នាំង',     'Central'),
('Takeo',            'តាកែវ',            'South'),
('Kampot',           'កំពត',             'South'),
('Kep',              'កែប',              'South'),
('Sihanoukville',    'ព្រះសីហនុ',       'South'),
('Koh Kong',         'កោះកុង',           'South'),
('Kampong Cham',     'កំពង់ចាម',        'Mekong'),
('Prey Veng',        'ព្រៃវែង',          'Mekong'),
('Svay Rieng',       'ស្វាយរៀង',         'Mekong'),
('Tbong Khmum',      'ត្បូងឃ្មុំ',       'Mekong'),
('Kratie',           'ក្រចេះ',           'Mekong'),
('Stung Treng',      'ស្ទឹងត្រែង',      'Mekong'),
('Ratanakiri',       'រតនគិរី',          'Northeast'),
('Mondulkiri',       'មណ្ឌលគិរី',       'Northeast'),
('Siem Reap',        'សៀមរាប',           'Northwest'),
('Battambang',       'បាត់ដំបង',         'Northwest'),
('Banteay Meanchey', 'បន្ទាយមានជ័យ',    'Northwest'),
('Pursat',           'ពោធិ៍សាត់',        'Northwest'),
('Pailin',           'ប៉ៃលិន',           'Northwest'),
('Preah Vihear',     'ព្រះវិហារ',        'North'),
('Oddar Meanchey',   'អូរដ្ឋមានជ័យ',    'North');

-- ================================================================
-- SEED DATA — Product Categories
-- ================================================================
INSERT INTO categories (parent_id, name_en, name_km, slug, icon) VALUES
-- Top level
(NULL, 'Crop',          'ដំណាំ',        'crop',          '🌾'),
(NULL, 'Fruit',         'ផ្លែឈើ',       'fruit',         '🍎'),
(NULL, 'Vegetable',     'បន្លែ',         'vegetable',     '🥦'),
(NULL, 'Other',         'ផ្សេងៗ',       'other',         '📦'),
-- Crop subcategories
(1, 'Rice',             'អង្ករ',         'rice',          '🍚'),
(1, 'Jasmine Rice',     'អង្ករម្លិះ',    'jasmine-rice',  '🍚'),
(1, 'Corn',             'ពោត',           'corn',          '🌽'),
(1, 'Cassava',          'ដំឡូងមី',      'cassava',       '🥔'),
(1, 'Sugarcane',        'អំពៅ',          'sugarcane',     '🎋'),
-- Fruit subcategories
(2, 'Mango',            'មាន់ហ៊ូ',       'mango',         '🥭'),
(2, 'Banana',           'ចេក',           'banana',        '🍌'),
(2, 'Watermelon',       'ត្របែក',        'watermelon',    '🍉'),
(2, 'Durian',           'ទុរេន',         'durian',        '🍈'),
(2, 'Longan',           'មៀន',           'longan',        '🍇'),
(2, 'Jackfruit',        'ខ្នុរ',         'jackfruit',     '🍈'),
-- Vegetable subcategories
(3, 'Tomato',           'ប៉េងប៉ោះ',     'tomato',        '🍅'),
(3, 'Chilli',           'ម្ទេស',         'chilli',        '🌶️'),
(3, 'Cucumber',         'ត្រសក់',        'cucumber',      '🥒'),
(3, 'Morning Glory',    'ត្រពាំងរាំ',   'morning-glory', '🌿'),
(3, 'Eggplant',         'វែង',           'eggplant',      '🍆'),
(3, 'Cabbage',          'ស្ពៃក្តោប',    'cabbage',       '🥬');

-- ================================================================
-- SEED DATA — Default Admin
-- IMPORTANT: Replace password_hash with a real bcrypt hash
--            before deploying to production!
-- ================================================================
INSERT INTO users (phone, password_hash, name, role, is_verified, is_active)
VALUES ('+85500000000', '$2b$10$REPLACE_WITH_REAL_BCRYPT_HASH', 'Admin', 'admin', TRUE, TRUE);

INSERT INTO admins (user_id)
VALUES (LAST_INSERT_ID());

-- ================================================================
-- END OF SCHEMA — BAITORNG V7 FINAL
-- 20 tables | Aligned with frontend profileData.js & Home.jsx
-- ================================================================
