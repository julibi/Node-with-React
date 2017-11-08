const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/key");
require("../models/User");
const User = mongoose.model("users");

//take user model and put identifying info into a cookie
passport.serializeUser((user, done) => {
  //user.id is NOT the profile.id
  //but instead is the shortcut to mongos auto-generated ID
  //after user hs signed in with profile.id we don't care about it anymore
  //we only care about our homemade user.id for rest of the app flow
  done(null, user.id);
});

//pull the info back out and return the user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //this query returns a promise
     const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          //we already have a record with the given profile id
          //done tells passport we are done
          done(null, existingUser);
        } else {
          const user = await new User({ googleId: profile.id }).save()
            //'user' is the fresh instance of 'User'
            //and is what we use up in serializeUser
            done(null, user);
        }
    }
  )
);
