const mongoose = require("mongoose")

// mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp')
//     .then(()=>{
//         console.log("CONNECTION TO MongoDB SUCCESSFUL");
        
//     })
//     .catch(err=>{
//         console.log(err);        
//     })

const Schema = mongoose.Schema;

const CampGroundSchema = new Schema({
    title: String,
    price: Number,
    description:String,
    image:String,
    location:String
})

module.exports= mongoose.model("Campground",CampGroundSchema);