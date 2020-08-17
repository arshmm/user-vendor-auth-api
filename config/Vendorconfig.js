const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//loading vendor model
const { Vendor } = require("../models/");
module.exports = function (passport) {
  passport.use(
    "vendor-local",
    new LocalStrategy(
      { usernameField: "number" },
      (username, password, done) => {
        //matching user
        Vendor.findOne({ number: username })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "no user exists" });
            }
            //matching password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                return done(null, user);
              } else {
                done(null, false, { message: "incorrect password" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    if (typeof id)
      User.findById(id, (err, user) => {
        done(err, user);
      });
  });
};
