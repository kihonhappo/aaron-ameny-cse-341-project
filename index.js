/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling.
 * They're for information purposes only.
 *
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course.
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const cors = require('cors');

const corsOptions = {
  origin: "https://aaron-ameny-cse-341-project.herokuapp.com/",
  optionsSuccessStatus: 200,
  SameSite: 'None'
}

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
//console.log('index.js');
const mongoose = require('mongoose');
const app = express();
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
}

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://kihonhappo:popeye50$@cluster0.3yxeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });


// Route setup. You can implement more in the future!
//const ta01Routes = require('./routes/ta01');
/*const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');*/

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false })) // For parsing the body of a POST
  //.use('/ta01', ta01Routes)
  .use('/', routes)
  
  /*.use('/ta02', ta02Routes)
  .use('/ta03', ta03Routes)
  .use('/ta04', ta04Routes)
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
  })*/
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
