let container = document.querySelector(".container");

for(let i =100;i<=200;i++){
    container.innerHTML+=`
            <div class="container">
            <div class="pokeMon">
                <div>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png">
                </div>
                <p>
                    #${i+1}
                </p>
            </div>
    `;
}
// dof.innerHTML+= `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png">`;

// // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
