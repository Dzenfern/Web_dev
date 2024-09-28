function coloro(color,delay){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                document.body.style.backgroundColor=color;
                resolve();
                },delay)
        })
}

coloro("red",2000)
    .then(()=> coloro("orange",2000))
    .then(()=> coloro("violet",2000))
    .then(()=> coloro("pink",2000))
    .then(()=> coloro("blue",2000))
    .then(()=> coloro("green",2000))
    .then(()=> coloro("teal",2000))
