const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        lowercase:true,
        enum:["fruit","vegetable","dairy"]
    }
})

ProductSchema.virtual("GetDeets").get(function(){
    return `${this.name}|${this.category}|${this.price}`
})

const Product = mongoose.model("products",ProductSchema);

module.exports={Product};