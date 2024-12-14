const express = require('express');

router = express.Router();

router.use((req,res,next)=>{
    if(req.query.isAdmin){
        next()
    }else{
        res.send("SORRY NOT AN ADMIN")
    }
})

router.get("/",(req,res)=>{
    res.send("In admin")
})


router.get("/topsecret",(req,res)=>{
    res.send("This is top secret")
})

router.get("/deleteeverything",(req,res)=>{
    res.send("ALL DEMOLISHEd")
})

module.exports=router;
