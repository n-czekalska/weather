
const moment = require("moment");
const apiKey = "76f78e8f22cb4efa84f125231212006";
const basicURI = "https://api.weatherapi.com/v1/";
const current = "current.json";


window.addEventListener('load', async function() {
    const result = await getCurrentWeather();
    console.log(result);
    displayResult(result);
})

async function searchCurrentWeather() {
    const searchTerm = document.getElementById("search-input").value;
    const result = await getCurrentWeather(searchTerm);
    console.log(result);
    displayResult(result);
}

async function getCurrentWeather(location) {
        const response = await fetch(basicURI + current + "?key="+ apiKey + "&q=" + (location ? location : "Edinburgh"))
        .catch(err => {
            console.error(err);
            const searchInput = document.getElementById("search-input");
            searchInput.insertAdjacentHTML("beforebegin", " <p id='error'>City not found</p>");
        });
        return await response.json();
}

async function displayResult(result) {
    let currentView = document.querySelector(".current > .card");
    currentView.children[0].innerHTML = result.location.name +", " + result.location.country;
    currentView.children[1].innerHTML = "As of " + moment(result.current.last_updated).format('YYYY-MM-DD HH:m:s');
    currentView.children[2].children[0].children[0].innerHTML = result.current.temp_c +'&deg;C';
    currentView.children[2].children[0].children[1].innerHTML = result.current.condition.text;
    Promise.resolve(findIcon(result.current.condition.code).then(data => currentView.children[2].children[1].src = "assets/"+ data.icon));

}

async function findIcon(code) {
   return fetch("./assets/weather_conditions.json")
    .then(response => response.json())
    .then(json => { 
        console.log(json);
        return json.find(x => x["code"] === code)
     });
}
