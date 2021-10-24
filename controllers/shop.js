const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

exports.getCats = (req, res, next) => {
  Product.distinct('category')
    .then(cats => {
    res.render('pages/shopPages/shop', {
      title: 'Categories',
      path: '/shop', // For pug, EJS
      cats: cats,
      isAuthenticated: req.session.isLoggedIn
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};

exports.getProductsCat = (req, res, next) => {
  const cat = req.params.cat;
  //console.log('Inside of getProductsCat: ' + cat);
  Product.find({categor: cat })
    .then(products => {
      products = products.filter(x => x.category == cat);
      res.render('pages/shopPages/products', {
        prods: products,
        title: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
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
      path: '/product-detail', // For pug, EJS
      cats: cats,
      isAuthenticated: req.session.isLoggedIn
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
      path: '/checkout', // For pug, EJS
      cats: cats
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};
/*
exports.getOrders = (req, res, next) => {
  Product.fetchCats()
    .then(cats => {
    res.render('pages/shopPages/shop/orders', {
      title: 'Orders',
      path: '/order', // For pug, EJS
      orders: cats
      
    });
  })
  .catch(err => {
    console.log(err);
  });
  
};*/

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('pages/shopPages/products', {
        prods: products,
        title: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
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
 /*  Product.fetchAll()
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
        path: '/product-detail',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
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
  //console.log(req.user.cart.items.length);
  req.user
  .populate('cart.items.productId')
  .then(user => {
    const products = user.cart.items;
      res.render('pages/shopPages/cart', {
        path: '/cart',
        title: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn
      })
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
      //console.log(result);
      res.redirect('/shopPages/shop/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/shopPages/shop/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
  .populate('cart.items.productId')
  .then(user => {
    const products = user.cart.items.map(i => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user
      },
      products: products
    });
    return order.save();
  })
  .then(result => {
    return req.user.clearCart();
  })
  .then(() => {
      res.redirect('/shopPages/shop/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
     // console.log('Get Orders: ' + JSON.stringify(orders));
      res.render('pages/shopPages/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
