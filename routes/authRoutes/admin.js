const path = require('path');
const express = require('express');
const adminController = require('../../controllers/admin');
const router = express.Router();

router.get('/', adminController.getAdmin);
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product/:productId', adminController.postEditProduct);




module.exports = router;
