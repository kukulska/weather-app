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
console.log(now)
let hours = now.getHours();
  if (hours < 10){hours = `0${hours}`};
  let minutes = now.getMinutes();
  if (minutes < 10){minutes = `0${minutes}`};

  return `Last updated: ${hours}:${minutes}`;
}

// let temperatureInCelsius = 25
// let displayedTemperature= document.querySelector("#displayed-temperature")
// displayedTemperature.innerHTML = temperatureInCelsius

// function chooseCelsius(){
// displayedTemperature.innerHTML = temperatureInCelsius
// }

// function chooseFarenheit(){
// displayedTemperature.innerHTML = temperatureInCelsius * 9/5 + 32
// }

// let temperatureCelsius = document.querySelector("#celsiusSymbol")
// temperatureCelsius.addEventListener("click", chooseCelsius)

// let temperatureFarenheit = document.querySelector("#farenheitSymbol")
// temperatureFarenheit.addEventListener("click", chooseFarenheit)


function showCurrentCityDateTimeWeather(response){
let currentCity = response.data.name
let currentCityName = document.querySelector("#current-city")
currentCityName.innerHTML = currentCity

let currentTemperature = Math.round(response.data.main.temp)
let temperature = document.querySelector("#displayed-temperature")
temperature.innerHTML = currentTemperature

let currentWeatherDescription = response.data.weather[0].main
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

function searchCity (cityName){
let units = "metric"
let weatherApiKey = "af3fca1cbd91099bf648ee4accb9419f"
let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${weatherApiKey}`
axios.get(weatherApiUrl).then(showCurrentCityDateTimeWeather)
}

function handleSubmit (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let cityName = city.value
  searchCity(cityName)
  city.value = ""
}

let searchedCity = document.querySelector("#search-form");
searchedCity.addEventListener("submit", handleSubmit);

function showPosition (position){
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let units = "metric"
  let weatherApiKey = "af3fca1cbd91099bf648ee4accb9419f";
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${weatherApiKey}`;

axios.get(weatherApiUrl).then(showCurrentCityDateTimeWeather)
}

function getCurrentLocation(){
navigator.geolocation.getCurrentPosition(showPosition)
}

let currentLocation = document.querySelector("#current-location")
currentLocation.addEventListener("click", getCurrentLocation)

searchCity ("Tokyo");