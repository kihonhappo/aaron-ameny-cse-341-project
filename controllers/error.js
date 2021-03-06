exports.get404 = (req, res, next) => {
  res.render('pages/404', { 
    title: '404 - Page Not Found', 
    path: req.url,
    isAuthenticated: req.session.isLoggedIn 
  });
  
};

exports.get500 = (req, res, next) => {
  res.render('pages/500', { 
    title: '500 - Page Not Found', 
    path: req.url,
    isAuthenticated: req.session.isLoggedIn 
  });
  
};
