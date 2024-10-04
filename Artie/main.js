const figlet = require("figlet");
const colors = require("../NPmm/node_modules/colors")
figlet("Hello WOrld",(err,data)=>{
    if(err){
        console.log("something went wrong");
        console.dir(err);
        return;
        
    }
    console.log(data.red);
    
})