const express = require('express');
const shelterRoutes = require('./routes/shelterRoutes');
const app = express()

app.use("/breeders",shelterRoutes)

app.get("/",(req,res)=>{
    res.send("HIIIII")
})
app.listen(3000,()=>{
    console.log("Serving on localhost:3000");
    
})