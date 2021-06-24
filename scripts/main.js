const apiKey = "76f78e8f22cb4efa84f125231212006";
const basicURI = "https://api.weatherapi.com/v1/";
const forecast = "forecast.json";
const otherParameters = "&days=1&aqi=yes&alerts=no";
let loc, date, temp, condition, icon, feelsLike, chanceOfRainSnow, min, max, wind, humidity, uv, pressure, sunTimes, moonPhase, today, hourly, tenDay, qualityIndex, index, indexBanding, donutSegment, message;

window.addEventListener('load', async function () {
    getDocumentElements()
    const result = await getCurrentWeather();
    console.log(result);
    displayResult(result);
})

function displayToday() {
    hourly.style.display = "none";
    tenDay.style.display = "none";
    today.style.display = "block";
}

function displayHourly() {
    today.style.display = "none";
    tenDay.style.display = "none";
    hourly.style.display = "block";
}

function displayTenDay() {
    today.style.display = "none";
    hourly.style.display = "none";
    tenDay.style.display = "block";
}

async function searchCurrentWeather() {
    const searchTerm = document.getElementById("search-input").value;
    const result = await getCurrentWeather(searchTerm);
    result.error ? document.getElementById("searchbar").insertAdjacentHTML("beforebegin", "<p class='error darkblue'>" + result.error.message + "</p>") : displayResult(result);
}

async function getCurrentWeather(searchLocation) {
    const response = await fetch(basicURI + forecast + "?key=" + apiKey + "&q=" + (searchLocation ? searchLocation : "Edinburgh") + otherParameters)
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
    qualityIndex = getQualityIndexData();

    for (i = 0; i < loc.length; i++) {
        loc[i].innerHTML = result.location.name + ", " + result.location.country;
    }

    date.innerHTML = "Last updated " + moment(current.last_updated).format("h:mm A");
    temp.innerHTML = current.temp_c + '&deg;C';
    condition.innerHTML = current.condition.text;
    Promise.resolve(findIcon(current.condition.code).then(data => icon.src = "assets/" + data.icon));

    feelsLike.innerHTML = current.feelslike_c + '&deg;C';

    forecastInfo.day.daily_chance_of_rain > 0 ? chanceOfRainSnow.innerHTML = forecastInfo.day.daily_chance_of_rain + "% chance of rain" :
        forecastInfo.day.daily_chance_of_snow > 0 ? chanceOfRainSnow.innerHTML = forecastInfo.day.daily_chance_of_snow + "% chance of snow" : chanceOfRainSnow.display = "none";

    sunTimes.innerHTML = forecastInfo.astro.sunrise + " / " + forecastInfo.astro.sunset;
    moonPhase.innerHTML = forecastInfo.astro.moon_phase;
    min.innerHTML = forecastInfo.day.mintemp_c + '&deg;C';
    max.innerHTML = forecastInfo.day.maxtemp_c + '&deg;C';
    wind.innerHTML = current.wind_kph + " kph / " + current.wind_mph + " mph";
    pressure.innerHTML = current.pressure_mb + " mb";
    uv.innerHTML = current.uv + " of 10";
    humidity.innerHTML = current.humidity + " %";

    index.innerHTML = current.air_quality["gb-defra-index"];

    const qualityValue = qualityIndex.find(x => x.index === current.air_quality["gb-defra-index"].toString())
    indexBanding.insertAdjacentHTML("afterend", qualityValue.airPollutionBanding);
    indexBanding.style.background = qualityValue.colour;

    donutSegment.style.stroke = qualityValue.colour;
    const stroke = qualityValue.index *10;
    donutSegment.style.strokeDasharray = stroke.toString() + " " + (100 - stroke).toString();
    message.innerHTML = qualityValue.message;

}

async function findIcon(code) {
    return fetch("./assets/weather_conditions.json")
        .then(response => response.json())
        .then(json => {
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
    chanceOfRainSnow = document.getElementById("chanceOfRainSnow");

    min = document.getElementById("min");
    max = document.getElementById("max");
    sunTimes = document.getElementById("sunTimes");
    moonPhase = document.getElementById("moonPhase");
    wind = document.getElementById("wind");
    humidity = document.getElementById("humidity");
    uv = document.getElementById("uv");
    pressure = document.getElementById("pressure");

    index = document.getElementById("index");
    indexBanding = document.getElementById("indexBanding");
    donutSegment = document.getElementById("donutSegment");
    message = document.getElementById("airQualityMessage");

    today = document.getElementById("today");
    hourly = document.getElementById("hourly");
    tenDay = document.getElementById("tenday");
}

function getQualityIndexData() {
    return [{
            "index": "1",
            "airPollutionBanding": "Low",
            "message": "Enjoy your usual outdoor activities",
            "colour": "#090"

        },
        {
            "index": "2",
            "airPollutionBanding": "Low",
            "message": "Enjoy your usual outdoor activities",
            "colour": "#090"

        },
        {
            "index": "3",
            "airPollutionBanding": "Low",
            "message": "Enjoy your usual outdoor activities",
            "colour": "#090"

        },
        {
            "index": "4",
            "airPollutionBanding": "Moderate",
            "message": "Enjoy your usual outdoor activities",
            "colour": "#f90"

        },
        {
            "index": "5",
            "airPollutionBanding": "Moderate",
            "message": "Enjoy your usual outdoor activities",
            "colour": "#f90"

        },
        {
            "index": "6",
            "airPollutionBanding": "Moderate",
            "message": "Enjoy your usual outdoor activities",
            "colour": "#f90"

        },
        {
            "index": "7",
            "airPollutionBanding": "High",
            "message": "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors",
            "colour": "#ff0000"

        },
        {
            "index": "8",
            "airPollutionBanding": "High",
            "message": "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors",
            "colour": "#ff0000"

        },
        {
            "index": "9",
            "airPollutionBanding": "High",
            "message": "Anyone experiencing discomfort such as sore eyes, cough or sore throat should consider reducing activity, particularly outdoors",
            "colour": "#ff0000"
        },
        {
            "index": "10",
            "airPollutionBanding": "Very High",
            "message": "Reduce physical exertion, particularly outdoors, especially if you experience symptoms such as cough or sore throat",
            "colour": "#909"

        }
    ]
}