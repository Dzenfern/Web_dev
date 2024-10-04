const jokes = require("give-me-a-joke");
const cowsay = require("cowsay")
const colors = require("colors")

jokes.getRandomDadJoke((joke)=>{
    console.log(joke.rainbow);
})