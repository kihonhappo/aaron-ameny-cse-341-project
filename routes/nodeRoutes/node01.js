const express = require('express');
const router = express.Router();
//console.log('shopRoutes shop01.js');
router.get('/', (req, res, next) => {
  res.render('pages/node/node01', {
    title: 'Node 01',
    path: 'node01', // For pug, EJS
    activeShop01: true, // For HBS
    contentCSS: true // For HBS
    
  });
});


module.exports = router;
