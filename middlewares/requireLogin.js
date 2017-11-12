module.exports = (req, res, next) => {
  if(!req.user) {
    return res.status(401).send({error: 'You have to be logged in for adding a credit.'});
  }

  next();

};

//we don't import this middleware in index.js like we do with passport or express
//because we only want to let the middleware make its check on specific routes
//in this case  the billingRoute.js