const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//vendor model
const Vendor = require("../models/Vendor");
const Item = require("../models/Item");

router.get("/list", (req, res) => {
  Item.find((err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.json(item);
    }
  });
});

router.post("/list", (req, res) => {
  const newItem = new Item({ ...req.body });
  newItem.save();
  res.send("item added");
});

//register handle
router.post("/register", (req, res) => {
  const { number, password } = req.body;
  const errors = [];
  if (!number || !password) {
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
    Vendor.findOne({ number: number }).then((vendor) => {
      if (vendor) {
        //username exists
        errors.push({
          status: 2,
          msg: " username already exists",
        });
        res.json(errors);
      } else {
        const newVendor = new Vendor({
          number: number,
          password: password,
        });
        //hasing the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newVendor.password, salt, (err, hash) => {
            if (err) throw err;
            //set password to hashed password
            newVendor.password = hash;
            //saving the user
            newVendor
              .save()
              .then((vendor) => {
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
router.post("/login", passport.authenticate("vendor-local"), (req, res) => {
  const response = {
    RESPONNSE: res.statusCode,
    STATUS: 1,
  };
  res.json(response);
});

module.exports = router;
