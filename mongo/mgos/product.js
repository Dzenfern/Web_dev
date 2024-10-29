const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/Store')
    .then(res=>{
        console.log("SUCCESSFUL CONNECTION");      
    })
    .catch(err=>{
        console.log(err);        
    })

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    onSale:{
        type:Boolean,
        default:false
    },
    categories:[String],
    qty:{
        inStore:{
            type:Number,
            default:0,
            min:0
        },
        online:{
            type:Number,
            default:0,
            min:0
        }
    }
})

const Product = mongoose.model("Product",productSchema)

// const new_prod = new Product({name:"Pump",
//                             price:100,
//                             categories:["Cycling","Safety"],
//                             qty:{inStore:10,online:10}})
// new_prod.save()
Product.findOneAndUpdate({name:"Pump"},{price:-990},{new:true,runValidators:true})
    .then(data=>{
        console.log("WORKED");
        console.log(data);  
    })
    .catch(err=>{
        console.log(err);
        
    })