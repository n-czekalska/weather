const apiKey = "76f78e8f22cb4efa84f125231212006";
const basicURI = "https://api.weatherapi.com/v1/";
const forecast = "forecast.json";
let loc, date, temp, condition, icon, feelsLike, min, max, wind, humidity, uv, pressure, today, fiveDay, tenDay;

window.addEventListener('load', async function() {
    getDocumentElements()
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
        const response = await fetch(basicURI + forecast + "?key="+ apiKey + "&q=" + (searchLocation ? searchLocation : "Edinburgh")+"&days=1&aqi=no&alerts=no")
        .catch(error => {
            console.error(error);
            const searchInput = document.getElementById("search-input");
            searchInput.insertAdjacentHTML("beforebegin", " <p id='error'>City not found</p>");
        });
        return await response.json();
}

async function displayResult(result) {
    const current = result.current;
    const forecastInfo = result.forecast.forecastday[0];

    for (i = 0; i < loc.length; i++) {
        loc[i].innerHTML = result.location.name +", " + result.location.country;
      }
    
    date.innerHTML = "Last updated " + moment(current.last_updated).format("HH:mm");
    temp.innerHTML = current.temp_c +'&deg;C';
    condition.innerHTML = current.condition.text;
    Promise.resolve(findIcon(current.condition.code).then(data => icon.src = "assets/"+ data.icon));

    feelsLike.innerHTML = current.feelslike_c +'&deg;C';
    
    min.innerHTML = forecastInfo.day.mintemp_c +'&deg;C';
    max.innerHTML =  forecastInfo.day.maxtemp_c+'&deg;C';
    wind.innerHTML = current.wind_kph + " kph /" + current.wind_mph + " mph";
    pressure.innerHTML = current.pressure_mb + " mb" ;
    uv.innerHTML = current.uv + " of 10";
    humidity.innerHTML = current.humidity + " %";

}

async function findIcon(code) {
   return fetch("./assets/weather_conditions.json")
    .then(response => response.json())
    .then(json => { 
        console.log(json);
        return json.find(x => x["code"] === code)
     });
}

function getDocumentElements() {
 loc = document.getElementsByClassName("location");
 date = document.getElementById("dateTime");
 temp = document.getElementById("temp");
 condition = document.getElementById("condition");
 icon = document.getElementById("weathericon");
 feelsLike = document.getElementById("feelsLike");
 min= document.getElementById("min");
 max = document.getElementById("max");

 wind =  document.getElementById("wind"); 
 humidity =  document.getElementById("humidity");
 uv =  document.getElementById("uv");
 pressure =  document.getElementById("pressure");

 today = document.getElementById("today");
 fiveDay = document.getElementById("fiveday");
 tenDay = document.getElementById("tenday");
}
