const productService = require('./product.service');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProductDetail = async (req, res) => {
  try {
    const product = await productService.getProductDetail(req.params.id);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.addProduct(req.body, req.user.id);
    res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.editProduct(req.params.id, req.body, req.user.id);
    res.json({ success: true, data: product, message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.removeProduct(req.params.id, req.user.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct
};
