const express = require("express");
const router = express.Router();
const Vacation = require("../models/vacation");


/* Vacations */
router.get("/packages",function (req,res){
	Vacation.find({}, function(err, allvacations){
		if(err){
			console.log(err);
		}else{
			res.render("packages",{Vacation:allvacations})
		}
	});
});

module.exports = router;