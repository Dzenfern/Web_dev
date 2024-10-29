let p1 = document.querySelector("#player1");
let p2 = document.querySelector("#player2");

let max = document.querySelector("#maxScore");
let btnP1 = document.querySelector("#p1Btn");
let btnP2 = document.querySelector("#p2Btn");
let btnReset = document.querySelector("#reset");

let running = true;
btnP1.addEventListener("click",()=>{
    if(running){
        let sc1 = parseInt(p1.innerText);
        let MaxScore = parseInt(max.value);
        if(sc1<MaxScore){
            p1.innerText= `${sc1+1}`;
            if((sc1+1)==MaxScore){
                p1.classList.toggle('win');
                p2.classList.toggle('lose');
                btnP1.classList.toggle("off");
                btnP2.classList.toggle("off");
                running=false;
            }
        }
    }
    
})

btnP2.addEventListener("click",()=>{
    if(running){
        let sc2 = parseInt(p2.innerText);
        let MaxScore = parseInt(max.value);
        if(sc2<MaxScore){
            p2.innerText= `${sc2+1}`;
            if((sc2+1)==MaxScore){
                p2.classList.toggle('win');
                p1.classList.toggle('lose');
                btnP1.classList.toggle("off");
                btnP2.classList.toggle("off");
                running=false;
            }
        }
    }
    
})

btnReset.addEventListener("click",()=>{
    p1.classList="";
    p2.classList="";
    p1.innerText="0";
    p2.innerText="0";
    btnP1.classList.toggle("off");
    btnP2.classList.toggle("off");
    running = true;
})