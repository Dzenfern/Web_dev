const mongoose = require("mongoose");
const {Schema} = require("mongoose")

const ProductSchema = Schema({
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
    },
    farm:{
        type:Schema.Types.ObjectId,
        ref:"farm"
    }
})

ProductSchema.virtual("GetDeets").get(function(){
    return `${this.name}|${this.category}|${this.price}`
})

const Product = mongoose.model("product",ProductSchema);

module.exports={Product};