const express = require('express');
const router = express.Router();
console.log('shopRoutes shop01.js');
router.get('/', (req, res, next) => {
  res.render('pages/shop/shop01', {
    title: 'Shop 01',
    path: 'shop01', // For pug, EJS
    activeShop01: true, // For HBS
    contentCSS: true // For HBS
    
  });
});


module.exports = router;
