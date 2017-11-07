const mongoose = require('mongoose');
const { Schema } = mongoose;
//same as this:
//const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);