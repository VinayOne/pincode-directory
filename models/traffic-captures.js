const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { timestamp } = require("rxjs");

const Schema = mongoose.Schema({
	ip: String,
	pnr: String
}, 
{
	timestamps: { createdAt: 'addedAt', updatedAt: 'modifiedAt' },
});

module.exports = mongoose.model("traffic-captures", Schema);