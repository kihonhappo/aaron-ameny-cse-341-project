const path = require('path');
const express = require('express');
const adminController = require('../../controllers/admin');
const isAuth = require('../../middleware/is-auth');
const router = express.Router();

router.get('/', adminController.getAdmin);
router.get('/add-product', isAuth, adminController.getAddProduct);
router.post('/add-product', isAuth, adminController.postAddProduct);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.get('/copy-product/:productId', isAuth, adminController.getCopyProduct);
router.get('/delete-product/:productId', isAuth, adminController.getDeleteProduct);
router.post('/edit-product', isAuth, adminController.postEditProduct);

router.get('/inventory', isAuth, adminController.getProducts);
router.get('/users', isAuth, adminController.getUsers);



module.exports = router;
