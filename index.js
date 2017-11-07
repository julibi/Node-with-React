const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
require ('./services/passport');
require ('./models/User');

mongoose.connect(keys.mongoURI);

const app = express();

//in general: app.use is applying middleware to our request
//each middleware - in this case: passport, cookieSession
//modify the request  little bit, before forwarding it to
//post, get, delete, put or patch produces the response
app.use(
  cookieSession({
    //30 days until the cookie  automatically expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//tell passport it should use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

