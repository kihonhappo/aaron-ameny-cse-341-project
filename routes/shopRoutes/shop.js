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
      prods: prods
      
    });
  });
  
});

router.post('/add-product', (req, res, next) => {
  
  let user = users.filter(x => req.body.username === x.username)[0];
  if(user === undefined ){
    users.push({username: req.body.username});
  }
  else{
    error_msg = 'Username already exists!';
  }
  
  res.redirect('/teamPages/ta02');
});

module.exports = router;
