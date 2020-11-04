const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type:String,
		required:[true, 'Username can not be blank!']
	} ,
	password: {
		type:String,
		required:[true, 'Password can not be blank!']
	},
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);