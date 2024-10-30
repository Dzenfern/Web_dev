const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const {Product} = require("./models/product");
const methodOverride = require("method-override");
const { log } = require("console");

const app = express();
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))

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
    const {category} = req.query;
    if(category){
        const products = await Product.find({category});
        res.render("./home.ejs",{items:products})
    }else{
        const products = await Product.find({});
        res.render("./home.ejs",{items:products})
    }
    
})

app.get("/product/:id",async (req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id);
    res.render("./single.ejs",{product})
});

app.get("/products/new",(req,res)=>{
    const categories = Product.schema.path("category").enumValues;
    res.render("./add.ejs",{categories})
})

app.post("/products/add",async (req,res)=>{
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/product/${product._id}`)
})

app.get("/product/:id/edit",async (req,res)=>{
    const {id} = req.params;
    const categories = Product.schema.path("category").enumValues;
    const prod = await Product.findById(id);
    res.render("./edit.ejs",{product:prod,categories})
});

app.get("/get",(req,res)=>{
    console.log(Product.schema.path("category").enumValues);
    
})

app.put("/products/:id",async (req,res)=>{
    // res.send("PATCHING")
    const {id} = req.params;
    await Product.findByIdAndUpdate(id,req.body,{runValidators:true})
    console.log(req.body);
    res.redirect(`/product/${id}`)
})

app.delete("/products/:id",async (req,res)=>{
    const {id} = req.params;
    const delProd = await Product.findByIdAndDelete(id);
    res.redirect("/products");
})

app.listen(9090,()=>{
    console.log("Listening at 9090");
    
})