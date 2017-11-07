const express = require('express');
require('./services/passport');
const mongoose = require('mongoose');
const keys = require('./config/key');
const app = express();

mongoose.connect(keys.mongoURI);

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

