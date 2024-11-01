const CampGround = require("../models/campground")
const mongoose = require("mongoose")
const {places,descriptors} = require("./seedHelpers")
const cities = require("./cities")

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp')
    .then(()=>{
        console.log("CONNECTION TO MongoDB SUCCESSFUL");
        
    })
    .catch(err=>{
        console.log(err);        
    })

    const seedDB = async () => {
        await CampGround.deleteMany({});
        const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
        let arr = [];
        for (let i = 0; i < 50; i++) {
            const rand = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
            const cground = new CampGround({
                title: `${sample(descriptors)} ${sample(places)}`,
                location: `${cities[rand].city}, ${cities[rand].state}`,
                image: `https://picsum.photos/400?random=${Math.random()}`,
                description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
                price: price
            });
            arr.push(cground);
        }
    
        await CampGround.insertMany(arr);
        console.log("Database Seeded!");
    };

seedDB()