function formatDate (timestamp){
let now = new Date (timestamp)
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
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
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();

  return `${day}, ${month} ${date}`;
}

function formatHours(timestamp){
let now = new Date (timestamp)
let hours = now.getHours();
  if (hours < 10){hours = `0${hours}`};
  let minutes = now.getMinutes();
  if (minutes < 10){minutes = `0${minutes}`};

  return `${hours}:${minutes}`;
}

function showCurrentCityDateTimeWeather(response){
let currentCity = response.data.name
let currentCityName = document.querySelector("#current-city")
currentCityName.innerHTML = currentCity

currentTemperature = Math.round(response.data.main.temp)
let temperature = document.querySelector("#displayed-temperature")
temperature.innerHTML = currentTemperature

let currentWeatherDescription = response.data.weather[0].description
let weather = document.querySelector("#current-weather")
weather.innerHTML = currentWeatherDescription

let currentWindSpeed = Math.round((response.data.wind.speed)*3.6)
let windSpeed = document.querySelector("#wind-speed")
windSpeed.innerHTML = `${currentWindSpeed} km/h`

let currentHumidity = response.data.main.humidity
let humidity = document.querySelector("#humidity")
humidity.innerHTML = `${currentHumidity}%`

let currentWeatherIconId = response.data.weather[0].icon
let currentWeatherIcon = document.querySelector("#weather-icon")
currentWeatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${currentWeatherIconId}@2x.png`)

let currentDate = document.querySelector("#current-date")
currentDate.innerHTML = formatDate(response.data.dt * 1000)

let currentTime = document.querySelector("#current-time")
currentTime.innerHTML = formatHours(response.data.dt * 1000)
}

function dispalyForecast(response){
let forecastElement = document.querySelector("#forecast")
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    let colorClass = backgroundColors[forecast.weather[0].icon]
    forecastElement.innerHTML += 
    `<div class="row following-day align-items-center ${colorClass}" id="time-1">
        <div class="col-4">
            <span>${formatHours(forecast.dt*1000)}</span>
        </div>
        <div class="col-4">
            <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon}@2x.png">
        </div>
        <div class="col-4">
            <span class="lowest-temp">${Math.round(forecast.main.temp_min)}°</span>
             <br />
            <span class="highest-temp"><strong>${Math.round(forecast.main.temp_max)}°</strong></span>
        </div>
      </div>`
  }
}

function searchCity (cityName){
  let units = "metric"
  let weatherApiKey = "af3fca1cbd91099bf648ee4accb9419f"
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${weatherApiKey}`
  axios.get(weatherApiUrl).then(showCurrentCityDateTimeWeather)

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${weatherApiKey}`;
  axios.get(apiUrl).then(dispalyForecast);

  let noPositionFound = document.querySelector("#no-position-found")
  noPositionFound.innerHTML=""
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityName = city.value
  searchCity(cityName)
  city.value = ""
}

function showPosition (position){
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let units = "metric"
  let weatherApiKey = "af3fca1cbd91099bf648ee4accb9419f";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${weatherApiKey}`;
  axios.get(weatherApiUrl).then(showCurrentCityDateTimeWeather)

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${weatherApiKey}`;
  axios.get(apiUrl).then(dispalyForecast);

  let noPositionFound = document.querySelector("#no-position-found")
  noPositionFound.innerHTML=""
}

function noPosition() {
let noPositionFound = document.querySelector("#no-position-found")
noPositionFound.innerHTML="Sorry, we can't get your location, please type a city."
}

function getCurrentLocation(){
  navigator.geolocation.getCurrentPosition(showPosition, noPosition)
}

function chooseCelsius(event){
  event.preventDefault();
  temperatureCelsius.classList.add("active")
  temperatureFarenheit.classList.remove("active")
  let displayTemperatureCelsius = document.querySelector("#displayed-temperature")
  displayTemperatureCelsius.innerHTML = currentTemperature
}

function chooseFarenheit(event){
  event.preventDefault();
  temperatureCelsius.classList.remove("active")
  temperatureFarenheit.classList.add("active")
  let displayTemperatureFarenheit = document.querySelector("#displayed-temperature")
  displayTemperatureFarenheit.innerHTML = Math.round(currentTemperature * 9/5 + 32)
}
let currentTemperature = null

let temperatureCelsius = document.querySelector("#temperature-celsius")
temperatureCelsius.addEventListener("click", chooseCelsius)

let temperatureFarenheit = document.querySelector("#temperature-farenheit")
temperatureFarenheit.addEventListener("click", chooseFarenheit)

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#current-location")
currentLocation.addEventListener("click", getCurrentLocation)

let backgroundColors = {
  "01d":"color-day-clear", 
  "02d":"color-day-clear", 
  "03d":"color-day-clouds", 
  "04d":"color-day-clouds", 
  "09d":"color-day-clouds", 
  "10d":"color-day-rain", 
  "11d":"color-day-rain", 
  "13d":"color-day-mist-snow", 
  "50d":"color-day-mist-snow",
  "01n":"color-night-clear",
  "02n":"color-night-clear",
  "03n":"color-night-clouds",
  "04n":"color-night-clouds",
  "09n":"color-night-clouds",
  "10n":"color-night-rain",
  "11n":"color-night-rain",
  "13n":"color-night-mist-snow ",
  "50n":"color-night-mist-snow " 
}

searchCity ("Tokyo");