const {Product} = require("./models/product");
const mongoose = require("mongoose");



mongoose.connect('mongodb://127.0.0.1:27017/FarmStand')
    .then(()=>{
        console.log("CONNECTION TO MongoDB SUCCESSFUL");
        
    })
    .catch(err=>{
        console.log(err);        
    })

// const p = new Product({
//     name:"Grape Fruit",
//     price:1.99,
//     category:"fruit"
// })

// const seedProducts = [
//     {
//         name: 'Fairy Eggplant',
//         price: 1.00,
//         category: 'vegetable'
//     },
//     {
//         name: 'Organic Goddess Melon',
//         price: 4.99,
//         category: 'fruit'
//     },
//     {
//         name: 'Organic Mini Seedless Watermelon',
//         price: 3.99,
//         category: 'fruit'
//     },
//     {
//         name: 'Organic Celery',
//         price: 1.50,
//         category: 'vegetable'
//     },
//     {
//         name: 'Chocolate Whole Milk',
//         price: 2.69,
//         category: 'dairy'
//     },
// ]

// p.save().then(p=>{
//     console.log(p);
    
// }).catch(err=>{
//     console.log(err);
    
// })

Product.insertMany(seedProducts)
    .then((result) => {
        console.log("Save Successful");
        
    }).catch((err) => {
        console.log(err);
        
    });