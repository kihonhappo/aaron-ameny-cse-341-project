const Product = require('../models/product');


exports.getCats = (req, res, next) => {
  Product.fetchCats()
    .then(cats => {
    res.render('pages/shopPages/shop', {
      title: 'Shop',
      path: 'shop', // For pug, EJS
      cats: cats
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getProductDetail = (req, res, next) => {
  Product.fetchCats()
    .then(cats => {
    res.render('pages/shopPages/product-detail', {
      title: 'Product Details',
      path: 'product-detail', // For pug, EJS
      cats: cats
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getCheckOut = (req, res, next) => {
  Product.fetchCats()
    .then(cats => {
    res.render('pages/shopPages/checkout', {
      title: 'Checkout',
      path: 'checkout', // For pug, EJS
      cats: cats
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getOrders = (req, res, next) => {
  Product.fetchCats()
    .then(cats => {
    res.render('pages/shopPages/orders', {
      title: 'Orders',
      path: 'order', // For pug, EJS
      orders: cats
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('pages/shopPages/products', {
        prods: products,
        title: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

/*exports.getCart = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('pages/shopPages/cart', {
        prods: products,
        title: 'Cart',
        path: '/cart'
      });
    })
    .catch(err => {
      console.log(err);
    });
};*/


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  /* Product.findAll({ where: { id: prodId } })
     .then(products => {
       res.render('shop/product-detail', {
         product: products[0],
         pageTitle: products[0].title,
         path: '/products'
       });
     })
     .catch(err => console.log(err));*/
  Product.findById(prodId)
    .then(product => {
      res.render('pages/shopPages/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/product-detail'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};


exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('pages/shopPages/cart', {
        path: '/cart',
        title: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};
