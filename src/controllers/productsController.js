// src/controllers/productsController.js
const fs = require('fs');
const path = require('path');
const products = require('../data/products');

const createProduct = (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = { id: products.length + 1, name, price, description };
  products.push(newProduct);
  saveProductsToFile();
  res.status(201).json(newProduct);
};

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

const saveProductsToFile = () => {
  const filePath = path.join(__dirname, '../data/products.json');
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
