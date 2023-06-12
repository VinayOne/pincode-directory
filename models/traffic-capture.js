const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	ip: String,
    country: String,
	datetime: Date
});

module.exports = mongoose.model("traffic-capture", Schema);