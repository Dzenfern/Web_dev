const mongoose = require('mongoose');


main().then(succ=>console.log("connection successful")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

// const movieSchema = mongoose.Schema({
//     title:String,
//     year:Number,
//     score:Number,
//     rating:String
// });

// const Movie = mongoose.model("Movie",movieSchema);
// const amadeus = Movie({title:"Amadeus",year:1986,score:9.2,rating:"R"});