/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deleting existing entries in reverse dependency order
  await knex('payments').del();
  await knex('user_subscriptions').del();
  await knex('subscription_plans').del();
  await knex('user_legal_acceptances').del();
  await knex('legal_documents').del();
  await knex('social_links').del();
  await knex('user_phones').del();
  await knex('province_adjacency').del();
  await knex('reports').del();
  await knex('listing_slot_requests').del();
  await knex('product_views').del();
  await knex('comments').del();
  await knex('saved_posts').del();
  await knex('follows').del();
  await knex('notifications').del();
  await knex('matches').del();
  await knex('demand_requests').del();
  await knex('product_images').del();
  await knex('products').del();
  await knex('sub_categories').del();
  await knex('categories').del();
  await knex('sessions').del();
  await knex('admin_logs').del();
  await knex('admin_sessions').del();
  await knex('admins').del();
  await knex('users').del();
  await knex('provinces').del();

  // 1. Provinces Seeding
  const provinces = [
    {id: 1, name_en: 'Phnom Penh', name_km: 'ភ្នំពេញ', region: 'Central'},
    {id: 2, name_en: 'Kandal', name_km: 'កណ្តាល', region: 'Central'},
    {id: 3, name_en: 'Takeo', name_km: 'តាកែវ', region: 'Southern'},
    {id: 4, name_en: 'Kampong Speu', name_km: 'កំពង់ស្ពឺ', region: 'Central'},
    {id: 5, name_en: 'Kampong Chhnang', name_km: 'កំពង់ឆ្នាំង', region: 'Central'},
    {id: 6, name_en: 'Pursat', name_km: 'ពោធិ៍សាត់', region: 'Western'},
    {id: 7, name_en: 'Battambang', name_km: 'បាត់ដំបង', region: 'Western'},
    {id: 8, name_en: 'Banteay Meanchey', name_km: 'បន្ទាយមានជ័យ', region: 'Northwestern'},
    {id: 9, name_en: 'Siem Reap', name_km: 'សៀមរាប', region: 'Northwestern'},
    {id: 10, name_en: 'Oddar Meanchey', name_km: 'ឧត្តរមានជ័យ', region: 'Northwestern'},
    {id: 11, name_en: 'Preah Vihear', name_km: 'ព្រះវិហារ', region: 'Northern'},
    {id: 12, name_en: 'Kampong Thom', name_km: 'កំពង់ធំ', region: 'Central'},
    {id: 13, name_en: 'Kampong Cham', name_km: 'កំពង់ចាម', region: 'Central'},
    {id: 14, name_en: 'Tbong Khmum', name_km: 'ត្បូងឃ្មុំ', region: 'Eastern'},
    {id: 15, name_en: 'Prey Veng', name_km: 'ព្រៃវែង', region: 'Eastern'},
    {id: 16, name_en: 'Svay Rieng', name_km: 'ស្វាយរៀង', region: 'Eastern'},
    {id: 17, name_en: 'Kratie', name_km: 'ក្រចេះ', region: 'Northeastern'},
    {id: 18, name_en: 'Stung Treng', name_km: 'ស្ទឹងត្រែង', region: 'Northeastern'},
    {id: 19, name_en: 'Ratanakiri', name_km: 'រតនគិរី', region: 'Northeastern'},
    {id: 20, name_en: 'Mondulkiri', name_km: 'មណ្ឌលគិរី', region: 'Northeastern'},
    {id: 21, name_en: 'Kampot', name_km: 'កំពត', region: 'Coastal'},
    {id: 22, name_en: 'Kep', name_km: 'កែប', region: 'Coastal'},
    {id: 23, name_en: 'Preah Sihanouk', name_km: 'ព្រះសីហនុ', region: 'Coastal'},
    {id: 24, name_en: 'Koh Kong', name_km: 'កោះកុង', region: 'Coastal'},
    {id: 25, name_en: 'Pailin', name_km: 'ប៉ៃលិន', region: 'Western'}
  ];
  await knex('provinces').insert(provinces);
  // Reset sequence in case of PostgreSQL
  await knex.raw("SELECT setval('provinces_id_seq', (SELECT MAX(id) FROM provinces));");

  // 2. Province Adjacency Seeding
  const adjacencyRaw = [
    [1, 2, 11], [1, 4, 48], [1, 3, 78], [1, 15, 90], [1, 5, 91], [1, 16, 122], [1, 13, 124], [1, 21, 148], [1, 12, 168], [1, 22, 174],
    [2, 1, 11], [2, 3, 55], [2, 15, 65], [2, 4, 72], [2, 13, 85], [2, 5, 115], [2, 16, 115], [2, 14, 125], [2, 21, 140], [2, 12, 150],
    [3, 2, 55], [3, 1, 78], [3, 21, 82], [3, 4, 88], [3, 22, 90], [3, 15, 110], [3, 5, 140], [3, 16, 150], [3, 13, 160], [3, 23, 190],
    [4, 1, 48], [4, 2, 72], [4, 3, 88], [4, 5, 95], [4, 24, 120], [4, 21, 130], [4, 6, 145], [4, 15, 160], [4, 22, 180], [4, 23, 180],
    [5, 6, 70], [5, 1, 91], [5, 4, 95], [5, 12, 105], [5, 2, 115], [5, 13, 140], [5, 3, 150], [5, 15, 160], [5, 9, 180], [5, 7, 200],
    [6, 5, 70], [6, 7, 85], [6, 24, 110], [6, 9, 125], [6, 12, 140], [6, 4, 150], [6, 25, 160], [6, 1, 189], [6, 8, 210], [6, 2, 220],
    [7, 8, 65], [7, 25, 70], [7, 6, 85], [7, 9, 105], [7, 10, 120], [7, 5, 180], [7, 12, 210], [7, 11, 250], [7, 24, 280], [7, 1, 291],
    [8, 7, 65], [8, 10, 75], [8, 9, 95], [8, 25, 120], [8, 12, 160], [8, 11, 190], [8, 6, 210], [8, 5, 250], [8, 24, 320], [8, 1, 359],
    [9, 8, 95], [9, 7, 105], [9, 10, 115], [9, 12, 125], [9, 6, 125], [9, 11, 170], [9, 5, 200], [9, 13, 240], [9, 18, 280], [9, 17, 300],
    [10, 8, 75], [10, 9, 115], [10, 7, 120], [10, 11, 135], [10, 12, 190], [10, 6, 240], [10, 25, 260], [10, 18, 300], [10, 17, 350], [10, 13, 400],
    [11, 10, 135], [11, 12, 150], [11, 9, 170], [11, 18, 180], [11, 17, 210], [11, 19, 280], [11, 20, 320], [11, 8, 330], [11, 13, 350], [11, 14, 380],
    [12, 5, 105], [12, 9, 125], [12, 6, 140], [12, 11, 150], [12, 13, 155], [12, 1, 167], [12, 17, 190], [12, 18, 260], [12, 8, 280], [12, 7, 300],
    [13, 14, 45], [13, 2, 85], [13, 15, 90], [13, 1, 124], [13, 12, 155], [13, 17, 160], [13, 5, 180], [13, 16, 190], [13, 3, 210], [13, 20, 280],
    [14, 13, 45], [14, 15, 95], [14, 17, 120], [14, 16, 135], [14, 2, 145], [14, 20, 220], [14, 1, 230], [14, 3, 250], [14, 18, 280], [14, 12, 300],
    [15, 2, 65], [15, 16, 65], [15, 13, 90], [15, 1, 90], [15, 14, 95], [15, 3, 110], [15, 21, 210], [15, 22, 220], [15, 17, 240], [15, 4, 250],
    [16, 15, 65], [16, 1, 122], [16, 14, 135], [16, 2, 145], [16, 3, 150], [16, 13, 190], [16, 17, 250], [16, 20, 280], [16, 21, 290], [16, 22, 300],
    [17, 18, 110], [17, 14, 120], [17, 13, 160], [17, 20, 175], [17, 12, 190], [17, 11, 210], [17, 19, 250], [17, 9, 300], [17, 1, 315], [17, 2, 325],
    [18, 17, 110], [18, 11, 180], [18, 19, 190], [18, 20, 220], [18, 12, 260], [18, 9, 280], [18, 14, 320], [18, 13, 350], [18, 10, 400], [18, 1, 455],
    [19, 20, 160], [19, 18, 190], [19, 17, 250], [19, 11, 320], [19, 12, 350], [19, 9, 400], [19, 14, 420], [19, 13, 450], [19, 1, 588], [19, 2, 600],
    [20, 19, 160], [20, 17, 175], [20, 18, 220], [20, 14, 260], [20, 13, 280], [20, 15, 320], [20, 16, 340], [20, 20, 360], [20, 1, 521], [20, 2, 530],
    [21, 22, 25], [21, 3, 82], [21, 23, 95], [21, 1, 148], [21, 24, 150], [21, 4, 165], [21, 2, 170], [21, 15, 210], [21, 16, 250], [21, 5, 280],
    [22, 21, 25], [22, 3, 90], [22, 23, 110], [22, 1, 174], [22, 4, 180], [22, 2, 200], [22, 24, 220], [22, 15, 230], [22, 16, 260], [22, 5, 300],
    [23, 21, 95], [23, 22, 110], [23, 24, 115], [23, 4, 180], [23, 3, 190], [23, 1, 230], [23, 2, 240], [23, 6, 280], [23, 7, 320], [23, 25, 350],
    [24, 6, 110], [24, 23, 115], [24, 4, 120], [24, 21, 150], [24, 7, 200], [24, 3, 220], [24, 1, 271], [24, 22, 280], [24, 2, 290], [24, 25, 300],
    [25, 7, 70], [25, 8, 120], [25, 6, 140], [25, 9, 170], [25, 10, 190], [25, 12, 250], [25, 11, 300], [25, 24, 320], [25, 23, 350], [25, 5, 380]
  ];
  const provinceAdjacencies = adjacencyRaw.map(([pId, aId, dist]) => ({
    province_id: pId,
    adjacent_id: aId,
    distance_km: dist
  }));
  await knex('province_adjacency').insert(provinceAdjacencies);

  // 3. Categories & Subcategories Seeding
  await knex('categories').insert([
    {id: 1, name_en: 'Crop', name_km: 'ដំណាំ', slug: 'crop'},
    {id: 2, name_en: 'Fruit', name_km: 'ផ្លែឈើ', slug: 'fruit'}
  ]);
  await knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));");

  await knex('sub_categories').insert([
    {id: 1, category_id: 1, name_en: 'Rice', name_km: 'អង្ករ', slug: 'rice'},
    {id: 2, category_id: 2, name_en: 'Mango', name_km: 'ស្វាយ', slug: 'mango'}
  ]);
  await knex.raw("SELECT setval('sub_categories_id_seq', (SELECT MAX(id) FROM sub_categories));");

  // 4. Subscription Plans Seeding
  await knex('subscription_plans').insert([
    {id: 1, name: 'Free', price: 0.00, duration_days: 36500, listing_slot_limit: 10, description: 'Basic free tier with standard limits'},
    {id: 2, name: 'Plus', price: 5.00, duration_days: 30, listing_slot_limit: 50, description: 'Enhanced tier with 50 slots for active sellers'},
    {id: 3, name: 'Pro', price: 15.00, duration_days: 30, listing_slot_limit: 999, description: 'Professional tier with unlimited slots (999) for heavy sellers'}
  ]);
  await knex.raw("SELECT setval('subscription_plans_id_seq', (SELECT MAX(id) FROM subscription_plans));");

  // 5. Default Admin User
  const inserted = await knex('users').insert({
    phone: '+85500000000',
    password_hash: '$2a$10$uSq2U/wH0yX8nbe3k3wTee7nQcQW5aPZUpC4rT0N/q1kC7d8wKjP.', // bcrypt hash for 'admin123'
    name: 'Admin',
    role: 'admin',
    is_verified: true,
    is_active: true
  }).returning('id');

  const adminUserId = typeof inserted[0] === 'object' ? inserted[0].id : inserted[0];

  await knex('admins').insert({
    user_id: adminUserId
  });
};
