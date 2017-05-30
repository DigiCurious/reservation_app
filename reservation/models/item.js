var mongoose = require("mongoose");

var itemSchema = mongoose.Schema({
    title: String,
    category: String,
    priceHour: Number,
});

module.exports = mongoose.model("Item", itemSchema);