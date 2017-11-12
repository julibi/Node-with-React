const keys = require('../config/key');
//this syntax is in the stripe docs!
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  //pass requireLogin here, don't invoke it, so
  //the function is only executed when post request runs
  //post, get, put etc. accept as many arguments as we want
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //req.body is made available to us by bodyparser
    //we need this to post data to a express server
    //console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    //req.user and user represent the same info but are completely different places in memory
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};