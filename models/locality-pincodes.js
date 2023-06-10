const mongoose = require("mongoose");

const Schema = mongoose.Schema({
	VillageLocality: String,
	PostOffice: String,
	Pincode: Number,
	SubDistrict: String,
	District: String,
	State: String
});

module.exports = mongoose.model("locality-pincodes", Schema);