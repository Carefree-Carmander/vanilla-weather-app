let now = new Date();

let h4 = document.querySelector("h4");

let dateDay = now.getDate();

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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

console.log(formatDate(now));

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h2");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");


  temperatureElement.innerHTML = `${temperature}°`;
  console.log(response.data.main.temp);
}

function searchLocation(position) {
  let apiKey = "fb292de11e071a00e499cdd544b36098";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#weather");
  let cityInput = document.querySelector("#gsearch");
  cityElement.innerHTML = cityInput.value;
}

let submit = document.querySelector("#search");
submit.addEventListener("click", searchCity);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#weather-form");
searchForm.addEventListener("submit", search);

function showPosition(position) {
  let h1 = document.querySelector("h1 #weather");
  h1.innerHTML = `${city}`;
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}

let celsiusTemp = `${temperature}`;

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

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

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("New York");

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






