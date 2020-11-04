// General Imports and setup //
const express = require ("express");
const session = require ("express-session");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const methodOverride = require ("method-override");
const passport = require ("passport");
const localStrategy = require ("passport-local");
const passportLocalMongoose = require ("passport-local-mongoose");

/* Models */
const User = require ("./models/user")
const Vacation = require ("./models/vacation")

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

// Passport ----------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser()); 

// Locals -------------------------------------------------------
app.use((req, res, next) => {
	res.locals.currentUser = req.user; // Includes the User in all routes.
	next(); // Required to move forward from this middleware.
});

// Routes ------------------------------------------
const indexRoutes = require("./routes/index");
const packagesRoutes = require("./routes/packages");
const loginRoutes = require("./routes/login");
const newRoutes = require("./routes/newuser");

app.use(indexRoutes);
app.use(packagesRoutes);
app.use(loginRoutes);
app.use(newRoutes);
// Globals ------------------------------------------------------
const port = 3000;




// START/LISTEN//		
app.listen(port, () => { console.log(`Listening on port ${port}`); });