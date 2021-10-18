const express = require('express');
const router = express.Router();
const Fetcher = require('../../objects/fetcher');
const fetch = new Fetcher('./data/products.json');
const shopController = require('../../controllers/shop');
const { render } = require('pug');
let prods = [];


router.get('/', shopController.getCats);
router.get('/products', shopController.getProducts);
router.get('/products-cat/:cat', shopController.getProductsCat);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckOut);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/product-detail/:productId', shopController.getProduct);
router.post('/cart-delete-item/', shopController.postCartDeleteProduct)
router.post('/create-order', shopController.postOrder);

module.exports = router;
