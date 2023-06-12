const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	ip: String,
    country: String,
	datetime: String
});

module.exports = mongoose.model("traffic-captures", Schema);