require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();

//Passport config
require("./config/Userconfig")(passport);
require("./config/Vendorconfig")(passport);

//DB config
/* const db = require("./config/keys").MongoURI;
 */
//connect mongo
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//express session
app.use(
  session({
    secret: "blabluble",
    resave: true,
    saveUninitialized: true,
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/vendor", require("./routes/vendor"));

//-------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
