const express = require("express")
const path = require("path")
const app = express();
const methodOverride = require("method-override")
const CampGround = require("./models/campground")
const mongoose = require("mongoose")
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const AppError = require('./AppError');

// setting up the server options and view paths
app.engine("ejs",ejsMate)
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"/public")))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

//LOGGING SETUP
app.use(morgan("dev"))


mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp')
    .then(()=>{
        console.log("CONNECTION TO MongoDB SUCCESSFUL");
        
    })
    .catch(err=>{
        console.log(err);        
    })

const verifyPassword = function (req,res,next){
    const {password} = req.query;
    console.log(req.query);
    
    if(password==="chickens"){
        next();
    }
    throw new AppError("Password Required",401)
}

app.get("/secret",verifyPassword,(req,res)=>{
    res.send("I AM GREAT....I HOPE")
})

app.get("/error",(req,res)=>{
    cat.get();
})

app.get("/",(req,res)=>{
    res.redirect("/campgrounds")
})

app.get("/campgrounds",async (req,res)=>{
    const cgs = await CampGround.find({});
    res.render("camp/index.ejs",{campgrounds:cgs})
})

app.get("/campground/new",(req,res)=>{
    res.render("camp/new.ejs")
})

app.post("/campgrounds",async (req,res)=>{
    const campground = new CampGround(req.body.campground)
    await campground.save();
    res.redirect(`/campground/${campground._id}`)
})

app.get("/campground/:id",async (req,res)=>{
    const {id} = req.params;
    const cg = await CampGround.findById(id)
    res.render("camp/show.ejs",{campground:cg})
})

app.get("/campground/:id/edit",async (req,res)=>{
    const {id} = req.params;
    const cg = await CampGround.findById(id)
    res.render("camp/edit.ejs",{campground:cg})
})

app.put("/campgrounds/:id",async (req,res)=>{
    const {id} =req.params;
    await CampGround.findByIdAndUpdate(id,{...req.body.campground},{runValidators:true})
    res.redirect(`/campground/${id}`)
})

app.delete("/campgrounds/:id",async (req,res)=>{
    const {id} =req.params;
    await CampGround.findByIdAndDelete(id)
    res.redirect(`/campgrounds`)
})

// app.use((err,req,res,next)=>{
//     console.log("***********************************");
//     console.log("******************ERROR************");
//     console.log("***********************************");
//     console.log(err);    
//     next(err);
// })

app.use((err,req,res,next)=>{
    const {status=500} = err;
    const {message="SOMETHING WENT WRONG"} = err;
    res.status(status).send(message)
})

app.listen(9090,()=>{
    console.log("Serving ON PORT 9090");
    
})