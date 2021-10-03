
const nodeRoutes = require('express').Router();

nodeRoutes.use('/01', require('./w01'))
  .get('/', (req, res, next) => {
    // This is the primary index, always handled last.
    res.render('pages/', {
      title: 'Welcome to my CSE341 repo',
      path: '/',
    });
  })
  .use((req, res, next) => {
    // 404 page
    res.render('pages/404', { title: '404 - Page Not Found', path: req.url });
  })
  
 module.exports = routes;
