const express = require("express");
const path  = require("path")
const app = express();

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
// app.get("/",(req,res)=>{
//     res.render("home")
// })

app.get("/r/:subreddit",(req,res)=>{
    const {subreddit} = req.params
    let cats = ["tom","Kitty","coco"]
    res.render("home",{subreddit:subreddit,cats:cats})
})

app.listen(9000,()=>{
    console.log("Started on 9000");
    
})