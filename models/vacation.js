const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/modernsite');

const vacationSchema = new mongoose.Schema({
	title: String,
	image: String,
	price: String,
	description: String,
	});

const Vacation = mongoose.model("Vacation", vacationSchema)
module.exports = mongoose.model("Vacation", vacationSchema);