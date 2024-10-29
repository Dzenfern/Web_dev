const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const {Product} = require("./models/product");
const { log } = require("console");

const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

mongoose.connect('mongodb://127.0.0.1:27017/FarmStand')
    .then(()=>{
        console.log("CONNECTION TO MongoDB SUCCESSFUL");
        
    })
    .catch(err=>{
        console.log(err);        
    })



app.get("/",(req,res)=>{
    res.send("HELLO GOATS")
})

app.get("/products",async (req,res)=>{
    const products = await Product.find({});
    console.log(products);
    // res.send(JSON.stringify(products))
    res.render("./home.ejs",{products:products})
})

app.get("/products/:id",async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id);
    res.send(JSON.stringify(product))
    // res.send(JSON.stringify(products))
    // res.render("./home.ejs",{products:products})
})

app.listen(9090,()=>{
    console.log("Listening at 9090");
    
})