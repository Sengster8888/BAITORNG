/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deleting existing entries
  await knex('social_links').del();
  await knex('user_phones').del();
  await knex('province_adjacency').del();
  await knex('reports').del();
  await knex('listing_slot_requests').del();
  await knex('product_views').del();
  await knex('comments').del();
  await knex('favorites').del();
  await knex('follows').del();
  await knex('notifications').del();
  await knex('matches').del();
  await knex('demand_requests').del();
  await knex('products').del();
  await knex('categories').del();
  await knex('sessions').del();
  await knex('admin_logs').del();
  await knex('admin_sessions').del();
  await knex('admins').del();
  await knex('users').del();
  await knex('provinces').del();

  // Inserts provinces
  const provinces = [
    {name_en: 'Phnom Penh',       name_km: 'ភ្នំពេញ',          region: 'Central'},
    {name_en: 'Kandal',           name_km: 'កណ្តាល',           region: 'Central'},
    {name_en: 'Kampong Speu',     name_km: 'កំពង់ស្ពឺ',       region: 'Central'},
    {name_en: 'Kampong Thom',     name_km: 'កំពង់ធំ',         region: 'Central'},
    {name_en: 'Kampong Chhnang',  name_km: 'កំពង់ឆ្នាំង',     region: 'Central'},
    {name_en: 'Takeo',            name_km: 'តាកែវ',            region: 'South'},
    {name_en: 'Kampot',           name_km: 'កំពត',             region: 'South'},
    {name_en: 'Kep',              name_km: 'កែប',              region: 'South'},
    {name_en: 'Sihanoukville',    name_km: 'ព្រះសីហនុ',       region: 'South'},
    {name_en: 'Koh Kong',         name_km: 'កោះកុង',           region: 'South'},
    {name_en: 'Kampong Cham',     name_km: 'កំពង់ចាម',        region: 'Mekong'},
    {name_en: 'Prey Veng',        name_km: 'ព្រៃវែង',          region: 'Mekong'},
    {name_en: 'Svay Rieng',       name_km: 'ស្វាយរៀង',         region: 'Mekong'},
    {name_en: 'Tbong Khmum',      name_km: 'ត្បូងឃ្មុំ',       region: 'Mekong'},
    {name_en: 'Kratie',           name_km: 'ក្រចេះ',           region: 'Mekong'},
    {name_en: 'Stung Treng',      name_km: 'ស្ទឹងត្រែង',      region: 'Mekong'},
    {name_en: 'Ratanakiri',       name_km: 'រតនគិរី',          region: 'Northeast'},
    {name_en: 'Mondulkiri',       name_km: 'មណ្ឌលគិរី',       region: 'Northeast'},
    {name_en: 'Siem Reap',        name_km: 'សៀមរាប',           region: 'Northwest'},
    {name_en: 'Battambang',       name_km: 'បាត់ដំបង',         region: 'Northwest'},
    {name_en: 'Banteay Meanchey', name_km: 'បន្ទាយមានជ័យ',    region: 'Northwest'},
    {name_en: 'Pursat',           name_km: 'ពោធិ៍សាត់',        region: 'Northwest'},
    {name_en: 'Pailin',           name_km: 'ប៉ៃលិន',           region: 'Northwest'},
    {name_en: 'Preah Vihear',     name_km: 'ព្រះវិហារ',        region: 'North'},
    {name_en: 'Oddar Meanchey',   name_km: 'អូរដ្ឋមានជ័យ',    region: 'North'}
  ];
  await knex('provinces').insert(provinces);

  // Inserts categories
  // Top level
  const topCategories = await knex('categories').insert([
    {parent_id: null, name_en: 'Crop',          name_km: 'ដំណាំ',        slug: 'crop',          icon: '🌾'},
    {parent_id: null, name_en: 'Fruit',         name_km: 'ផ្លែឈើ',       slug: 'fruit',         icon: '🍎'},
    {parent_id: null, name_en: 'Vegetable',     name_km: 'បន្លែ',         slug: 'vegetable',     icon: '🥦'},
    {parent_id: null, name_en: 'Other',         name_km: 'ផ្សេងៗ',       slug: 'other',         icon: '📦'}
  ]).returning(['id', 'slug']);

  const getCatId = (slug) => topCategories.find(c => c.slug === slug).id;

  // Subcategories
  await knex('categories').insert([
    {parent_id: getCatId('crop'), name_en: 'Rice',             name_km: 'អង្ករ',         slug: 'rice',          icon: '🍚'},
    {parent_id: getCatId('crop'), name_en: 'Jasmine Rice',     name_km: 'អង្ករម្លិះ',    slug: 'jasmine-rice',  icon: '🍚'},
    {parent_id: getCatId('crop'), name_en: 'Corn',             name_km: 'ពោត',           slug: 'corn',          icon: '🌽'},
    {parent_id: getCatId('crop'), name_en: 'Cassava',          name_km: 'ដំឡូងមី',      slug: 'cassava',       icon: '🥔'},
    {parent_id: getCatId('crop'), name_en: 'Sugarcane',        name_km: 'អំពៅ',          slug: 'sugarcane',     icon: '🎋'},
    
    {parent_id: getCatId('fruit'), name_en: 'Mango',            name_km: 'មាន់ហ៊ូ',       slug: 'mango',         icon: '🥭'},
    {parent_id: getCatId('fruit'), name_en: 'Banana',           name_km: 'ចេក',           slug: 'banana',        icon: '🍌'},
    {parent_id: getCatId('fruit'), name_en: 'Watermelon',       name_km: 'ត្របែក',        slug: 'watermelon',    icon: '🍉'},
    {parent_id: getCatId('fruit'), name_en: 'Durian',           name_km: 'ទុរេន',         slug: 'durian',        icon: '🍈'},
    {parent_id: getCatId('fruit'), name_en: 'Longan',           name_km: 'មៀន',           slug: 'longan',        icon: '🍇'},
    {parent_id: getCatId('fruit'), name_en: 'Jackfruit',        name_km: 'ខ្នុរ',         slug: 'jackfruit',     icon: '🍈'},

    {parent_id: getCatId('vegetable'), name_en: 'Tomato',           name_km: 'ប៉េងប៉ោះ',     slug: 'tomato',        icon: '🍅'},
    {parent_id: getCatId('vegetable'), name_en: 'Chilli',           name_km: 'ម្ទេស',         slug: 'chilli',        icon: '🌶️'},
    {parent_id: getCatId('vegetable'), name_en: 'Cucumber',         name_km: 'ត្រសក់',        slug: 'cucumber',      icon: '🥒'},
    {parent_id: getCatId('vegetable'), name_en: 'Morning Glory',    name_km: 'ត្រពាំងរាំ',   slug: 'morning-glory', icon: '🌿'},
    {parent_id: getCatId('vegetable'), name_en: 'Eggplant',         name_km: 'វែង',           slug: 'eggplant',      icon: '🍆'},
    {parent_id: getCatId('vegetable'), name_en: 'Cabbage',          name_km: 'ស្ពៃក្តោប',    slug: 'cabbage',       icon: '🥬'}
  ]);

  // Default Admin
  const [adminUser] = await knex('users').insert({
    phone: '+85500000000',
    password_hash: '$2b$10$abcdefghijklmnopqrstuvw', // Needs real hash
    name: 'Admin',
    role: 'admin',
    is_verified: true,
    is_active: true
  }).returning('id');

  await knex('admins').insert({
    user_id: adminUser.id
  });
};
