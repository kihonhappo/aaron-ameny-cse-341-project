const path = require('path');
const express = require('express');
const {check, body} = require('express-validator/check');
const adminController = require('../../controllers/admin');
const isAuth = require('../../middleware/is-auth');
const router = express.Router();

router.get('/', isAuth, adminController.getAdmin);
router.get('/add-product', isAuth, adminController.getAddProduct);
router.post('/add-product',
[
  body('title')
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body('image').isURL(),
  body('price').isFloat(),
  body('description')
    .isLength({ min: 5, max: 1000 })
    .trim()
], isAuth, adminController.postAddProduct);
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
router.get('/copy-product/:productId', isAuth, adminController.getCopyProduct);
router.get('/delete-product/:productId', isAuth, adminController.getDeleteProduct);
router.post('/edit-product',
[
  body('title')
    .isString()
    .isLength({ min: 3 })
    .trim(),
  body('image').isURL(),
  body('price').isFloat(),
  body('description')
    .isLength({ min: 5, max: 400 })
    .trim()
], isAuth, adminController.postEditProduct);

router.get('/inventory', isAuth, adminController.getProducts);
router.get('/users', isAuth, adminController.getUsers);



module.exports = router;
