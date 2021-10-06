const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/shopPages/products', {
    title: 'Products',
    path: 'products', // For pug, EJS
    activeProducts: true, // For HBS
    contentCSS: true // For HBS
    
  });
});


module.exports = router;
