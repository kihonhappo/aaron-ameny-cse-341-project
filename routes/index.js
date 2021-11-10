
const routes = require('express').Router();
const nodePages = require('./nodeRoutes');
const provePages = require('./proveRoutes');
const teamPages = require('./teamRoutes');
const shopPages = require('./shopRoutes');
const adminPages = require('./adminRoutes'); // So we can run on heroku || (OR) localhost:5000
const authPages = require('./authRoutes');
const errorController = require('../controllers/error');
//const ta01Routes = require('./teamRoutes/ta01');
routes
  .use('/node', nodePages)
  .use('/prove', provePages)
  .use('/shopPages', shopPages)
  .use('/adminPages', adminPages)
  .use('/teamPages', teamPages)
  .use('/authPages', authPages)
  
  .get('/', (req, res, next) => {
    // This is the primary index, always handled last.
    
    
    res.render('pages/index', {
      title: "WELCOME to Dina's Bling Shop! ",
      path: '/',
      isAuthenticated: req.session.isLoggedIn
    });
  })

  .get('/500', errorController.get500)
  .use(errorController.get404);
  
 module.exports = routes;
