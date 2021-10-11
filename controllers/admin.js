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
    null
    
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
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    prodId
  );
  product
    .save()
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

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

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
