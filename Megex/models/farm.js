const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const { Product } = require("./product");

const FarmSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Farm must have a name"],
    },
    city:{
        type:String
    },
    email:{
        type:String,
        required:[true,"Email required"]
    },
    products:[
        {
            type: Schema.Types.ObjectId,
            ref:"product"
        }
    ]
})

FarmSchema.post("findOneAndDelete",async function(farm){
    if(farm.products.length){
        const data = await Product.deleteMany({_id:{$in:farm.products}})
        console.log(data);
        
    }
})

const Farm = mongoose.model("farm",FarmSchema);

module.exports={Farm:Farm};