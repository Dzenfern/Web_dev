function colorize(){
    let bod = document.querySelector(".gogo")
    let r = Math.floor(Math.random()*255)+1;
    let g = Math.floor(Math.random()*255)+1;
    let b = Math.floor(Math.random()*255)+1;
    bod.style.backgroundColor= `rgb(${r}, ${g}, ${b})`;
}

setInterval(colorize,2000);