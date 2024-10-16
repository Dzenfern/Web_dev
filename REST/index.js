const { log } = require("console");
const express = require("express");
const path = require("path");
const { v4: uuid } = require('uuid');
const methodOverride = require("method-override")


app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.set("views",path.join(__dirname,"/views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"/public")))

let comments =[
    {
        id:uuid(),
        username:"Skyler",
        comment: "LOLO"
    },
    {
        id:uuid(),
        username:"Toddd",
        comment: "JUST RANDOM"
    },
    {
        id:uuid(),
        username:"COCO_MELON",
        comment: "STUFF"
    }
]

app.get("/comments",(req,res)=>{
    console.log(comments);
    
    res.render("comments/index.ejs",{comments})
})

app.post("/tacos",(req,res)=>{
    res.send("POST /tacos response")
})

app.get("/comments/new",(req,res)=>{
    res.render("comments/new.ejs")
})

app.post("/comments",(req,res)=>{
    const {username,comment}=req.body;
    comments.push({id:uuid(),
        username:username,
        comment:comment});   
    res.redirect("/comments");
})

app.get("/comments/:id",(req,res)=>{
    const {id}= req.params;
    const foundComm = comments.find(c=> c.id===id);
    res.render("comments/single.ejs",{comment:foundComm})
})

app.delete("/comments/:id",(req,res)=>{    
    const {id} = req.params;
    comments = comments.filter(c=>c.id!==id)
    res.redirect("/comments")
})


app.get("/comments/:id/edit",(req,res)=>{
    const {id}= req.params;
    const foundComm = comments.find(c=> c.id===id);
    res.render("comments/edit.ejs",{comment:foundComm})
})

app.patch("/comments/:id",(req,res)=>{    
    const {id} = req.params;
    const newComm = req.body.comment;
    const foundComm = comments.find(c=> c.id===id);
    foundComm.comment=newComm;
    res.redirect("/comments")
})

app.get("/",(req,res)=>{
    res.send("HELLO");
})

app.listen(9000,()=>{
    console.log("LIVE AT 9000");
    
})