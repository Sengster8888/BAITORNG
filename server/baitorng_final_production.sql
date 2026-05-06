[ignoring loop detection]
-- ================================================================
-- BAITORNG — Smart Agriculture Marketplace
-- Database Schema — FINAL PRODUCTION VERSION (V7.1.3)
-- 2026
-- ================================================================

-- 01. provinces
CREATE TABLE IF NOT EXISTS provinces (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name_en  VARCHAR(100) NOT NULL UNIQUE,
    name_km  VARCHAR(100),
    region   VARCHAR(50)
);

-- 02. users
CREATE TABLE IF NOT EXISTS users (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    phone               VARCHAR(20)   NOT NULL UNIQUE,
    password_hash       VARCHAR(255),
    google_id           VARCHAR(255)  UNIQUE,
    facebook_id         VARCHAR(255)  UNIQUE,
    name                VARCHAR(100)  NOT NULL,
    username            VARCHAR(80)   UNIQUE,
    email               VARCHAR(150)  UNIQUE,
    email_verified_at   TIMESTAMP     NULL,
    role                ENUM('farmer','middleman','buyer','admin') NOT NULL,
    province_id         INT           DEFAULT NULL,
    detailed_location   TEXT,
    profile_photo       VARCHAR(255),
    experience          ENUM('lessThan1', '1to3', '3to5', '5to10', 'over10'),
    is_active           BOOLEAN       DEFAULT TRUE,
    is_verified         BOOLEAN       DEFAULT FALSE,
    created_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE SET NULL
);

-- 03. admins
CREATE TABLE IF NOT EXISTS admins (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL UNIQUE,
    last_active_at  TIMESTAMP,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 04. admin_sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    admin_id    INT          NOT NULL,
    token       VARCHAR(512) NOT NULL UNIQUE,
    ip_address  VARCHAR(45)  NOT NULL,
    expires_at  TIMESTAMP    NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- 05. admin_logs
CREATE TABLE IF NOT EXISTS admin_logs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    admin_id    INT          NOT NULL,
    action      VARCHAR(100) NOT NULL,
    target_type VARCHAR(50),
    target_id   INT,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- 06. sessions
CREATE TABLE IF NOT EXISTS sessions (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT          NOT NULL,
    token       VARCHAR(512) NOT NULL UNIQUE,
    expires_at  TIMESTAMP    NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 07. categories
CREATE TABLE IF NOT EXISTS categories (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name_en     VARCHAR(100) NOT NULL,
    name_km     VARCHAR(100),
    slug        VARCHAR(100) NOT NULL UNIQUE,
    icon        VARCHAR(50)
);

-- 08. sub_categories
CREATE TABLE IF NOT EXISTS sub_categories (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name_en     VARCHAR(100) NOT NULL,
    name_km     VARCHAR(100),
    slug        VARCHAR(100) NOT NULL UNIQUE,
    icon        VARCHAR(50),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 09. products
CREATE TABLE IF NOT EXISTS products (
    id              INT            NOT NULL AUTO_INCREMENT PRIMARY KEY,
    seller_id       INT            NOT NULL,
    sub_category_id INT            NOT NULL,
    variety         VARCHAR(150)   NOT NULL,
    price_per_unit  DECIMAL(10,2)  NOT NULL,
    unit            VARCHAR(30)    NOT NULL DEFAULT 'kg',
    quantity        DECIMAL(10,2)  NOT NULL,
    province_id     INT            NOT NULL,
    description     TEXT,
    is_active       BOOLEAN        DEFAULT TRUE,
    is_featured     BOOLEAN        DEFAULT FALSE,
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);

-- 10. product_images
CREATE TABLE IF NOT EXISTS product_images (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    product_id      INT NOT NULL,
    image_url       VARCHAR(255) NOT NULL,
    sort_order      TINYINT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 11. demand_requests
CREATE TABLE IF NOT EXISTS demand_requests (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    buyer_id        INT            NOT NULL,
    sub_category_id INT            NOT NULL,
    variety         VARCHAR(150)   NOT NULL,
    target_price    DECIMAL(10,2),
    unit            VARCHAR(30)    NOT NULL DEFAULT 'kg',
    quantity_needed DECIMAL(10,2)  NOT NULL,
    province_id     INT            NOT NULL,
    description     TEXT,
    is_active       BOOLEAN        DEFAULT TRUE,
    is_featured     BOOLEAN        DEFAULT FALSE,
    created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (sub_category_id) REFERENCES sub_categories(id),
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);

-- 12. matches
CREATE TABLE IF NOT EXISTS matches (
    id               INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id       INT  NOT NULL,
    demand_id        INT  NOT NULL,
    match_score      INT  DEFAULT 0,
    province_match   ENUM('same','nearby','different') NOT NULL,
    status           ENUM('pending','contacted','completed','expired') DEFAULT 'pending',
    seller_notified  BOOLEAN DEFAULT FALSE,
    buyer_notified   BOOLEAN DEFAULT FALSE,
    seller_dismissed BOOLEAN DEFAULT FALSE,
    buyer_dismissed  BOOLEAN DEFAULT FALSE,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (demand_id)  REFERENCES demand_requests(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match (product_id, demand_id)
);

-- 13. notifications
CREATE TABLE IF NOT EXISTS notifications (
    id         INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id    INT  NOT NULL,
    match_id   INT,
    type       ENUM('new_match','demand_near_you','product_near_you','system') NOT NULL,
    message    TEXT NOT NULL,
    is_read    BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE SET NULL
);

-- 14. follows
CREATE TABLE IF NOT EXISTS follows (
    id           INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    follower_id  INT NOT NULL,
    following_id INT NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY (follower_id, following_id)
);

-- 15. favorites
CREATE TABLE IF NOT EXISTS favorites (
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    target_type ENUM('product','demand') NOT NULL,
    target_id   INT NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 16. comments
CREATE TABLE IF NOT EXISTS comments (
    id         INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author_id  INT NOT NULL,
    product_id INT,
    demand_id  INT,
    content    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (demand_id) REFERENCES demand_requests(id) ON DELETE CASCADE
);

-- 17. product_views
CREATE TABLE IF NOT EXISTS product_views (
    id         INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    viewer_id  INT,
    ip_address VARCHAR(45),
    viewed_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (viewer_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 18. listing_slot_requests
CREATE TABLE IF NOT EXISTS listing_slot_requests (
    id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         INT NOT NULL,
    requested_limit INT NOT NULL,
    status          ENUM('pending','approved','rejected') DEFAULT 'pending',
    reviewed_by     INT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 19. reports
CREATE TABLE IF NOT EXISTS reports (
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reporter_id INT NOT NULL,
    target_type ENUM('product','demand','user') NOT NULL,
    target_id   INT NOT NULL,
    reason      VARCHAR(255) NOT NULL,
    status      ENUM('open','reviewed','resolved') DEFAULT 'open',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 20. social_links
CREATE TABLE IF NOT EXISTS social_links (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    platform   VARCHAR(50) NOT NULL,
    url        VARCHAR(500) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 21. user_phones
CREATE TABLE IF NOT EXISTS user_phones (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    label        VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 22. province_adjacency
CREATE TABLE IF NOT EXISTS province_adjacency (
    province_id INT NOT NULL,
    adjacent_id INT NOT NULL,
    distance_score TINYINT DEFAULT 3,
    PRIMARY KEY (province_id, adjacent_id),
    FOREIGN KEY (province_id) REFERENCES provinces(id),
    FOREIGN KEY (adjacent_id) REFERENCES provinces(id)
);

-- TRIGGERS
DELIMITER //
CREATE TRIGGER tr_match_on_product_insert AFTER INSERT ON products FOR EACH ROW
BEGIN
    INSERT IGNORE INTO matches (product_id, demand_id, province_match, match_score)
    SELECT NEW.id, d.id, 
        CASE WHEN d.province_id = NEW.province_id THEN 'same' WHEN adj.adjacent_id IS NOT NULL THEN 'nearby' ELSE 'different' END,
        CASE WHEN d.province_id = NEW.province_id THEN 100 WHEN adj.adjacent_id IS NOT NULL THEN 50 ELSE 10 END
    FROM demand_requests d LEFT JOIN province_adjacency adj ON adj.province_id = NEW.province_id AND adj.adjacent_id = d.province_id
    WHERE d.sub_category_id = NEW.sub_category_id AND d.is_active = TRUE;
END //

CREATE TRIGGER tr_match_on_demand_insert AFTER INSERT ON demand_requests FOR EACH ROW
BEGIN
    INSERT IGNORE INTO matches (product_id, demand_id, province_match, match_score)
    SELECT p.id, NEW.id, 
        CASE WHEN p.province_id = NEW.province_id THEN 'same' WHEN adj.adjacent_id IS NOT NULL THEN 'nearby' ELSE 'different' END,
        CASE WHEN p.province_id = NEW.province_id THEN 100 WHEN adj.adjacent_id IS NOT NULL THEN 50 ELSE 10 END
    FROM products p LEFT JOIN province_adjacency adj ON adj.province_id = NEW.province_id AND adj.adjacent_id = p.province_id
    WHERE p.sub_category_id = NEW.sub_category_id AND p.is_active = TRUE;
END //
DELIMITER ;

-- SEEDING
INSERT IGNORE INTO provinces (name_en, name_km, region) VALUES ('Phnom Penh','ភ្នំពេញ','Central'), ('Kandal','កណ្តាល','Central');
INSERT IGNORE INTO categories (id, name_en, name_km, slug) VALUES (1,'Crop','ដំណាំ','crop'), (2,'Fruit','ផ្លែឈើ','fruit');
INSERT IGNORE INTO sub_categories (category_id, name_en, name_km, slug) VALUES (1,'Rice','អង្ករ','rice'), (2,'Mango','ស្វាយ','mango');
