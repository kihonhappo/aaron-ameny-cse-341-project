const express = require('express');
const router = express.Router();
const Fetcher = require('../../objects/fetcher');
const fetch = new Fetcher('./data/products.json');
const shopController = require('../../controllers/shop');
const isAuth = require('../../middleware/is-auth');
const { render } = require('pug');
let prods = [];


router.get('/', shopController.getCats);
router.get('/products', shopController.getProducts);
router.get('/products-cat/:cat', shopController.getProductsCat);
router.get('/orders', isAuth, shopController.getOrders);
router.get('/checkout', shopController.getCheckOut);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.get('/product-detail/:productId', shopController.getProduct);
router.post('/cart-delete-item/', isAuth, shopController.postCartDeleteProduct)
router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;
