const express = require('express');
const router = express.Router();
console.log('teamRoutes tao1.js');
router.get('/', (req, res, next) => {
  res.render('pages/teamPages/ta01', {
    title: 'Team Activity 01',
    path: 'ta01', // For pug, EJS
    activeTA01: true, // For HBS
    contentCSS: true // For HBS
    
  });
});


module.exports = router;
