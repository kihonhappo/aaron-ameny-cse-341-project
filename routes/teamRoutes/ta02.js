//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

let users = [
  {username: 'kihonhappo'},
  {username: 'jspense'},
  {username: 'jbrooke'},
  {username: 'wbrown'},
  {username: 'dmguevara'}
]

let error_msg = 'Test';

router.get('/', (req, res, next) => {
  res.render('pages/teamPages/ta02', {
    title: 'Team Activity 02',
    path: 'teampages/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    userList: users,
    userError: error_msg
  });
});

router.post('/addUser', (req, res, next) => {
  let user = users.filter(x => req.body.username === x.username)[0];
  if(user === undefined ){
    users.push({username: req.body.username});
  }
  else{
    error_msg = 'Username already exists!';
  }
  
  res.redirect('/ta02');
});

router.post('/removeUser', (req, res, next) => {
  let user = users.filter(x => req.body.username === x.username)[0];
  if(user === undefined ){
    error_msg = 'Username is Not here right now!';
  }
  else{
    users = users.filter(x => req.body.username != x.username);
  }
  
  res.redirect('/ta02');
});

module.exports = router;
