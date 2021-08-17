//Date
let now = new Date();

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
let hour = now.getHours();
let minutes = now.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${day} ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("#city-header");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#enter-city");
form.addEventListener("submit", search);

//Search City

function searchForCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");
  let city2 = `${searchInput.value}`;

  searchCity(city2);
}
let form2 = document.querySelector("#enter-city");
form2.addEventListener("submit", searchForCity);

//show temperature

function searchCity(city) {
  let apiKey = "24a006e8f97a4f206afdea960907be08";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let roundedTemperature = Math.round(response.data.main.temp);
  let temperature = `${roundedTemperature} °C`;
  let city = document.querySelector("#temp");
  let humidity = response.data.main.humidity;
  let humidityNow = document.querySelector("#humidity");
  humidityNow.innerHTML = `humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windNow = document.querySelector("#wind");
  windNow.innerHTML = `wind: ${wind} km/h`;

  city.innerHTML = temperature;
  console.log(temperature);
  document.querySelector("#city-header").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "24a006e8f97a4f206afdea960907be08";
  let units = "metric";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${endpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
