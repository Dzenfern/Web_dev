const express = require("express");
const { catchAsync } = require("../utils/catchAsync");
const methodOverride = require("method-override");
const CampGround = require("../models/campground");
const Review = require('../models/review');
const ExpressError = require("../utils/ExpressError");
const {CampgroundSchema,ReviewSchema} = require('../Schemas/Schemas');
const campground = require("../models/campground");

const router = express.Router();

const validateCampground = (req,res,next)=>{
    const {error} = CampgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(",")
        throw new ExpressError(msg,400)
    }else{
      next();
    }
}

router.get( "/",catchAsync(async (req, res) => {
    const cgs = await CampGround.find({});
    res.render("camp/index.ejs", { campgrounds: cgs });
  })
);

router.get("/new", (req, res) => {
  res.render("camp/new.ejs");
});

router.get("/:id",catchAsync(async (req, res) => {
      const { id } = req.params;
      const cg = await CampGround.findById(id).populate("reviews");
      if(!cg){
        req.flash("error","cannot find that campground")
        res.redirect("/campgrounds")
      }
      res.render("camp/show.ejs", { campground: cg });
    })
  );

router.get("/:id/edit",catchAsync(async (req, res) => {
    const { id } = req.params;
    const cg = await CampGround.findById(id);
    if(!cg){
      req.flash("error","cannot find that campground")
      res.redirect("/campgrounds")
    }
    res.render("camp/edit.ejs", { campground: cg });
})
);





router.post("/",validateCampground,catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError("Invalid Campground Data",400)
    const campground = new CampGround(req.body.campground);
    await campground.save();
    req.flash("success","Successfully made a new campground!")
    res.redirect(`/campgrounds/${campground._id}`);
  })
);


router.put("/:id",validateCampground,catchAsync(async (req, res) => {
    const { id } = req.params;
    await CampGround.findByIdAndUpdate(
      id,
      { ...req.body.campground },
      { runValidators: true }
    );
    res.redirect(`/campgrounds/${id}`);
  })
);

router.delete("/:id",catchAsync(async (req, res) => {
    const { id } = req.params;
    await CampGround.findByIdAndDelete(id);
    req.flash("success","Successfully deleted campground")
    res.redirect(`/campgrounds`);
  })
);

module.exports = router;
