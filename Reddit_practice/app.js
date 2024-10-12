const express = require("express");
const path = require("path");

const app = express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")))

const redditData = require("./data.json");

app.get("/r/:subreddit",(req,res)=>{
    
    const {subreddit} = req.params    
    const {name,subscribers,description,posts} = redditData[subreddit]
    res.render("subreddit",{name,subscribers,description,posts})
    
})

app.get("/",(req,res)=>{
    const {subreddit} = req.params
    let cats = ["tom","Kitty","coco"]
    res.render("home",{subreddit:subreddit,cats:cats})
})

app.listen(9000,()=>{

})