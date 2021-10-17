const express = require('express');
const router = express.Router();
const Fetcher = require('../../objects/fetcher');
const fetch = new Fetcher('./data/products.json');
const shopController = require('../../controllers/shop');
let prods = [];


router.get('/', shopController.getCats);
router.get('/products', shopController.getProducts);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckOut);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/product-detail/:productId', shopController.getProduct);

module.exports = router;
