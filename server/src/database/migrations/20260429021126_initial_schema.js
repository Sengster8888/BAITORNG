/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // 1. Provinces
  await knex.schema.createTable('provinces', (table) => {
    table.increments('id').primary();
    table.string('name_en', 100).notNullable().unique();
    table.string('name_km', 100);
    table.string('region', 50);
  });

  // 2. Users
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('phone', 20).notNullable().unique();
    table.string('password_hash', 255);
    table.string('google_id', 255).unique();
    table.string('facebook_id', 255).unique();
    table.string('name', 100).notNullable();
    table.string('username', 80).unique();
    table.string('email', 150).unique();
    table.timestamp('email_verified_at');
    table.enum('role', ['farmer', 'middleman', 'buyer', 'admin']).notNullable();
    table.integer('province_id').unsigned().references('id').inTable('provinces').onDelete('SET NULL');
    table.text('detailed_location');
    table.string('profile_photo', 255);
    table.enum('experience', ['lessThan1', '1to3', '3to5', '5to10', 'over10']);
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_verified').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 3. Admins
  await knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().unique().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('last_active_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 4. Admin Sessions
  await knex.schema.createTable('admin_sessions', (table) => {
    table.increments('id').primary();
    table.integer('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
    table.string('token', 512).notNullable().unique();
    table.string('ip_address', 45).notNullable();
    table.timestamp('expires_at').notNullable();
  });

  // 5. Admin Logs
  await knex.schema.createTable('admin_logs', (table) => {
    table.increments('id').primary();
    table.integer('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
    table.string('action', 100).notNullable();
    table.string('target_type', 50);
    table.integer('target_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 6. User Sessions
  await knex.schema.createTable('sessions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('token', 512).notNullable().unique();
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 7. Categories
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name_en', 100).notNullable();
    table.string('name_km', 100);
    table.string('slug', 100).notNullable().unique();
    table.string('icon', 50);
  });

  // 8. Sub Categories
  await knex.schema.createTable('sub_categories', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().notNullable().references('id').inTable('categories').onDelete('CASCADE');
    table.string('name_en', 100).notNullable();
    table.string('name_km', 100);
    table.string('slug', 100).notNullable().unique();
    table.string('icon', 50);
  });

  // 9. Products
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('seller_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('sub_category_id').unsigned().notNullable().references('id').inTable('sub_categories');
    table.string('variety', 150).notNullable();
    table.decimal('price_per_unit', 10, 2).notNullable();
    table.string('unit', 30).notNullable().defaultTo('kg');
    table.decimal('quantity', 10, 2).notNullable();
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.text('description');
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 10. Product Images
  await knex.schema.createTable('product_images', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.string('image_url', 255).notNullable();
    table.tinyint('sort_order').defaultTo(0);
  });

  // 11. Demand Requests
  await knex.schema.createTable('demand_requests', (table) => {
    table.increments('id').primary();
    table.integer('buyer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('sub_category_id').unsigned().notNullable().references('id').inTable('sub_categories');
    table.string('variety', 150).notNullable();
    table.decimal('target_price', 10, 2);
    table.string('unit', 30).notNullable().defaultTo('kg');
    table.decimal('quantity_needed', 10, 2).notNullable();
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.text('description');
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 12. Matches
  await knex.schema.createTable('matches', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('demand_id').unsigned().notNullable().references('id').inTable('demand_requests').onDelete('CASCADE');
    table.integer('match_score').defaultTo(0);
    table.enum('province_match', ['same', 'nearby', 'different']).notNullable();
    table.enum('status', ['pending', 'contacted', 'completed', 'expired']).defaultTo('pending');
    table.boolean('seller_notified').defaultTo(false);
    table.boolean('buyer_notified').defaultTo(false);
    table.boolean('seller_dismissed').defaultTo(false);
    table.boolean('buyer_dismissed').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['product_id', 'demand_id']);
  });

  // 13. Notifications
  await knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('match_id').unsigned().references('id').inTable('matches').onDelete('SET NULL');
    table.enum('type', ['new_match', 'demand_near_you', 'product_near_you', 'system']).notNullable();
    table.text('message').notNullable();
    table.boolean('is_read').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 14. Follows
  await knex.schema.createTable('follows', (table) => {
    table.increments('id').primary();
    table.integer('follower_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('following_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['follower_id', 'following_id']);
  });

  // 15. Favorites
  await knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enum('target_type', ['product', 'demand']).notNullable();
    table.integer('target_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 16. Comments
  await knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.integer('demand_id').unsigned().references('id').inTable('demand_requests').onDelete('CASCADE');
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 17. Product Views
  await knex.schema.createTable('product_views', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('viewer_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.string('ip_address', 45);
    table.timestamp('viewed_at').defaultTo(knex.fn.now());
  });

  // 18. Listing Slot Requests
  await knex.schema.createTable('listing_slot_requests', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('requested_limit').notNullable();
    table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending');
    table.integer('reviewed_by').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 19. Reports
  await knex.schema.createTable('reports', (table) => {
    table.increments('id').primary();
    table.integer('reporter_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enum('target_type', ['product', 'demand', 'user']).notNullable();
    table.integer('target_id').notNullable();
    table.string('reason', 255).notNullable();
    table.enum('status', ['open', 'reviewed', 'resolved']).defaultTo('open');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 20. Social Links
  await knex.schema.createTable('social_links', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('platform', 50).notNullable();
    table.string('url', 500).notNullable();
  });

  // 21. User Phones
  await knex.schema.createTable('user_phones', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('phone_number', 20).notNullable();
    table.string('label', 50);
  });

  // 22. Province Adjacency
  await knex.schema.createTable('province_adjacency', (table) => {
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.integer('adjacent_id').unsigned().notNullable().references('id').inTable('provinces');
    table.tinyint('distance_score').defaultTo(3);
    table.primary(['province_id', 'adjacent_id']);
  });

  // Post-creation: Triggers and Functions
  // 1. updated_at function (PostgreSQL)
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  // 2. updated_at triggers
  const tablesWithUpdatedAt = ['users', 'products', 'demand_requests'];
  for (const tableName of tablesWithUpdatedAt) {
    await knex.raw(`
      CREATE TRIGGER update_${tableName}_updated_at
      BEFORE UPDATE ON ${tableName}
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  // 3. Automated matching triggers (Translated from MySQL to PostgreSQL)
  // Trigger on Product Insert
  await knex.raw(`
    CREATE OR REPLACE FUNCTION tr_match_on_product_insert_fn()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO matches (product_id, demand_id, province_match, match_score)
        SELECT NEW.id, d.id, 
            CASE 
                WHEN d.province_id = NEW.province_id THEN 'same'::province_match
                WHEN EXISTS (SELECT 1 FROM province_adjacency adj WHERE adj.province_id = NEW.province_id AND adj.adjacent_id = d.province_id) THEN 'nearby'::province_match
                ELSE 'different'::province_match 
            END,
            CASE 
                WHEN d.province_id = NEW.province_id THEN 100 
                WHEN EXISTS (SELECT 1 FROM province_adjacency adj WHERE adj.province_id = NEW.province_id AND adj.adjacent_id = d.province_id) THEN 50 
                ELSE 10 
            END
        FROM demand_requests d
        WHERE d.sub_category_id = NEW.sub_category_id AND d.is_active = TRUE
        ON CONFLICT (product_id, demand_id) DO NOTHING;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tr_match_on_product_insert
    AFTER INSERT ON products
    FOR EACH ROW
    EXECUTE FUNCTION tr_match_on_product_insert_fn();
  `);

  // Trigger on Demand Insert
  await knex.raw(`
    CREATE OR REPLACE FUNCTION tr_match_on_demand_insert_fn()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO matches (product_id, demand_id, province_match, match_score)
        SELECT p.id, NEW.id, 
            CASE 
                WHEN p.province_id = NEW.province_id THEN 'same'::province_match
                WHEN EXISTS (SELECT 1 FROM province_adjacency adj WHERE adj.province_id = NEW.province_id AND adj.adjacent_id = p.province_id) THEN 'nearby'::province_match
                ELSE 'different'::province_match 
            END,
            CASE 
                WHEN p.province_id = NEW.province_id THEN 100 
                WHEN EXISTS (SELECT 1 FROM province_adjacency adj WHERE adj.province_id = NEW.province_id AND adj.adjacent_id = p.province_id) THEN 50 
                ELSE 10 
            END
        FROM products p
        WHERE p.sub_category_id = NEW.sub_category_id AND p.is_active = TRUE
        ON CONFLICT (product_id, demand_id) DO NOTHING;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tr_match_on_demand_insert
    AFTER INSERT ON demand_requests
    FOR EACH ROW
    EXECUTE FUNCTION tr_match_on_demand_insert_fn();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // Drop triggers first
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_demand_insert ON demand_requests');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_demand_insert_fn');
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_product_insert ON products');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_product_insert_fn');
  
  const tablesWithUpdatedAt = ['users', 'products', 'demand_requests'];
  for (const tableName of tablesWithUpdatedAt) {
    await knex.raw(`DROP TRIGGER IF EXISTS update_${tableName}_updated_at ON ${tableName}`);
  }
  await knex.raw('DROP FUNCTION IF EXISTS update_updated_at_column CASCADE');

  // Drop tables in reverse order
  await knex.schema.dropTableIfExists('province_adjacency');
  await knex.schema.dropTableIfExists('user_phones');
  await knex.schema.dropTableIfExists('social_links');
  await knex.schema.dropTableIfExists('reports');
  await knex.schema.dropTableIfExists('listing_slot_requests');
  await knex.schema.dropTableIfExists('product_views');
  await knex.schema.dropTableIfExists('comments');
  await knex.schema.dropTableIfExists('favorites');
  await knex.schema.dropTableIfExists('follows');
  await knex.schema.dropTableIfExists('notifications');
  await knex.schema.dropTableIfExists('matches');
  await knex.schema.dropTableIfExists('demand_requests');
  await knex.schema.dropTableIfExists('product_images');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('sub_categories');
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('sessions');
  await knex.schema.dropTableIfExists('admin_logs');
  await knex.schema.dropTableIfExists('admin_sessions');
  await knex.schema.dropTableIfExists('admins');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('provinces');
};
