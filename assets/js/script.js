// Pseudocode

// Get variables for the forecast card container, the search input and button, and current forecast, and a default city
var searchBtn = $("button");
var forecastContainer = $("#forecast-container");

var openWeatherApiKey = "b11f5ffe66d7025a0419eaeb90671962";

// Make an API call to get the weather for the default city
let currentWeather = runSearch("San Francisco");

console.log(currentWeather);
// parse that content and set for the current conditions and the forecast elements on the page
// When the user clicks the submit button...
    // Get the value of the input field
    // Save the value of the input field to the history in localStorage and update the history on the page
    // Make an API call to get the weather for the city in the input field



// Gets the onecall data and runs set current data and set forecast data
function getOneCallData(lat, lon) {
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + openWeatherApiKey;

    fetch(url).then(response => response.json()).then(function(data) {
        populateCurrentWeatherData(data.current.temp, data.current.humidity, data.current.wind_speed, data.current.uvi);
        populateForecastWeather(data.daily);
    });
}

// Gets the coordinates and calls get one data + set city name
function getCoordinates(city) {
    let lat, lon;
    url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + openWeatherApiKey;
    fetch(url).then(response => response.json()).then(function(data) {
        lat = data[0].lat;
        lon = data[0].lon;
        populateCurrentWeatherTitle(data[0].name + ", " + data[0].country);
        getOneCallData(lat, lon);
    });
    return {"lat": lat, "lon":lon};
}

// add current weather data to the page
function populateCurrentWeatherData(temp, humidity, windspeed, uvi) {
    //console.log("temp: " + temp + ", humidity: " + humidity + ", uvi: " +uvi);
    $("#current-temperature").text(temp);
    $("#current-humidity").text(humidity);
    $("#current-wind-speed").text(windspeed + " mph");
    $("#current-uvi").text(uvi);
    // TODO: set color of badge based on uvi
}

// add city name to the page
function populateCurrentWeatherTitle(city) {
    $("#current-city").text(city + " right now...");
}

function populateForecastWeather(forecast) {
    console.log(forecast.length);
    console.log(forecast[0]);

    let cards = forecastContainer.children();
    console.log(cards);
    for(let i=0; i<cards.length; i++) {
        $(cards[i]).find("p.forecast-uvi").text(forecast[i].uvi);
        $(cards[i]).find("span.forecast-temperature").text(forecast[i].temp.day);
        $(cards[i]).find("span.forecast-humidity").text(forecast[i].humidity);
        // TODO: set sunny symbol based on uvi
    }
}

// Kick off function for the page search
function runSearch(city) {
    getCoordinates(city);
}