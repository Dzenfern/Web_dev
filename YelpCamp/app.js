const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const CampGround = require("./models/campground");
const Review = require('./models/review');
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const { catchAsync } = require("./utils/catchAsync");
const {CampgroundSchema,ReviewSchema} = require('./Schemas/Schemas');
const campgrounds = require("./routes/campgrounds")
const reviews = require("./routes/reviews");
const session = require('express-session');
const flash = require('connect-flash');

// setting up the server options and view paths
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const sessionConfig={
    secret:"wenamechuindasummer",
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+ 1000*60*60*24*7,
      maxAge:1000*60*60*24*7,
      httpOnly:true
    }
}

app.use(session(sessionConfig))

app.use(flash())

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next()
})


//LOGGING SETUP
app.use(morgan("dev"));

mongoose
  .connect("mongodb://127.0.0.1:27017/YelpCamp")
  .then(() => {
    console.log("CONNECTION TO MongoDB SUCCESSFUL");
  })
  .catch((err) => {
    console.log(err);
  });


const validateCampground = (req,res,next)=>{
      const {error} = CampgroundSchema.validate(req.body);
      if(error){
          const msg = error.details.map(el=> el.message).join(",")
          throw new ExpressError(msg,400)
      }else{
        next();
      }
}

const validateReview = (req,res,next)=>{
  const {error} = ReviewSchema.validate(req.body);
  if(error){
      const msg = error.details.map(el=> el.message).join(",")
      throw new ExpressError(msg,400)
  }else{
    next();
  }
}

app.use("/campgrounds",campgrounds);
app.use('/campgrounds/:id/reviews',reviews);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "WE FUCKED";
  res.render("./error.ejs", { err });
});

app.listen(9090, () => {
  console.log("Serving ON PORT 9090");
  console.log(`http://localhost:9090/`)
});
