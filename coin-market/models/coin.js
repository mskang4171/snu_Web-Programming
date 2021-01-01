const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// xrp, 리플이라는 코인이 있는데, xrp

const Coin = mongoose.model("Coin", {
  code: String,
  active: Boolean,
});

module.exports = {
  Coin,
};

// signup
// signin
