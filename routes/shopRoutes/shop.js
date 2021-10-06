const express = require('express');
const router = express.Router();
const Fetcher = require('../../objects/fetcher');
const fetch = new Fetcher('./data/products.json');
let prods = [];



router.get('/', (req, res, next) => {
  fetch.loadJSON(prods => {
    res.render('pages/shopPages/shop', {
      title: 'Shop',
      path: 'shop', // For pug, EJS
      activeShop: true, // For HBS
      contentCSS: true,
      prods: prods // For HBS
      
    });
  });
  
});


module.exports = router;
