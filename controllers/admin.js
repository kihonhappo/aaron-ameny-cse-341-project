const Product = require('../models/product');
const User = require('../models/user');
const {validationResult} = require('express-validator/check');

exports.getAdmin = (req, res, next) => {
  res.render('pages/adminPages/admin', {
    title: 'Admin',
    path: 'Admin', // For pug, EJS
    activeAdmin: true, // For HBS
    contentCSS: true, // For HBS
    user: req.user
    
  });
};

exports.getUsers = (req, res, next) => {
  User
  .find()
  .select('_id email name')
  .lean()
    .then(users => {

      res.render('pages/adminPages/users', {
        users: users,
        title: 'User Manager',
        path: '/users'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({userId: req.user._id})
  .select('_id title category price description quantity image userId')
  .lean()
    .then(products => {
      res.render('pages/adminPages/inventory', {
        prods: products,
        title: 'Inventory',
        path: '/inventory'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.getAddProduct = (req, res, next) => {
  
  res.render('pages/adminPages/add-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    edit: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.getCopyProduct = (req, res, next) => {
  
  const prodId = req.params.productId;
  //console.log('Inside of getEditProduct: prodID: ' + prodId);
  Product.findById(prodId)
    .then(product_copy => {
      if (!product_copy) {
        return res.redirect('/adminPages/admin/inventory');
      }

      const title = product_copy.title;
      const image = product_copy.image;
      const price = product_copy.price;
      const description = product_copy.description;
      const category = product_copy.category;
      const quantity = product_copy.quantity;
      const product = new Product({
        title: title,
        price: price,
        description: description,
        category: category,
        quantity: quantity,
        image: image,
        userId: req.user
      });
        product
          .save()
          .then(result => {
            // console.log(result);
           // console.log('Created Product');
            res.redirect('/adminPages/admin/inventory');
          })
          .catch(err => {
            console.log(err);
          });
      
     })
     .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCopyProducts = (req, res, next) => {
  
  const prods = req.params.prods;
 // console.log('Inside of getCopyProducts: prodID: ' + prods);
  prods.foreach
  Product.findById(prodId)
    .then(product_copy => {
      if (!product_copy) {
        return res.redirect('/adminPages/admin/inventory');
      }

      const title = product_copy.title;
      const image = product_copy.image;
      const price = product_copy.price;
      const description = product_copy.description;
      const category = product_copy.category;
      const quantity = product_copy.quantity;
      const product = new Product(
        title,
        price,
        description,
        category,
        quantity,
        image,
        null,
        req.user._id
        );
        product
          .save()
          .then(result => {
            // console.log(result);
            //console.log('Created Product');
            res.redirect('/adminPages/admin/inventory');
          })
          .catch(err => {
            console.log(err);
          });
      
     })
     .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postAddProduct = (req, res, next) => {
  //console.log('Inside of Post add product: user: ' + JSON.stringify(req.user));
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('pages/adminPages/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      edit: true,
      hasError: true,
      product: {
        title: title,
        image: image,
        price: price,
        description: description,
        category: category,
        quantitiy: quantity,
        userId: req.user
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  const product = new Product({
    title: title,
    image: image,
    price: price,
    description: description,
    category: category,
    quantity: quantity,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
     // console.log('Created Product');
      res.redirect('/adminPages/admin/inventory');
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/adminPages/admin/inventory');
  }
  const prodId = req.params.productId;
  //console.log('Inside of getEditProduct: prodID: ' + prodId);
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/adminPages/admin/inventory');
      }
      res.render('pages/adminPages/edit-product', {
        pageTitle: 'Edit Product',
        path: '/edit-product',
        edit: editMode,
        product: product,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const image = req.body.image;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render('pages/adminPages/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      edit: true,
      hasError: true,
      product: {
        title: title,
        image: image,
        price: price,
        description: description,
        category: category,
        quantitiy: quantity,
        productId: prodId,
        userId: req.user
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  } 

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      
      product.title = title;
      product.price = price;
      product.description = description;
      product.category = category;
      product.quantity = quantity;
      product.image = image;
      return product.save().then(result => {
        // console.log('UPDATED PRODUCT!');
         res.redirect('/adminPages/admin/inventory');
       });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
/*
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('pages/adminPages/inventory', {
        prods: products,
        title: 'Inventory',
        path: '/inventory'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
*/

exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId; 
  Product.findByIdAndRemove(prodId)
    .then(() => {
      //console.log('DESTROYED PRODUCT');
      res.redirect('/adminPages/admin/inventory');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id})
    .then(() => {
      //console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
