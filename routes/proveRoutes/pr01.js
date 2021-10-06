const express = require('express');
const router = express.Router();
//console.log('proveRoutes pr01.js');

const fs = require('fs');
const users = [
    {name: 'Aaron Ameny', username: 'kihonhappo', status: 'Active'},
    {name: 'Jennifer Spencer', username: 'jspense', status: 'Active'},
    {name: 'John Brooke', username: 'jbrooke', status: 'Blocked'},
    {name: 'Will Brown', username: 'wbrown', status: 'Active'},
    {name: 'Dina Moreno Guevara', username: 'dmguevara', status: 'Blocked'}
]
router.get('/', (req, res, next) => {
  res.render('pages/prove/pr01', {
    title: 'Prove 01',
    path: 'pr01', // For pug, EJS
    activeShop01: true, // For HBS
    contentCSS: true,
    users: users  // For HBS
    
  });
});

router.post('/create-user', (req, res, next) => {
  let user = {};
  user.name = req.body.name;
  user.username = req.body.username;
  user.status = 'Pending';
  
  users.push(user);
  /*if(user === undefined ){
    users.push({username: req.body.username});
  }
  else{
    error_msg = 'Username already exists!';
  }*/
  
  res.redirect('/prove/pr01');
});






module.exports = router;
