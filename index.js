
// Our initial setup (package requires, port number setup)
const cors = require('cors');

const corsOptions = {
  origin: "https://aaron-ameny-cse-341-project.herokuapp.com/",
  optionsSuccessStatus: 200,
  SameSite: 'None'
}

const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const path = require('path');
const routes = require('./routes');
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000
//console.log('index.js');
//const mongodb = require('mongodb');
//const { mongo } = require('mongoose');
//const MongoClient = mongodb.MongoClient;
const mongoConnect = require('./util/database').mongoConnect;
//const mongoose = require('mongoose');
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

/*mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
     // This should be your user handling code implement following the course videos
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });*/
  

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser({ extended: false })) // For parsing the body of a POST
  //.use('/ta01', ta01Routes)
  .use('/', routes)
  
  //.listen(PORT, () => console.log(`Listening on ${PORT}`));
  
  mongoConnect(() => {
    //console.log(client);
    //app.listen(5000);
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }); 
  