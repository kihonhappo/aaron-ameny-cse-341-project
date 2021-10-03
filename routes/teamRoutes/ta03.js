//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const file = './json/items.json';
let items = [];
let term = 'Ocean';
let org_data = [];
let sys_error = '';
let terms = [];

  const fs = require('fs');
  fs.readFile(file, (err, data) => {
      if (err) {
          sys_error = err;
      } 
      else{
          org_data = JSON.parse(data);
          
      }
    });

router.get('/', (req, res, next) => {

  res.render('pages/team/ta03', {
    title: 'Team Activity 03',
    path: '/ta03', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    items: items
  });
});

router.post('/', (req, res, next) => {
  term = req.body.tag;
  items = org_data.filter(function(x){
    x.tags.forEach(function(tag){
      
    });
    x.tags.indexOf(term.toLowerCase()) > -1;
  });
  res.redirect('/ta03'); 
});

module.exports = router;
