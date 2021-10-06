
const routes = require('express').Router();
const nodePages = require('./nodeRoutes');
const provePages = require('./proveRoutes');
const teamPages = require('./teamRoutes');
const shopPages = require('./shopRoutes'); // So we can run on heroku || (OR) localhost:5000
//const ta01Routes = require('./teamRoutes/ta01');
routes
  .use('/node', nodePages)
  .use('/prove', provePages)
  .use('/shopPages', shopPages)
  .use('/teamPages', teamPages)
  
  .get('/', (req, res, next) => {
    // This is the primary index, always handled last.
    res.render('pages/index', {
      title: 'Welcome to my CSE341 repo',
      path: '/',
    });
  })
  .use((req, res, next) => {
    // 404 page
    res.render('pages/404', { title: '404 - Page Not Found', path: req.url });
  })
  
 module.exports = routes;
