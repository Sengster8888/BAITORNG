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
    table.string('password_hash', 255).notNullable();
    table.string('name', 100).notNullable();
    table.string('username', 80).unique();
    table.string('email', 150).unique();
    table.enum('role', ['farmer', 'middleman', 'business_owner', 'admin']).notNullable().defaultTo('farmer');
    table.integer('province_id').unsigned().references('id').inTable('provinces').onDelete('SET NULL');
    table.text('detailed_location');
    table.string('profile_photo', 255);
    table.text('bio');
    table.smallint('experience_years').defaultTo(0);
    table.boolean('is_verified').defaultTo(false);
    table.boolean('is_active').defaultTo(true);
    table.integer('listing_limit').defaultTo(10);
    table.text('admin_notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 3. Admins
  await knex.schema.createTable('admins', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().unique().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('last_active_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 4. Admin Sessions
  await knex.schema.createTable('admin_sessions', (table) => {
    table.increments('id').primary();
    table.integer('admin_id').unsigned().notNullable().references('id').inTable('admins').onDelete('CASCADE');
    table.string('token', 512).notNullable().unique();
    table.string('ip_address', 45).notNullable();
    table.string('device_info', 255);
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
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
    table.string('device_info', 255);
    table.string('ip_address', 45);
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 7. Categories
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.integer('parent_id').unsigned().references('id').inTable('categories').onDelete('SET NULL');
    table.string('name_en', 100).notNullable();
    table.string('name_km', 100);
    table.string('slug', 100).notNullable().unique();
    table.string('icon', 50);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 8. Products
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('seller_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('category_id').unsigned().notNullable().references('id').inTable('categories');
    table.string('name', 150).notNullable();
    table.string('variety', 150);
    table.decimal('price_per_unit', 10, 2).notNullable();
    table.string('unit', 30).notNullable();
    table.decimal('quantity', 10, 2).notNullable();
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.text('description');
    table.date('harvest_date');
    table.string('photo_url', 255);
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 9. Demand Requests
  await knex.schema.createTable('demand_requests', (table) => {
    table.increments('id').primary();
    table.integer('buyer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('category_id').unsigned().notNullable().references('id').inTable('categories');
    table.string('product_name', 150).notNullable();
    table.string('variety', 150);
    table.decimal('quantity_needed', 10, 2).notNullable();
    table.string('unit', 30).notNullable();
    table.decimal('max_price', 10, 2);
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.text('description');
    table.date('deadline');
    table.string('photo_url', 255);
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 10. Matches
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
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.unique(['product_id', 'demand_id']);
  });

  // 11. Notifications
  await knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('match_id').unsigned().references('id').inTable('matches').onDelete('SET NULL');
    table.enum('type', ['new_match', 'demand_near_you', 'product_near_you', 'system']).notNullable();
    table.text('message').notNullable();
    table.boolean('is_read').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 12. Follows
  await knex.schema.createTable('follows', (table) => {
    table.increments('id').primary();
    table.integer('follower_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('following_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['follower_id', 'following_id']);
  });

  // 13. Favorites
  await knex.schema.createTable('favorites', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enum('target_type', ['product', 'demand']).notNullable();
    table.integer('target_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'target_type', 'target_id']);
  });

  // 14. Comments
  await knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.integer('demand_id').unsigned().references('id').inTable('demand_requests').onDelete('CASCADE');
    table.text('content').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 15. Product Views
  await knex.schema.createTable('product_views', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('viewer_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.string('ip_address', 45);
    table.timestamp('viewed_at').defaultTo(knex.fn.now());
  });

  // 16. Listing Slot Requests
  await knex.schema.createTable('listing_slot_requests', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('requested_limit').notNullable();
    table.text('reason');
    table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending');
    table.integer('reviewed_by').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('reviewed_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // 17. Reports
  await knex.schema.createTable('reports', (table) => {
    table.increments('id').primary();
    table.integer('reporter_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.enum('target_type', ['product', 'demand', 'user']).notNullable();
    table.integer('target_id').notNullable();
    table.enum('reason', ['fake_listing', 'wrong_price', 'spam', 'inappropriate', 'scam', 'other']).notNullable();
    table.text('description');
    table.enum('status', ['open', 'reviewed', 'resolved', 'dismissed']).defaultTo('open');
    table.integer('reviewed_by').unsigned().references('id').inTable('users').onDelete('SET NULL');
    table.timestamp('reviewed_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['reporter_id', 'target_type', 'target_id']);
  });

  // 18. Province Adjacency
  await knex.schema.createTable('province_adjacency', (table) => {
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.integer('adjacent_id').unsigned().notNullable().references('id').inTable('provinces');
    table.smallint('distance_score').defaultTo(3);
    table.primary(['province_id', 'adjacent_id']);
  });

  // 19. Social Links
  await knex.schema.createTable('social_links', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('platform', 50).notNullable();
    table.string('url', 500).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'platform']);
  });

  // 20. User Phones
  await knex.schema.createTable('user_phones', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('phone_number', 20).notNullable();
    table.string('label', 50);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'phone_number']);
  });

  // Add triggers for updated_at (Postgres specific)
  const tablesWithUpdatedAt = [
    'users', 'admins', 'products', 'demand_requests', 'matches'
  ];

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  for (const tableName of tablesWithUpdatedAt) {
    await knex.raw(`
      CREATE TRIGGER update_${tableName}_updated_at
      BEFORE UPDATE ON ${tableName}
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // Drop tables in reverse order of creation
  await knex.schema.dropTableIfExists('user_phones');
  await knex.schema.dropTableIfExists('social_links');
  await knex.schema.dropTableIfExists('province_adjacency');
  await knex.schema.dropTableIfExists('reports');
  await knex.schema.dropTableIfExists('listing_slot_requests');
  await knex.schema.dropTableIfExists('product_views');
  await knex.schema.dropTableIfExists('comments');
  await knex.schema.dropTableIfExists('favorites');
  await knex.schema.dropTableIfExists('follows');
  await knex.schema.dropTableIfExists('notifications');
  await knex.schema.dropTableIfExists('matches');
  await knex.schema.dropTableIfExists('demand_requests');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('sessions');
  await knex.schema.dropTableIfExists('admin_logs');
  await knex.schema.dropTableIfExists('admin_sessions');
  await knex.schema.dropTableIfExists('admins');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('provinces');

  // Drop trigger function
  await knex.raw('DROP FUNCTION IF EXISTS update_updated_at_column CASCADE');
};
