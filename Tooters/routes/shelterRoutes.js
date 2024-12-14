const express = require('express');

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("All shelters")
})

router.post("/",(req,res)=>{
    res.send("Adding shelter shelters")
})
router.get("/id",(req,res)=>{
    res.send("single shelters")
})

module.exports=router;