// Feature 1
let now = new Date();

let currentDate = document.querySelector("#date-today");
let currentTime = document.querySelector("#time-now");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let timeOfDay = now.getTime();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours > 11) {
  timeOfDay = `PM`;
} else {
  timeOfDay = `AM`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];

currentDate.innerHTML = `${month} ${date}, ${day}`;
currentTime.innerHTML = `${hours}:${minutes} ${timeOfDay}`;
/*
// Feature 2
function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citySearchInput");
  let cityName = document.querySelector("h2");
  cityName.innerHTML = `${cityInput.value}`;
}

let citySearchBar = document.querySelector("#citySearchBar");
citySearchBar.addEventListener("submit", citySearch);
*/

// Bonus Feature
/*function convertF(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("h1");
  let temperature = temperatureNow.innerHTML;
  temperatureNow.innerHTML = Math.round(temperature * 9) / 5 + 32;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertF);
*/

let searchInput = document.querySelector("#citySearchInput");
console.log(searchInput.value);

function showWeather(response) {
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
}

function search(city) {
  let apiKey = `905f1826152901ffd277016fd1f58ed0`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function enterCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#citySearchInput");
  search(cityInputElement.value);
}

let form = document.querySelector("#citySearchBar");
form.addEventListener("submit", enterCity);

//Current Position
function searchPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(api).then(showWeather);
}

let button = document.querySelector("#current");
button.addEventListener("click", searchPosition);

function getCurrentPosition() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
