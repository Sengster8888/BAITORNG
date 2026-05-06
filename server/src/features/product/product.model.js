const db = require('../../database/db');

const getAllProducts = async (filters = {}) => {
  let query = db('products')
    .join('users', 'products.seller_id', 'users.id')
    .join('categories', 'products.category_id', 'categories.id')
    .join('provinces', 'products.province_id', 'provinces.id')
    .select(
      'products.*',
      'users.name as seller_name',
      'categories.name_en as category_name',
      'provinces.name_en as province_name'
    )
    .where('products.is_active', true);

  if (filters.category_id) {
    query = query.where('products.category_id', filters.category_id);
  }
  if (filters.province_id) {
    query = query.where('products.province_id', filters.province_id);
  }
  if (filters.seller_id) {
    query = query.where('products.seller_id', filters.seller_id);
  }

  return await query.orderBy('products.created_at', 'desc');
};

const getProductById = async (id) => {
  return await db('products')
    .join('users', 'products.seller_id', 'users.id')
    .join('categories', 'products.category_id', 'categories.id')
    .join('provinces', 'products.province_id', 'provinces.id')
    .select(
      'products.*',
      'users.name as seller_name',
      'categories.name_en as category_name',
      'provinces.name_en as province_name'
    )
    .where('products.id', id)
    .first();
};

const createProduct = async (productData) => {
  const [id] = await db('products').insert(productData).returning('id');
  return await getProductById(id.id || id);
};

const updateProduct = async (id, productData) => {
  await db('products').where({ id }).update(productData);
  return await getProductById(id);
};

const deleteProduct = async (id) => {
  return await db('products').where({ id }).update({ is_active: false });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
