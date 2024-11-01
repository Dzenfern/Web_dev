const { log } = require('console');
const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.set("view engie","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(morgan("common"))

app.use("/",(req,res,next)=>{
    console.log("HELLO MOMA");
    next()
})

app.get("/get",(req,res)=>{
    res.send("hello")
})

app.listen(3000,()=>{
    console.log("LIVE AT 3000");
    
})