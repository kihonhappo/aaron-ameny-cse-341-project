const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);


/*
const fs = require('fs');
const path = require('path');
const mongo_db = require('mongodb');
const getDb = require('../util/database').getDb;

class Product{
  constructor(title, price, description, category, quantity, image, shop, _id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.category = category;
    this.quantity = quantity;
    this.image = image;
    this.shop = shop;
    this._id = _id;
  }

  save(){
    const db = getDb();
    let dbOp;
    if(this._id){

      dbOp = db
        .collection('products')
        .updateOne({_id: new mongo_db.ObjectId(this._id)}, {$set: {
          title: this.title, price: this.price, description: this.description, category: this.category, quantity: this.quantity, image: this.image}});
    }
    else{
      dbOp = db.collection('products').insertOne(this);
    }
    
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
  static fetchCats(cb) {
    const db = getDb();
    return db
      .collection('products')
      .find().map(function(x){
        return x.category;
      })
      .toArray()
      .then(cats => {
        //console.log(products);
        return cats;
      })
      .catch(err => {
        console.log(err);
      });
  }
  static fetchAll(cb) {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        //console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongo_db.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongo_db.ObjectId(prodId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteBatch(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteMany({ _id: new mongo_db.ObjectId(prodId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};*/
