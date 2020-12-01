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

  fahrenTemp = response.data.main.temp;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src", 
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `${temperature}°`;
  console.log(response.data.main.temp);
}

function displayCelsius(event) {
  event.preventDefault();

  celTemp.classList.add("active");
  farenTemp.classList.remove("active");

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let celsiusElement = document.querySelector("#celTemp");
  celsiusElement.addEventListener("click", displayCelsius);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  
  celTemp.classList.remove("active");
  farenTemp.classList.add("active");

  let fahrenTemp = (celsiusTemp * 9) / 5 + 32;
  fahrenheitElement.addEventListener("click", displayFahrenheit); 
}

let fahrenTemp = null;

function defaultCity(city) {
  let apiKey = "fb292de11e071a00e499cdd544b36098";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
defaultCity("New York");

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#gsearch").value;
  defaultCity(city);
}

let submit = document.querySelector("#search");
submit.addEventListener("click", searchCity);