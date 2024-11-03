const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { Product } = require("./models/product");
const methodOverride = require("method-override");
const AppError = require("./AppError");
const morgan = require("morgan");
const {Farm} = require("./models/farm");
const { log } = require("console");


const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

mongoose.connect("mongodb://127.0.0.1:27017/FarmStand")
  .then(() => {
    console.log("CONNECTION TO MongoDB SUCCESSFUL");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));

const wrapAsync = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(err));
  };
};

app.get("/", (req, res) => {
  res.send("HELLO GOATS");
});

app.get("/farms",async(req,res)=>{
  const farms = await Farm.find({});
  res.render("farms/index.ejs",{farms});
})

app.get("/farm/new",(req,res)=>{
  res.render("farms/new.ejs")
})

app.post("/farms",async (req,res)=>{
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect("/farms")
})

app.get("/farm/:id",async(req,res)=>{
  const {id} = req.params;
  const farm = await Farm.findById(id).populate("products")
  res.render("farms/show.ejs",{farm});
})

app.get("/farm/:id/products/new",(req,res)=>{
  const {id} = req.params;
  const categories = Product.schema.path("category").enumValues;
  res.render("products/add.ejs",{categories,id})
})

app.post("/farm/:id/products",async (req,res)=>{
  const {id} = req.params;
  const {name,price,category}=req.body;
  const farm = await Farm.findById(id);
  const prod = new Product({name,price,category});
  farm.products.push(prod);
  prod.farm=farm;
  await prod.save();
  await farm.save();
  res.redirect(`/farm/${farm._id}`)
})

app.delete("/farms/:id",async (req,res)=>{
  const {id} = req.params;
  const farm = await Farm.findByIdAndDelete(id);
  console.log("DELETING")
})

app.get("/products",wrapAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render("./home.ejs", { items: products, category: category });
    } else {
      const products = await Product.find({});
      res.render("./home.ejs", { items: products, category: "All" });
    }
  })
);

// app.get("/products/new", (req, res) => {
//   const categories = Product.schema.path("category").enumValues;
//   res.render("./add.ejs", { categories });
// });

app.post("/products/add", wrapAsync(async (req, res, next) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/product/${product._id}`);
}));

app.get("/product/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not Found", 404);
    }
    res.render("./single.ejs", { product });
}));

app.get("/product/:id/edit", async (req, res) => {
  const { id } = req.params;
  const categories = Product.schema.path("category").enumValues;
  const prod = await Product.findById(id);
  res.render("./edit.ejs", { product: prod, categories });
});

app.get("/get", (req, res) => {
  console.log(Product.schema.path("category").enumValues);
});

app.put("/products/:id", async (req, res, err) => {
  // res.send("PATCHING")
  try {
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    console.log(req.body);
    res.redirect(`/product/${id}`);
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const delProd = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(9090, () => {
  console.log("Listening at 9090");
});
