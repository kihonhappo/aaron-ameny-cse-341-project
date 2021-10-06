//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();

const file = './data/items.json';
let items = [];
let term = 'Ocean';
let org_data = [];
let sys_error = '';
let terms = [];

  const fs = require('fs');
  fs.readFile(file, (err, data) => {
      if (err) {
          sys_error = err;
          console.log('Page load Org Data Error: ' + sys_error);
      } 
      else{
          org_data = JSON.parse(data);
          console.log('Page load Org Data Success: ' + org_data.length);
      }
    });
    
router.get('/', (req, res, next) => {
  console.log('Get ta03');
  res.render('pages/teamPages/ta03', {
    title: 'Team Activity 03',
    path: '/ta03', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    items: items
  });
});

router.post('/', (req, res, next) => {
  console.log('Post ta03');
  term = req.body.tag;
  console.log('Term: ' + term);
  items = [];
  org_data.forEach(function(x){
    let in_arr = false;
    x.tags.forEach(function(tag){
      
      if(tag.toLowerCase().indexOf(term.toLowerCase()) > -1){
        in_arr = true;
      }
    });
    if(in_arr == true){
      items.push(x);
    }
    //if(x.tags.indexOf(term.toLowerCase()) > -1){
      //items.push(x);
    //}
  });
  console.log('Items load: ' + items.length);
  //items = org_data.filter(x => x.tags.indexOf(term.toLowerCase()) > -1});
  //items = org_data.filter(function(x){
    //x.tags.forEach(function(tag){
      
   // });
    
  //});
  res.redirect('/teamPages/ta03'); 
});

module.exports = router;
