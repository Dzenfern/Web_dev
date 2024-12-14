const express = require("express");
const cookieParser = require('cookie-parser');
const session = require("express-session")

const app = express();

const sessOps = {secret:"BAbablacksheep",resave:false,saveUninitialized:false}

app.use(session(sessOps))
app.use(cookieParser("secret"))
//routes
app.get("/",(req,res)=>{
    console.log(req.cookies);
    
    res.send("OINK")
});

app.get("/getViews",(req,res)=>{
    if(req.session.count){
        req.session.count+=1;
    }else{
        req.session.count=1
    }
    res.send(`Page visits: ${req.session.count}`)
})

app.get("/setname",(req,res)=>{
    res.cookie("name","stevie chicks",{signed:true})
    res.send("SENT COOKIE")
})

// app.get("/greet",(req,res)=>{
//     const {name="Anonymous"}=req.signedCookies;
//     res.send("HELLO there, "+name)
// });

app.get("/verify",(req,res)=>{
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send("HELLO there")
});

app.get("/register",(req,res)=>{
    const {username="anonymous"}=req.query;
    req.session.username=username;
    res.redirect("/greet")
})

app.get("/greet",(req,res)=>{
    const {username} = req.session;
    res.send(`hello ${username}`)
})

app.listen(9090, () => {
console.log("Serving ON PORT 9090");
  });