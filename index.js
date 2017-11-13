const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/key');
const bodyParser = require('body-parser');
require ('./services/passport');
require ('./models/User');
require('./models/Survey');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoute')(app);

if(process.env.NODE_ENV === 'production') {
  //Express will serve up production assets (main.css or mainx.js)
  app.use(express.static('client/build'));
  //Express will serve up the index.html file if it doesn't know the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

