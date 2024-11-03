const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const CampGround = require("./models/campground");
const mongoose = require("mongoose");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const { catchAsync } = require("./utils/catchAsync");
const {CampgroundSchema} = require('./Schemas/CampgroundSchema');

// setting up the server options and view paths
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

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

const verifyPassword = function (req, res, next) {
  const { password } = req.query;
  console.log(req.query);

  if (password === "chickens") {
    next();
  }
  throw new ExpressError("Password Required", 401);
};

const validateCampground = (req,res,next)=>{
      const {error} = CampgroundSchema.validate(req.body);
      if(error){
          const msg = error.details.map(el=> el.message).join(",")
          throw new ExpressError(msg,400)
      }else{
        next();
      }
}

app.get("/secret", verifyPassword, (req, res) => {
  res.send("I AM GREAT....I HOPE");
});

app.get("/error", (req, res) => {
  cat.get();
});

app.get("/", (req, res) => {
  res.redirect("/campgrounds");
});

app.get("/campgrounds",catchAsync(async (req, res) => {
    const cgs = await CampGround.find({});
    res.render("camp/index.ejs", { campgrounds: cgs });
  })
);

app.get("/campground/new", (req, res) => {
  res.render("camp/new.ejs");
});

app.post("/campgrounds",validateCampground,catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError("Invalid Campground Data",400)
    const campground = new CampGround(req.body.campground);
    await campground.save();
    res.redirect(`/campground/${campground._id}`);
  })
);

app.get("/campground/:id",catchAsync(async (req, res) => {
    const { id } = req.params;
    const cg = await CampGround.findById(id);
    res.render("camp/show.ejs", { campground: cg });
  })
);

app.get(
  "/campground/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const cg = await CampGround.findById(id);
    res.render("camp/edit.ejs", { campground: cg });
  })
);

app.put("/campgrounds/:id",validateCampground,catchAsync(async (req, res) => {
    const { id } = req.params;
    await CampGround.findByIdAndUpdate(
      id,
      { ...req.body.campground },
      { runValidators: true }
    );
    res.redirect(`/campground/${id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await CampGround.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
  })
);

// app.use((err,req,res,next)=>{
//     console.log("***********************************");
//     console.log("******************ERROR************");
//     console.log("***********************************");
//     console.log(err);
//     next(err);
// })

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
});
