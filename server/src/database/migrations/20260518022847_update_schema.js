/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // 1. Rename table 'favorites' to 'saved_posts'
  await knex.schema.renameTable('favorites', 'saved_posts');

  // 2. Add listing_slot_limit to users table
  await knex.schema.table('users', (table) => {
    table.integer('listing_slot_limit').defaultTo(10);
  });

  // 3. Add expires_at to matches table
  await knex.schema.table('matches', (table) => {
    table.timestamp('expires_at').nullable();
  });

  // 4. Recreate province_adjacency table with distance_km
  await knex.schema.dropTableIfExists('province_adjacency');
  await knex.schema.createTable('province_adjacency', (table) => {
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.integer('adjacent_id').unsigned().notNullable().references('id').inTable('provinces');
    table.integer('distance_km').notNullable();
    table.primary(['province_id', 'adjacent_id']);
  });

  // 5. Create new tables
  // legal_documents
  await knex.schema.createTable('legal_documents', (table) => {
    table.increments('id').primary();
    table.enum('type', ['terms_conditions', 'privacy_policy']).notNullable();
    table.string('title', 255).notNullable();
    table.text('content').notNullable();
    table.string('version', 20).notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // user_legal_acceptances
  await knex.schema.createTable('user_legal_acceptances', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('legal_document_id').unsigned().notNullable().references('id').inTable('legal_documents').onDelete('CASCADE');
    table.timestamp('accepted_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'legal_document_id'], 'unique_user_legal_acceptance');
  });

  // subscription_plans
  await knex.schema.createTable('subscription_plans', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable().unique();
    table.decimal('price', 10, 2).notNullable();
    table.integer('duration_days').notNullable();
    table.integer('listing_slot_limit').notNullable();
    table.text('description');
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  // user_subscriptions
  await knex.schema.createTable('user_subscriptions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('plan_id').unsigned().notNullable().references('id').inTable('subscription_plans').onDelete('RESTRICT');
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.enum('status', ['active', 'expired', 'cancelled']).defaultTo('active');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // payments
  await knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('subscription_id').unsigned().notNullable().references('id').inTable('user_subscriptions').onDelete('RESTRICT');
    table.decimal('amount', 10, 2).notNullable();
    table.string('currency', 10).defaultTo('USD');
    table.string('payment_method', 50);
    table.string('transaction_ref', 255).unique();
    table.string('stripe_payment_intent_id', 255).unique();
    table.string('stripe_customer_id', 255);
    table.string('receipt_url', 500);
    table.enum('status', ['pending', 'completed', 'failed', 'refunded']).defaultTo('pending');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // 6. Set up updated_at triggers for new tables
  const newTablesWithUpdatedAt = ['legal_documents', 'user_subscriptions', 'payments'];
  for (const tableName of newTablesWithUpdatedAt) {
    await knex.raw(`
      CREATE TRIGGER update_${tableName}_updated_at
      BEFORE UPDATE ON ${tableName}
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  }

  // 7. Drop old triggers and functions
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_demand_insert ON demand_requests');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_demand_insert_fn CASCADE');
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_product_insert ON products');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_product_insert_fn CASCADE');

  // 8. Recreate automated matching triggers and functions with new rules
  // Function & Trigger: Product Insert
  await knex.raw(`
    CREATE OR REPLACE FUNCTION tr_match_on_product_insert_fn()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO matches (product_id, demand_id, province_match, match_score, expires_at)
        SELECT 
            NEW.id, 
            d.id,
            (CASE 
                WHEN d.province_id = NEW.province_id THEN 'same'::province_match
                WHEN adj.distance_km IS NOT NULL THEN 'nearby'::province_match
                ELSE 'different'::province_match
            END),
            CAST(
                -- 1. Location Score (Max 50)
                (CASE 
                    WHEN d.province_id = NEW.province_id THEN 50
                    ELSE COALESCE(GREATEST(0.0, 50.0 * (1.0 - (adj.distance_km::float / 300.0))), 0.0)
                END) +
                -- 2. Criteria Match (Max 50) - Only if units match
                (CASE 
                    WHEN NEW.unit = d.unit THEN 
                        (CASE 
                            WHEN NEW.price_per_unit <= d.target_price THEN 30.0
                            ELSE 30.0 * (d.target_price::float / NEW.price_per_unit::float)
                        END) +
                        (CASE 
                            WHEN NEW.quantity >= d.quantity_needed THEN 20.0
                            ELSE 20.0 * (NEW.quantity::float / d.quantity_needed::float)
                        END)
                    ELSE 0.0
                END)
            AS INTEGER),
            CURRENT_TIMESTAMP + INTERVAL '3 days'
        FROM demand_requests d 
        LEFT JOIN province_adjacency adj ON (adj.province_id = NEW.province_id AND adj.adjacent_id = d.province_id)
        WHERE d.sub_category_id = NEW.sub_category_id 
          AND d.is_active = TRUE 
          AND d.updated_at >= CURRENT_TIMESTAMP - INTERVAL '3 days'
        ON CONFLICT (product_id, demand_id) DO NOTHING;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tr_match_on_product_insert
    AFTER INSERT ON products
    FOR EACH ROW
    EXECUTE FUNCTION tr_match_on_product_insert_fn();
  `);

  // Function & Trigger: Product Update
  await knex.raw(`
    CREATE OR REPLACE FUNCTION tr_match_on_product_update_fn()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.updated_at > OLD.updated_at AND NEW.is_active = TRUE THEN
            INSERT INTO matches (product_id, demand_id, province_match, match_score, expires_at)
            SELECT 
                NEW.id, 
                d.id,
                (CASE 
                    WHEN d.province_id = NEW.province_id THEN 'same'::province_match
                    WHEN adj.distance_km IS NOT NULL THEN 'nearby'::province_match
                    ELSE 'different'::province_match
                END),
                CAST(
                    -- 1. Location Score (Max 50)
                    (CASE 
                        WHEN d.province_id = NEW.province_id THEN 50
                        ELSE COALESCE(GREATEST(0.0, 50.0 * (1.0 - (adj.distance_km::float / 300.0))), 0.0)
                    END) +
                    -- 2. Criteria Match (Max 50) - Only if units match
                    (CASE 
                        WHEN NEW.unit = d.unit THEN 
                            (CASE 
                                WHEN NEW.price_per_unit <= d.target_price THEN 30.0
                                ELSE 30.0 * (d.target_price::float / NEW.price_per_unit::float)
                            END) +
                            (CASE 
                                WHEN NEW.quantity >= d.quantity_needed THEN 20.0
                                ELSE 20.0 * (NEW.quantity::float / d.quantity_needed::float)
                            END)
                        ELSE 0.0
                    END)
                AS INTEGER),
                CURRENT_TIMESTAMP + INTERVAL '3 days'
            FROM demand_requests d 
            LEFT JOIN province_adjacency adj ON (adj.province_id = NEW.province_id AND adj.adjacent_id = d.province_id)
            WHERE d.sub_category_id = NEW.sub_category_id 
              AND d.is_active = TRUE 
              AND d.updated_at >= CURRENT_TIMESTAMP - INTERVAL '3 days'
            ON CONFLICT (product_id, demand_id) DO NOTHING;
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tr_match_on_product_update
    AFTER UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION tr_match_on_product_update_fn();
  `);

  // Function & Trigger: Demand Insert
  await knex.raw(`
    CREATE OR REPLACE FUNCTION tr_match_on_demand_insert_fn()
    RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO matches (product_id, demand_id, province_match, match_score, expires_at)
        SELECT 
            p.id, 
            NEW.id,
            (CASE 
                WHEN p.province_id = NEW.province_id THEN 'same'::province_match
                WHEN adj.distance_km IS NOT NULL THEN 'nearby'::province_match
                ELSE 'different'::province_match
            END),
            CAST(
                -- 1. Location Score (Max 50)
                (CASE 
                    WHEN p.province_id = NEW.province_id THEN 50
                    ELSE COALESCE(GREATEST(0.0, 50.0 * (1.0 - (adj.distance_km::float / 300.0))), 0.0)
                END) +
                -- 2. Criteria Match (Max 50) - Only if units match
                (CASE 
                    WHEN p.unit = NEW.unit THEN 
                        (CASE 
                            WHEN p.price_per_unit <= NEW.target_price THEN 30.0
                            ELSE 30.0 * (NEW.target_price::float / p.price_per_unit::float)
                        END) +
                        (CASE 
                            WHEN p.quantity >= NEW.quantity_needed THEN 20.0
                            ELSE 20.0 * (p.quantity::float / NEW.quantity_needed::float)
                        END)
                    ELSE 0.0
                END)
            AS INTEGER),
            CURRENT_TIMESTAMP + INTERVAL '3 days'
        FROM products p 
        LEFT JOIN province_adjacency adj ON (adj.province_id = NEW.province_id AND adj.adjacent_id = p.province_id)
        WHERE p.sub_category_id = NEW.sub_category_id 
          AND p.is_active = TRUE 
          AND p.updated_at >= CURRENT_TIMESTAMP - INTERVAL '3 days'
        ON CONFLICT (product_id, demand_id) DO NOTHING;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tr_match_on_demand_insert
    AFTER INSERT ON demand_requests
    FOR EACH ROW
    EXECUTE FUNCTION tr_match_on_demand_insert_fn();
  `);

  // Function & Trigger: Demand Update
  await knex.raw(`
    CREATE OR REPLACE FUNCTION tr_match_on_demand_update_fn()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.updated_at > OLD.updated_at AND NEW.is_active = TRUE THEN
            INSERT INTO matches (product_id, demand_id, province_match, match_score, expires_at)
            SELECT 
                p.id, 
                NEW.id,
                (CASE 
                    WHEN p.province_id = NEW.province_id THEN 'same'::province_match
                    WHEN adj.distance_km IS NOT NULL THEN 'nearby'::province_match
                    ELSE 'different'::province_match
                END),
                CAST(
                    -- 1. Location Score (Max 50)
                    (CASE 
                        WHEN p.province_id = NEW.province_id THEN 50
                        ELSE COALESCE(GREATEST(0.0, 50.0 * (1.0 - (adj.distance_km::float / 300.0))), 0.0)
                    END) +
                    -- 2. Criteria Match (Max 50) - Only if units match
                    (CASE 
                        WHEN p.unit = NEW.unit THEN 
                            (CASE 
                                WHEN p.price_per_unit <= NEW.target_price THEN 30.0
                                ELSE 30.0 * (NEW.target_price::float / p.price_per_unit::float)
                            END) +
                            (CASE 
                                WHEN p.quantity >= NEW.quantity_needed THEN 20.0
                                ELSE 20.0 * (p.quantity::float / NEW.quantity_needed::float)
                            END)
                        ELSE 0.0
                    END)
                AS INTEGER),
                CURRENT_TIMESTAMP + INTERVAL '3 days'
            FROM products p 
            LEFT JOIN province_adjacency adj ON (adj.province_id = NEW.province_id AND adj.adjacent_id = p.province_id)
            WHERE p.sub_category_id = NEW.sub_category_id 
              AND p.is_active = TRUE 
              AND p.updated_at >= CURRENT_TIMESTAMP - INTERVAL '3 days'
            ON CONFLICT (product_id, demand_id) DO NOTHING;
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER tr_match_on_demand_update
    AFTER UPDATE ON demand_requests
    FOR EACH ROW
    EXECUTE FUNCTION tr_match_on_demand_update_fn();
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  // 1. Drop matching triggers
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_demand_update ON demand_requests');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_demand_update_fn CASCADE');
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_demand_insert ON demand_requests');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_demand_insert_fn CASCADE');
  
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_product_update ON products');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_product_update_fn CASCADE');
  await knex.raw('DROP TRIGGER IF EXISTS tr_match_on_product_insert ON products');
  await knex.raw('DROP FUNCTION IF EXISTS tr_match_on_product_insert_fn CASCADE');

  // 2. Restore old triggers from initial migration
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

  // 3. Drop updated_at triggers for new tables
  const newTablesWithUpdatedAt = ['legal_documents', 'user_subscriptions', 'payments'];
  for (const tableName of newTablesWithUpdatedAt) {
    await knex.raw(`DROP TRIGGER IF EXISTS update_${tableName}_updated_at ON ${tableName}`);
  }

  // 4. Drop new tables
  await knex.schema.dropTableIfExists('payments');
  await knex.schema.dropTableIfExists('user_subscriptions');
  await knex.schema.dropTableIfExists('subscription_plans');
  await knex.schema.dropTableIfExists('user_legal_acceptances');
  await knex.schema.dropTableIfExists('legal_documents');

  // 5. Restore province_adjacency with distance_score
  await knex.schema.dropTableIfExists('province_adjacency');
  await knex.schema.createTable('province_adjacency', (table) => {
    table.integer('province_id').unsigned().notNullable().references('id').inTable('provinces');
    table.integer('adjacent_id').unsigned().notNullable().references('id').inTable('provinces');
    table.tinyint('distance_score').defaultTo(3);
    table.primary(['province_id', 'adjacent_id']);
  });

  // 6. Remove expires_at from matches table
  await knex.schema.table('matches', (table) => {
    table.dropColumn('expires_at');
  });

  // 7. Remove listing_slot_limit from users table
  await knex.schema.table('users', (table) => {
    table.dropColumn('listing_slot_limit');
  });

  // 8. Rename table 'saved_posts' back to 'favorites'
  await knex.schema.renameTable('saved_posts', 'favorites');
};
