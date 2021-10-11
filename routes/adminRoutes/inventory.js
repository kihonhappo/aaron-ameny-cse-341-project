const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin');
const Fetcher = require('../../objects/fetcher');
const fetch = new Fetcher('./data/products.json');
let prods = [];


router.get('/', adminController.getProducts);
/*router.get('/', (req, res, next) => {
  fetch.loadJSON(prods => {
    res.render('pages/adminPages/inventory', {
      title: 'Inventory',
      path: 'inventory', // For pug, EJS
      activeProducts: true, // For HBS
      contentCSS: true,
      prods: prods
      
    });
  });
});*/


module.exports = router;
