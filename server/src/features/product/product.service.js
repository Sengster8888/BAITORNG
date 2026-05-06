const productModel = require('./product.model');

const getProducts = async (filters) => {
  return await productModel.getAllProducts(filters);
};

const getProductDetail = async (id) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

const addProduct = async (productData, sellerId) => {
  const data = {
    ...productData,
    seller_id: sellerId
  };
  return await productModel.createProduct(data);
};

const editProduct = async (id, productData, sellerId) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.seller_id !== sellerId) {
    throw new Error('Not authorized to edit this product');
  }
  return await productModel.updateProduct(id, productData);
};

const removeProduct = async (id, sellerId) => {
  const product = await productModel.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.seller_id !== sellerId) {
    throw new Error('Not authorized to delete this product');
  }
  return await productModel.deleteProduct(id);
};

module.exports = {
  getProducts,
  getProductDetail,
  addProduct,
  editProduct,
  removeProduct
};
