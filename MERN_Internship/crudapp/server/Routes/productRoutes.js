const express = require('express');
const { createProduct, getProducts, getProductById, deleteProductById, updateProduct } = require('../Controller/productController');

const route = express.Router();

route.post('/createProduct', createProduct);
route.get('/getProducts', getProducts);
route.get('/getProductById/:id', getProductById);
route.delete('/deleteProductById/:id', deleteProductById);
route.put('/updateProduct/:id', updateProduct);

module.exports = route;