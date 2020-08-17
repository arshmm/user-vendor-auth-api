const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//user model
const User = require("../models/User");

//register handle
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const errors = [];
  if (!username || !password) {
    errors.push({ status: 2, msg: "please enter all credentials " });
  }
  if (password.length < 6) {
    errors.push({
      status: 2,
      msg: "Password not long enough Password should be atleast 6 character",
    });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.json(errors);
  } else {
    User.findOne({ username: username }).then((user) => {
      if (user) {
        //username exists
        errors.push({
          status: 2,
          msg: " username already exists",
        });
        res.json(errors);
      } else {
        const newUser = new User({
          username: username,
          password: password,
        });
        //hasing the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed password
            newUser.password = hash;
            //saving the user
            newUser
              .save()
              .then((user) => {
                res.json("done");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login handle
router.post("/login", passport.authenticate("user-local"), (req, res) => {
  const response = {
    RESPONNSE: res.statusCode,
    STATUS: 1,
  };
  res.json(response);
});

module.exports = router;
