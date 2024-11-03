const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(succ=>console.log("connection successful"))
    .catch(err => console.log(err));

const userSchema = mongoose.Schema({
    first:String,
    last:String,
    address:[
        {
            _id:{_id:false},
            street:String,
            city:String,
            state:String,
            country:String
        }
    ]
});

const User = mongoose.model("User",userSchema);

const makeUser = async ()=>{
    const u = new User({
        first:"Harry",
        last:"Potter",
    });
    u.address.push({
        street:"123 Sesame street",
        city:"New York",
        state:"NY",
        country:"USA"
    });
    const res = await u.save()
    console.log(res);
    mongoose.connection.close()
    console.log("CLOSE")
}

const addAddress = async (id)=>{
    const u = await User.findById(id);
    u.address.push({
        street:"21 Baker Street",
        city:"Workshire",
        state:"London",
        country:"England"
    })
    u.save();
    console.log(u);
    
}
addAddress('67260b2ef7a309746c284091')