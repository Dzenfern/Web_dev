const express = require("express");
const { catchAsync } = require("../utils/catchAsync");
const methodOverride = require("method-override");
const CampGround = require("../models/campground");
const Review = require('../models/review');
const ExpressError = require("../utils/ExpressError");
const {CampgroundSchema,ReviewSchema} = require('../Schemas/Schemas');
const { log } = require("winston");

const router = express.Router({mergeParams:true});

const validateReview = (req,res,next)=>{
    const {error} = ReviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el=> el.message).join(",")
        throw new ExpressError(msg,400)
    }else{
        next();
    }
  }

router.post("/",validateReview,catchAsync(async (req, res) => {
        const campground = await CampGround.findById(req.params.id);
        console.log(campground);
        
        const review = await Review(req.body.review);
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        req.flash("success","Successfully made a new review")
        res.redirect(`/campgrounds/${req.params.id}`);
    })
);

router.delete("/:reviewId",catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await CampGround.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully deleted review")
    res.redirect(`/campgrounds/${id}`);
    })
);

module.exports = router;