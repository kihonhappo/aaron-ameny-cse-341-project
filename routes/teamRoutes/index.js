
const routes = require('express').Router();
//console.log('teamRoutes index.js');
//const ta01 = require('./ta01');
//const ta02 = require('./ta02');
//const ta03 = require('./ta03');
//const ta04 = require('./ta04');
routes
    //.use('/ta01', ta01)
    //.use('/ta02', ta02)
    .use('/ta01', require('./ta01'))
    .use('/ta02', require('./ta02'))
    .use('/ta03', require('./ta03'))
    .use('/ta04', require('./ta04'))
    .get('/', (req, res, next) => {
    // This is the primary index, always handled last.
        res.render('pages/teamPages/', {
          title: 'W01 Team Activities',
          path: '/teamPages',
        });
  })
  
  
 module.exports = routes;
