const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  roundStatus: {
    type: String,
    default: "inactive"
  },
});

module.exports = User = mongoose.model("User", schema);
