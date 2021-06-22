
const moment = require("moment");
const apiKey = "76f78e8f22cb4efa84f125231212006";
const basicURI = "https://api.weatherapi.com/v1/";
const current = "current.json";
const location = document.getElementById("location");
const date = document.getElementById("dateTime");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("weathericon");

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

async function getCurrentWeather(searchLocation) {
        const response = await fetch(basicURI + current + "?key="+ apiKey + "&q=" + (searchLocation ? searchLocation : "Edinburgh"))
        .catch(err => {
            console.error(err);
            const searchInput = document.getElementById("search-input");
            searchInput.insertAdjacentHTML("beforebegin", " <p id='error'>City not found</p>");
        });
        return await response.json();
}

async function displayResult(result) {
    location.innerHTML = result.location.name +", " + result.location.country;
    date = "As of " + moment(result.current.last_updated).format("DD-MMMM-YYYY HH:mm");
    temp.innerHTML = result.current.temp_c +'&deg;C';
    condition.innerHTML = result.current.condition.text;
    Promise.resolve(findIcon(result.current.condition.code).then(data => icon.src = "assets/"+ data.icon));

}

async function findIcon(code) {
   return fetch("./assets/weather_conditions.json")
    .then(response => response.json())
    .then(json => { 
        console.log(json);
        return json.find(x => x["code"] === code)
     });
}
