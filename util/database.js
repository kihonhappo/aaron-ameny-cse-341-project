const mongodb = require('mongodb');
//const { mongo } = require('mongoose');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://kihonhappo:popeye50$@cluster0.3yxeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

    .then(client => {
        console.log('Connected');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports.mongoConnect;