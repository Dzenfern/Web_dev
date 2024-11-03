const { Schema } = require("mongoose");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((succ) => console.log("connection successful"))
  .catch((err) => console.log(err));

const productSchema = Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Summer", "Spring", "Winter"],
  },
});

const FarmSchema = Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", FarmSchema);

// Product.insertMany([
//   { name: "Goddess Melon", price: 3.5, season: "Summer" },
//   { name: "Baby Sugar Waterelon", price: 3.0, season: "Summer" },
//   { name: "Asparagus", price: 2.0, season: "Winter" },
// ]);

const makeFarm = async () => {
  const farm = new Farm({ name: "Full Belly Farm", city: "Guinda ,CA" });
  const melon = await Product.findOne({name:"Goddess Melon"});
  farm.products.push(melon)
  await farm.save();
  console.log(farm);
};

const addProduct = async ()=>{
    const farm = await  Farm.findOne({name:"Full Belly Farm"});
    const watermelon = await Product.findOne({name:"Baby Sugar Waterelon"});
    farm.products.push(watermelon)
    await farm.save();
    console.log(farm);
}

Farm.findOne({name:"Full Belly Farm"}).populate("products").then(farm=>console.log(farm.products))
