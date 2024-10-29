// axios.get("https://swapi.dev/api/people/1/")
//     .then((res)=>{
//         console.log(res.data);
//     })
//     .catch(e=>{
//         console.log("ERROR OCCURED",e);
//     })


const jokeBTN = document.querySelector("#JokeBtn");
const JokesList = document.querySelector("#JokesList")

const getJoke = async ()=>{
    const config = {headers:{Accept:"application/json"}};
    const joke = await axios.get("https://icanhazdadjoke.com/",config);
    return joke       
}


const addJoke = async ()=>{
    let res = await getJoke();
    let liEl = document.createElement("li");
    liEl.append(res.data.joke);
    JokesList.append(liEl)
}



jokeBTN.addEventListener("click", ()=>{
    addJoke()
})

// const config = {headers:{Accept:"application/json"}}
// const joke = axios.get("https://icanhazdadjoke.com/",config)
// joke.then((result) => {
//     console.log(result.data);
    
// }).catch((err) => {
//     console.log("ERROR OCCURED");
    
// });
