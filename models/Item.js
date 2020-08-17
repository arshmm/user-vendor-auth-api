const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  vendor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
