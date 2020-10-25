const express = require("express");
const router = express.Router();

router.get("/packages", (req, res) => {
	res.render("packages");
});


module.exports = router;