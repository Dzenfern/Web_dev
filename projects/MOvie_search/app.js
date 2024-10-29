const form = document.querySelector("#SearchForm")
const btn = document.querySelector("#SearchForm button")
const display = document.querySelector("#movieBox");

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let searchQuery = form.elements.search.value;
    displayResults(searchQuery)
    
})

const getSearchResult= async (query)=>{
    const config = {params:{q:query}}
    const data = await axios.get("https://api.tvmaze.com/search/shows",config);
    return data.data
}

const displayResults = async (query)=>{
    let results = await getSearchResult(query);
    if(results.length>0){
        display.innerHTML="";
        for(let show of results ){    
            let imageSrc =  show.show.image.medium;  

            let MovieDiv = document.createElement("div");
            MovieDiv.classList.add("Movie")
            let title = document.createElement("h3");
            title.textContent=show.show.name;

            if(imageSrc){
                let image = document.createElement("img");
                image.src=imageSrc;
                MovieDiv.append(image);
            }
            MovieDiv.append(title);
            display.append(MovieDiv);
        }
    }else{
        display.innerHTML="";
        let title = document.createElement("h1");
        title.textContent="NO MATCHES FOUND";
        display.append(title);
    }
}
