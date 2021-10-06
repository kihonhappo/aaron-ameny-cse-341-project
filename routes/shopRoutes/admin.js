const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/shopPages/admin', {
    title: 'Admin',
    path: 'Admin', // For pug, EJS
    activeAdmin: true, // For HBS
    contentCSS: true // For HBS
    
  });
});


module.exports = router;
