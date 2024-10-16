const express = require("express");
const path = require("path");

const app = express();

app.set("view engine ","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/tacos",(req,res)=>{
    res.send("GOT TACOS");
})

app.post("/tacos",(req,res)=>{
    res.send("HELLO POSTER")
    console.log(req.body);
    
    
})

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.listen(9090,()=>{
    console.log("LIVE ON 9090");
    
})