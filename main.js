const apiKey = "76f78e8f22cb4efa84f125231212006";
const basicURI = "https://api.weatherapi.com/v1/";
const current = "current.json";


window.addEventListener('load', async function() {
    const result = await getCurrentWeather();
    console.log(result);
    displayResult(result);
})


async function getCurrentWeather(location = "Edinburgh") {
        const response = await fetch(basicURI + current + "?key="+ apiKey + "&q=" + location)
        .catch(err => console.error(err));
        return await response.json();
}

function displayResult(result) {
    let currentView = document.querySelector(".current > .card");
    currentView.children[0].innerHTML = result.location.name +", " + result.location.country;
    currentView.children[1].innerHTML = "As of " + result.current.last_updated;
    currentView.children[2].children[0].children[0].innerHTML = result.current.temp_c +'&deg;C';
    currentView.children[2].children[0].children[1].innerHTML = result.current.condition.text;
    currentView.children[2].children[1].src = findIcon(result.current.condition.icon);

}

async function findIcon(code) {
    await fetch("./assets/weather_conditions.json")
    .then(response => response.json())
    .then(json => console.log(json))
    .then(data => data.find(x => x["code"] === code ));
}
