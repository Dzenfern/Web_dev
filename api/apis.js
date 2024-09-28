// const req = new XMLHttpRequest();

// req.onload = function (){
//     console.log("SUCESS");
//     // console.log(JSON.parse(this));
//     console.log(JSON.parse(this.responseText));
    
// }

// req.onerror = ()=>{
//     console.log("WE FUCKED UP");
//     console.log(this);
    
// }

// req.open("GET","https://swapi.dev/api/people/70/");
// req.send();

fetch("https://swapi.dev/api/people/1090/")
    .then((data)=>(data.json()))
    .then(data=>{console.log(data);
    })
    .catch(e=>{
        console.log("Error Occured"+ e);
        
    })
