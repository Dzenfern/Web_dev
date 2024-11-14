const mongoose = require("mongoose");
const Review = require("./review");

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
    location:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]
})

CampGroundSchema.post("findOneAndDelete",async (data)=>{
    if(data){
        await Review.deleteMany({
            _id:{$in:data.reviews}
        })
    }
})

module.exports= mongoose.model("Campground",CampGroundSchema);