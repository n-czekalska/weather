const apiKey = "76f78e8f22cb4efa84f125231212006";
const basicURI = "https://api.weatherapi.com/v1/";
const current = "current.json";
const loc = document.getElementById("location");
const date = document.getElementById("dateTime");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const icon = document.getElementById("weathericon");
const today = document.getElementById("today");
const fiveDay = document.getElementById("fiveday");
const tenDay = document.getElementById("tenday");

window.addEventListener('load', async function() {
    const result = await getCurrentWeather();
    console.log(result);
    displayResult(result);
})

function displayToday() {
    fiveDay.style.display = "none";
    tenDay.style.display = "none";
    today.style.display = "block";
}

function displayFiveDay() {
    today.style.display = "none";
    tenDay.style.display = "none";
    fiveDay.style.display = "block";
}

function displayTenDay() {
    today.style.display = "none";
    fiveDay.style.display = "none";
    tenDay.style.display = "block";
}

async function searchCurrentWeather() {
    const searchTerm = document.getElementById("search-input").value;
    const result = await getCurrentWeather(searchTerm);
    result.error ?  document.getElementById("searchbar").insertAdjacentHTML("beforebegin", "<p class='error darkblue'>"+result.error.message+"</p>") :  displayResult(result);
}

async function getCurrentWeather(searchLocation) {
        const response = await fetch(basicURI + current + "?key="+ apiKey + "&q=" + (searchLocation ? searchLocation : "Edinburgh"))
        .catch(error => {
            console.error(error);
            const searchInput = document.getElementById("search-input");
            searchInput.insertAdjacentHTML("beforebegin", " <p id='error'>City not found</p>");
        });
        return await response.json();
}

async function displayResult(result) {
    loc.innerHTML = result.location.name +", " + result.location.country;
    date.innerHTML = "Last updated " + moment(result.current.last_updated).format("HH:mm");
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
