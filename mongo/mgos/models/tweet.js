const { Schema } = require("mongoose");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((succ) => console.log("connection successful"))
  .catch((err) => console.log(err));

const userSchema = new Schema({
    userame:String,
    age:Number
});

const tweetSchema = new Schema({
  text:String,
  likes:Number,
  user:{type:Schema.Types.ObjectId,ref:"User"},
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweet = async ()=>{
    const u = new User({userame:"chickenfan90",age:61});
    const tweet1 = new Tweet({text:"Omg, I love my chicken family",likes:20});
    tweet1.user= u;
    await u.save();
    await tweet1.save()
    await mongoose.connection.close();
}

const makeTweet1 = async ()=>{
    const u = await  User.findOne({userame:"chickenfan90"});
    const tweet2 = new Tweet({text:"SQWACK SQWACK",likes:100});
    tweet2.user= u;
    await tweet2.save()
    await mongoose.connection.close();
}

// makeTweet1().then(()=>{
    
//     console.log("DONE WORK");
    
// });

const findTweet = async ()=>{
    const t = await Tweet.findOne({}).populate("user")
    console.log(t);
    mongoose.connection.close();    
}

findTweet().then(
    s=>console.log("DONE")
    
)