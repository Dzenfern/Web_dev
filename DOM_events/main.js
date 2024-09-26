let btns = document.querySelectorAll(".container button")

function rm(){
    this.parentNode.remove()
}

for(let btn of btns){
    btn.addEventListener("click",rm)
}