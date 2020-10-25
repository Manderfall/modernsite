// General Imports and setup //
const express = require ("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const methodOverride = require ("method-override");


// Express and Modules ------------------------------------------
const app = express();
app.use(express.static("public")); // js, css, etc.
app.set("view engine", "ejs"); // EJS is a dependency


// Express
app.use(require("express-session")({
    secret: "Tiny Dancer",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // For PUT requests


// Mongoose ----------------------------------------------------

mongoose.connect('mongodb://localhost:27017/modernsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


// Routes ------------------------------------------
const indexRoutes = require("./routes/index");
const packagesRoutes = require("./routes/packages");


app.use(indexRoutes);
app.use(packagesRoutes);

// Globals ------------------------------------------------------
const port = 3000;




// START/LISTEN//		
app.listen(port, () => { console.log(`Listening on port ${port}`); });