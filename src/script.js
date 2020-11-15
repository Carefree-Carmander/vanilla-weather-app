let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
   temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};

//let city = prompt("Enter a city:");
//city = city.toLowerCase();

//if (weather[city] !== undefined) {
//  let temp = weather[city].temp;
//  let humidity = weather[city].humidity;
//  let celTemp = Math.floor(temp);
//  let farenTemp = Math.floor(celTemp * (9 / 5) + 32);

//  alert(
//    `It is currently ${celTemp}°C (${farenTemp}°F) in ${city} with a humidity of ${humidity}%`
//  );
//} else {
//  alert(
//    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//  );
//}

let now = new Date();

let h4 = document.querySelector("h4");

let dateDay = now.getDate();

let hours = now.getHours();

let minutes = now.getMinutes();

function formatDate(date) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];

  h4.innerHTML = `${day}, ${month} ${dateDay}, ${hours}:${minutes}`;

  let formatDate = `${day}, ${month} ${dateDay}, ${hours}:${minutes}`;

  return formatDate;
}

console.log(formatDate(now));

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#weather");
  let cityInput = document.querySelector("#gsearch");
  cityElement.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", search);

let celsiusTemp = 14;
let temperatureElement = document.querySelector("h2");

function displayCelsius() {
  temperatureElement.innerHTML = celsiusTemp;
}
let celsiusElement = document.querySelector(".celTemp");
celsiusElement.addEventListener("click", displayCelsius);

function displayFahrenheit() {
  temperatureElement.innerHTML = (celsiusTemp * 9) / 5 + 32;
}
let fahrenheitElement = document.querySelector(".farenTemp");
fahrenheitElement.addEventListener("click", displayFahrenheit);


function displayWeatherCondition(response) {
  document.querySelector("#weather").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "fb292de11e071a00e499cdd544b36098";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showPosition(position) {
  let h1 = document.querySelector("h1 #weather");
  h1.innerHTML = `${city}`;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = `${temperature}°`;
  console.log(response.data.main.temp);
}

function defaultCity(city) {
  let apiKey = "fb292de11e071a00e499cdd544b36098";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
defaultCity("Sterling Heights");

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#gsearch").value;
  defaultCity(city);
}

let submit = document.querySelector("#search");
submit.addEventListener("click", searchCity);




