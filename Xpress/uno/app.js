const express = require("express");

const app = express();

// app.use((req,res)=>{
//     console.log("we GOT NEW REQUEST");
//     res.send("HELLLO WORLLD");
// })

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.get("/cats",(req,res)=>{
    res.send("CAT REQUEST")
})

app.get("/dogs",(req,res)=>{
    res.send("DOGGY PAGE")
})

app.post("/cats",(req,res)=>{
    res.send("THIS IS A POST REQUEST")
})

app.get("/r/:subreddit",(req,res)=>{
    let {subreddit} = req.params    
    res.send(`Welcome to ${subreddit}`)
})

app.get("/search",(req,res)=>{
    let {q}= req.query;
    res.send(`${Object.keys(req.query)}`)
})

app.listen(9090,()=>{
    console.log("Listening on PORT 9090");
    
})