const ul = document.querySelectorAll("ul button")

const dis = function(){
    this.parentNode.remove()
    
}

for(let btn of ul){
    btn.addEventListener("click",dis)
}
