const btns = document.querySelectorAll("ul button")

for(let btn of btns){
    btn.addEventListener("click",function(){
        console.log(this);
        
    })
}