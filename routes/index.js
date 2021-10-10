
const routes = require('express').Router();
const nodePages = require('./nodeRoutes');
const provePages = require('./proveRoutes');
const teamPages = require('./teamRoutes');
const shopPages = require('./shopRoutes');
const adminPages = require('./adminRoutes'); // So we can run on heroku || (OR) localhost:5000
const errorController = require('../controllers/error');
//const ta01Routes = require('./teamRoutes/ta01');
routes
  .use('/node', nodePages)
  .use('/prove', provePages)
  .use('/shopPages', shopPages)
  .use('/adminPages', adminPages)
  .use('/teamPages', teamPages)
  
  .get('/', (req, res, next) => {
    // This is the primary index, always handled last.
    res.render('pages/index', {
      title: 'Welcome to my CSE341 repo',
      path: '/',
    });
  })
  .use(errorController.get404);
  
 module.exports = routes;
