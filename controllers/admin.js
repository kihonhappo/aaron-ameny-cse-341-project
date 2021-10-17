const Product = require('../models/product');

exports.getAdmin = (req, res, next) => {
  res.render('pages/adminPages/admin', {
    title: 'Admin',
    path: 'Admin', // For pug, EJS
    activeAdmin: true, // For HBS
    contentCSS: true // For HBS
    
  });
};


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('pages/adminPages/inventory', {
        prods: products,
        title: 'Inventory',
        path: 'inventory',
      });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getAddProduct = (req, res, next) => {
  res.render('pages/adminPages/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getCopyProduct = (req, res, next) => {
  
  const prodId = req.params.productId;
  console.log('Inside of getEditProduct: prodID: ' + prodId);
  Product.findById(prodId)
    .then(product_copy => {
      if (!product_copy) {
        return res.redirect('/adminPages/inventory');
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
            res.redirect('/adminPages/inventory');
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
        return res.redirect('/adminPages/inventory');
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
            res.redirect('/adminPages/inventory');
          })
          .catch(err => {
            console.log(err);
          });
      
     })
     .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;
  const quantity = req.body.quantity;
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
      res.redirect('/adminPages/inventory');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/adminPages/inventory');
  }
  const prodId = req.params.productId;
  console.log('Inside of getEditProduct: prodID: ' + prodId);
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/adminPages/inventory');
      }
      res.render('pages/adminPages/edit-product', {
        pageTitle: 'Edit Product',
        path: '/adminPages/edit-product',
        edit: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const _id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const category = req.body.category;
  const description = req.body.description;
  const quantity = req.body.quantity;
  const image = req.body.image;
  
  const product = new Product(
    title,
    price,
    description,
    category,
    quantity,
    image,
    _id
  );
  product
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/adminPages/inventory');
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
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/adminPages/inventory');
    })
    .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
