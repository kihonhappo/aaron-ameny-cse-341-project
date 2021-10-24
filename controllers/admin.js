const Product = require('../models/product');
const User = require('../models/user');

exports.getAdmin = (req, res, next) => {
  res.render('pages/adminPages/admin', {
    title: 'Admin',
    path: 'Admin', // For pug, EJS
    activeAdmin: true, // For HBS
    contentCSS: true, // For HBS
    user: req.user,
    isAuthenticated: req.session.isLoggedIn
    
  });
};

exports.getUsers = (req, res, next) => {
  User
  .find()
    .then(users => {
      res.render('pages/adminPages/users', {
        users: users,
        title: 'User Manager',
        path: '/users',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('pages/adminPages/inventory', {
        prods: products,
        title: 'Inventory',
        path: '/inventory',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getAddProduct = (req, res, next) => {
  res.render('pages/adminPages/add-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getCopyProduct = (req, res, next) => {
  
  const prodId = req.params.productId;
  console.log('Inside of getEditProduct: prodID: ' + prodId);
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
            console.log('Created Product');
            res.redirect('/adminPages/admin/inventory');
          })
          .catch(err => {
            console.log(err);
          });
      
     })
     .catch(err => console.log(err));
};

exports.getCopyProducts = (req, res, next) => {
  
  const prods = req.params.prods;
  console.log('Inside of getCopyProducts: prodID: ' + prods);
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
            console.log('Created Product');
            res.redirect('/adminPages/admin/inventory');
          })
          .catch(err => {
            console.log(err);
          });
      
     })
     .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  console.log('Inside of Post add product: user: ' + JSON.stringify(req.user));
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  const quantity = req.body.quantity;
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
      console.log('Created Product');
      res.redirect('/adminPages/admin/inventory');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/adminPages/admin/inventory');
  }
  const prodId = req.params.productId;
  console.log('Inside of getEditProduct: prodID: ' + prodId);
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
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const image = req.body.image;
  
  Product.findById(prodId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.category = category;
      product.quantity = quantity;
      product.image = image;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/adminPages/admin/inventory');
    })
    .catch(err => console.log(err));
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
    .catch(err => console.log(err));
};
*/

exports.getDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId; 
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/adminPages/admin/inventory');
    })
    .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
