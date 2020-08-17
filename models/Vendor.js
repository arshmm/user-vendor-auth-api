const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
